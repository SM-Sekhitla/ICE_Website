import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff, RotateCcw, Send, X, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { answerFrosty, type FrostyAnswer } from "@/lib/frosty";
import "./frosty.css";

type Message = FrostyAnswer & { id: number; role: "user" | "assistant" };
const greeting: Message = {
  id: 0, role: "assistant",
  text: "Hey, I'm Frosty 👋\nYour guide to ICE. Ask me about our company, services, products or how to get in touch.",
  sources: [],
};
const starters = ["What does ICE do?", "Show me your products", "How can I contact ICE?"];

function Mascot({ blinking }: { blinking: boolean }) {
  return (
    <span className="frosty-mascot" data-blinking={blinking} aria-hidden="true">
      <img src="/brand/frosty-standing.png" alt="" width="1151" height="1367" draggable="false" />
      <span className="frosty-eyelid frosty-eyelid-left" />
      <span className="frosty-eyelid frosty-eyelid-right" />
    </span>
  );
}

export function FrostyChat() {
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
    const answer = answerFrosty(trimmed, topic);
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
    <div className="frosty-widget">
      {!open && (
        <button ref={launcher} className="frosty-launcher" onClick={() => setOpen(true)} aria-label="Chat with Frosty, ICE's website assistant" aria-expanded={false} aria-haspopup="dialog">
          <span className="frosty-invitation"><span className="frosty-status-dot" /> Ask Frosty</span>
          <Mascot blinking={blinking} />
        </button>
      )}
      {open && (
        <section
          className="frosty-panel" role="dialog" aria-modal="false" aria-labelledby="frosty-title"
          style={{ maxHeight: `${Math.max(180, viewport.height - 24)}px`, top: `${viewport.offset + Math.max(12, viewport.height - Math.min(620, viewport.height - 24) - 12)}px` }}
        >
          <header className="frosty-header">
            <div className="frosty-avatar"><Mascot blinking={blinking} /></div>
            <div className="frosty-heading"><h2 id="frosty-title">Frosty<span>.</span></h2><p>Your ICE guide</p></div>
            <div className="frosty-actions">
              <button type="button" aria-label={blink ? "Turn blinking off" : "Turn blinking on"} aria-pressed={blink} onClick={() => setBlink(!blink)} title={reduced ? "Reduced-motion settings keep Frosty still" : "Toggle blinking"}>{blink ? <Eye size={18} /> : <EyeOff size={18} />}</button>
              <button type="button" onClick={reset} aria-label="Start a new conversation" title="New conversation"><RotateCcw size={17} /></button>
              <button ref={closeButton} type="button" onClick={close} aria-label="Close Frosty chat"><X size={21} /></button>
            </div>
          </header>
          <div ref={log} className="frosty-messages" role="log" aria-label="Conversation with Frosty" aria-live="polite" aria-relevant="additions" tabIndex={0}>
            <div className="frosty-chat-intro">A LITTLE GUIDANCE. A LOT OF POSSIBILITY.</div>
            {messages.map((message) => (
              <article className={`frosty-message frosty-message-${message.role}`} key={message.id} aria-label={message.role === "user" ? "You" : "Frosty"}>
                <span className="frosty-speaker">{message.role === "user" ? "YOU" : "Frosty"}</span>
                <p>{message.text}</p>
                {message.sources.length > 0 && <div className="frosty-sources">{message.sources.map((item, index) => item.href.startsWith("/") ? (
                  <Link key={`${item.href}-${index}`} to={item.href} onClick={close}>{item.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>
                ) : (
                  <a key={`${item.href}-${index}`} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
                ))}</div>}
              </article>
            ))}
            {messages.length === 1 && <div className="frosty-starters" aria-label="Suggested questions">{starters.map((question) => <button type="button" key={question} onClick={() => send(question)}>{question}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>}
          </div>
          <form className="frosty-composer" onSubmit={submit}>
            <label className="sr-only" htmlFor="frosty-question">Ask Frosty about ICE</label>
            <div className="frosty-input-row">
              <input ref={input} id="frosty-question" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask me about ICE…" maxLength={600} autoComplete="off" enterKeyHint="send" />
              <button type="submit" disabled={!draft.trim()} aria-label="Send message"><Send size={18} aria-hidden="true" /></button>
            </div>
            <p>Answers from this website · Chat stays in this tab</p>
          </form>
        </section>
      )}
    </div>, document.body,
  );
}
