import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff, RotateCcw, Send, X, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { answerBruce, type BruceAnswer } from "@/lib/bruce";
import "./bruce.css";

type Message = BruceAnswer & { id: number; role: "user" | "assistant" };
const greeting: Message = {
  id: 0, role: "assistant",
  text: "Hey, I'm BRUCE 👋\nYour guide to ICE. Ask me about our company, services, products or how to get in touch.",
  sources: [],
};
const starters = ["What does ICE do?", "Show me your products", "How can I contact ICE?"];

function Mascot({ blinking }: { blinking: boolean }) {
  return (
    <span className="bruce-mascot" data-blinking={blinking} aria-hidden="true">
      <img src="/brand/bruce-standing.png" alt="" width="1151" height="1367" draggable="false" />
      <span className="bruce-eyelid bruce-eyelid-left" />
      <span className="bruce-eyelid bruce-eyelid-right" />
    </span>
  );
}

export function BruceChat() {
  const [open, setOpen] = useState(false);
  const [blink, setBlink] = useState(true);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [topic, setTopic] = useState<string>();
  const [viewport, setViewport] = useState({ height: window.innerHeight, offset: 0 });
  const reduced = useReducedMotion();
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const blinking = blink && !reduced;

  useEffect(() => {
    const visual = window.visualViewport;
    const update = () => setViewport({ height: visual?.height ?? window.innerHeight, offset: visual?.offsetTop ?? 0 });
    update();
    visual?.addEventListener("resize", update);
    visual?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      visual?.removeEventListener("resize", update);
      visual?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);

  useEffect(() => {
    if (open && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, open]);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
  }
  function send(question: string) {
    const trimmed = question.trim().slice(0, 600);
    if (!trimmed) return;
    const answer = answerBruce(trimmed, topic);
    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmed, sources: [] };
    const reply: Message = { ...answer, id: nextId.current++, role: "assistant" };
    setMessages((current) => [...current, userMessage, reply]);
    setTopic(answer.topic);
    setDraft("");
    input.current?.focus({ preventScroll: true });
  }
  function submit(event: FormEvent) { event.preventDefault(); send(draft); }
  function reset() { setMessages([greeting]); setTopic(undefined); setDraft(""); input.current?.focus(); }

  return createPortal(
    <div className="bruce-widget">
      {!open && (
        <button ref={launcher} className="bruce-launcher" onClick={() => setOpen(true)} aria-label="Chat with BRUCE, ICE's website assistant" aria-expanded={false} aria-haspopup="dialog">
          <span className="bruce-invitation"><span className="bruce-status-dot" /> Ask BRUCE</span>
          <Mascot blinking={blinking} />
        </button>
      )}
      {open && (
        <section
          className="bruce-panel" role="dialog" aria-modal="false" aria-labelledby="bruce-title"
          style={{ maxHeight: `${Math.max(180, viewport.height - 24)}px`, top: `${viewport.offset + Math.max(12, viewport.height - Math.min(620, viewport.height - 24) - 12)}px` }}
        >
          <header className="bruce-header">
            <div className="bruce-avatar"><Mascot blinking={blinking} /></div>
            <div className="bruce-heading"><h2 id="bruce-title">BRUCE<span>.</span></h2><p>Your ICE guide</p></div>
            <div className="bruce-actions">
              <button type="button" aria-label={blink ? "Turn blinking off" : "Turn blinking on"} aria-pressed={blink} onClick={() => setBlink(!blink)} title={reduced ? "Reduced-motion settings keep BRUCE still" : "Toggle blinking"}>{blink ? <Eye size={18} /> : <EyeOff size={18} />}</button>
              <button type="button" onClick={reset} aria-label="Start a new conversation" title="New conversation"><RotateCcw size={17} /></button>
              <button ref={closeButton} type="button" onClick={close} aria-label="Close BRUCE chat"><X size={21} /></button>
            </div>
          </header>
          <div ref={log} className="bruce-messages" role="log" aria-label="Conversation with BRUCE" aria-live="polite" aria-relevant="additions" tabIndex={0}>
            <div className="bruce-chat-intro">A LITTLE GUIDANCE. A LOT OF POSSIBILITY.</div>
            {messages.map((message) => (
              <article className={`bruce-message bruce-message-${message.role}`} key={message.id} aria-label={message.role === "user" ? "You" : "BRUCE"}>
                <span className="bruce-speaker">{message.role === "user" ? "YOU" : "BRUCE"}</span>
                <p>{message.text}</p>
                {message.sources.length > 0 && <div className="bruce-sources">{message.sources.map((item, index) => item.href.startsWith("/") ? (
                  <Link key={`${item.href}-${index}`} to={item.href} onClick={close}>{item.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>
                ) : (
                  <a key={`${item.href}-${index}`} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
                ))}</div>}
              </article>
            ))}
            {messages.length === 1 && <div className="bruce-starters" aria-label="Suggested questions">{starters.map((question) => <button type="button" key={question} onClick={() => send(question)}>{question}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>}
          </div>
          <form className="bruce-composer" onSubmit={submit}>
            <label className="sr-only" htmlFor="bruce-question">Ask BRUCE about ICE</label>
            <div className="bruce-input-row">
              <input ref={input} id="bruce-question" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask me about ICE…" maxLength={600} autoComplete="off" enterKeyHint="send" />
              <button type="submit" disabled={!draft.trim()} aria-label="Send message"><Send size={18} aria-hidden="true" /></button>
            </div>
            <p>Answers from this website · Chat stays in this tab</p>
          </form>
        </section>
      )}
    </div>, document.body,
  );
}
