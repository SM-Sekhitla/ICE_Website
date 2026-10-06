import { company } from "../data/company";
import { services } from "../data/services";
import { products } from "../data/products";
import { clients } from "../data/clients";
import { values } from "../data/values";

export type BruceSource = { label: string; href: string };
export type BruceAnswer = { text: string; sources: BruceSource[]; topic?: string };
type Entry = BruceAnswer & { id: string; terms: string };
const source = (label: string, href: string): BruceSource[] => [{ label, href }];
const contact = source("Contact ICE", "/contact-us");
const productEntries: Entry[] = products.map((product) => ({
  id: product.id,
  terms: `${product.title} ${product.subtitle} ${product.description} ${product.features.join(" ")}`,
  text: `${product.title}${product.subtitle ? ` — ${product.subtitle}` : ""}\n\n${product.description || "This product is listed on the ICE website, but its features have not been published yet. Contact ICE for details."}${product.features.length ? `\n\nFeatures: ${product.features.join(", ")}.` : ""}`,
  sources: source(`Explore ${product.title}`, `/our-products#${product.id}`),
}));
const serviceEntries: Entry[] = services.map((service) => ({
  id: service.id,
  terms: `${service.title} ${service.description}`,
  text: `${service.title}\n\n${service.description}`,
  sources: source("Explore services", "/our-services"),
}));
const entries: Entry[] = [
  ...productEntries, ...serviceEntries,
  { id: "company", terms: "about company ice who established founded history team people employees black owned south africa industrial computing engineering experience", text: company.paragraphs[0], sources: source("About ICE", "/about-us") },
  { id: "vision", terms: "vision ambition", text: company.vision, sources: source("Our vision", "/about-us") },
  { id: "mission", terms: "mission purpose", text: company.mission, sources: source("Our mission", "/about-us") },
  { id: "values", terms: `values ethics ice filter principles ${values.join(" ")}`, text: `The ICE Filter is our code of ethics. Its ${values.length} cardinal values are:\n\n${values.map((value, i) => `${i + 1}. ${value}`).join("\n")}`, sources: source("The ICE Filter", "/#ice-filter") },
  { id: "contact", terms: "contact email reach enquiry talk human person get touch phone telephone number", text: `You can reach ICE at ${company.emails.join(" or ")}.\n\nOffice: ${company.address.join(", ")}.\nHours: ${company.hours}.\n\nThe website does not currently list a phone number.`, sources: contact },
  { id: "location", terms: "address location located office where based directions pretoria hatfield", text: `ICE is based at ${company.address.join(", ")}.\n\nOffice hours: ${company.hours}.`, sources: contact },
  { id: "hours", terms: "hours open opening close closing monday friday weekend saturday sunday", text: `ICE's published office hours are ${company.hours}. Contact the team to confirm holiday availability.`, sources: contact },
  { id: "services", terms: "services capabilities offer offerings help business solutions", text: `ICE offers ${services.length} services:\n\n${services.map((item) => `• ${item.title}`).join("\n")}\n\nTell me which service interests you, or describe what your business needs.`, sources: source("All services", "/our-services") },
  { id: "products", terms: "products systems platforms tools applications software catalogue catalog", text: `The website lists ${products.length} products:\n\n${products.map((item) => `• ${item.title}`).join("\n")}\n\nAsk about a product to see its published details.`, sources: source("All products", "/our-products") },
  { id: "clients", terms: `clients customers sectors government private portfolio ${clients.map((client) => client.name).join(" ")}`, text: `ICE works with government and private-sector clients. The website lists:\n\n${clients.map((client) => `• ${client.name} — ${client.sector}`).join("\n")}`, sources: source("Our clients", "/our-clients") },
  { id: "approach", terms: "approach collaborate collaboration process architecture roadmap methodology work together", text: `${company.paragraphs[1]}\n\n${company.paragraphs[2]}`, sources: source("About ICE", "/about-us") },
  { id: "careers", terms: "careers career job jobs hiring vacancies vacancy internship intern graduate recruitment cv resume", text: `The website does not publish current vacancies. For career or internship enquiries, contact ICE at ${company.emails.join(" or ")}.`, sources: contact },
  { id: "website", terms: "website navigate navigation page pages menu find use site", text: "Use the navigation to explore About, Services, Products, Clients and Contact. On mobile, tap the menu icon. Products have links to request a demo; the Contact form prepares an email draft for you to send.", sources: [...source("Browse products", "/our-products"), ...contact] },
  { id: "form", terms: "form email draft send sent submit submission message delivered", text: "The Contact form prepares an email draft in your email app. You still need to send that email. I cannot send emails or confirm delivery from this chat.", sources: contact },
  { id: "social", terms: "social linkedin facebook instagram follow", text: "You can find ICE on these social channels.", sources: company.socials.map((item) => ({ label: item.label, href: item.url })) },
];

const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const hasPhrase = (text: string, phrase: string) => ` ${text} `.includes(` ${normalize(phrase)} `);
const stopwords = new Set("a an and are as at be bruce can could do does for from give hello help hey hi how i ice in is it its me my of on or please tell that the their them there these they this to us want we what which who with would you your about know more all".split(" "));
const tokens = (text: string) => [...new Set(normalize(text).split(" ").filter((word) => word && !stopwords.has(word)).map((word) => word.length > 4 && word.endsWith("s") ? word.slice(0, -1) : word))];
const result = (entry: Entry): BruceAnswer => ({ text: entry.text, sources: entry.sources, topic: entry.id });
const getEntry = (id: string) => entries.find((entry) => entry.id === id)!;

/** Local retrieval only: responses are sourced from the website, never invented. */
export function answerBruce(question: string, previousTopic?: string): BruceAnswer {
  const query = normalize(question);
  const words = tokens(query);
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)( bruce)?$/.test(query)) {
    return { text: "Hi! I'm BRUCE, your ICE website guide. Ask me about the company, services, products or how to get in touch. What would you like to explore?", sources: [] };
  }
  if (/^(thanks|thank you|thank you bruce|thanks bruce|great|cool|ok|okay)$/.test(query)) return { text: "You're welcome! I'm here if you want to explore anything else about ICE.", sources: [], topic: previousTopic };
  if (/\b(who are you|your name|are you ai|what can you do|are you human|are you a robot)\b/.test(query)) return { text: "I'm BRUCE, ICE's website assistant. I look up information published on this site and link you to the relevant pages. I can help with company information, services, products, clients and contact details. I'm not a live team member.", sources: [] };

  const namedProducts = products.filter((item) => hasPhrase(query, item.title));
  const namedServices = services.filter((item) => hasPhrase(query, item.title.replace(" (BI)", "")));
  const namedTopic = namedProducts[0]?.id || namedServices[0]?.id;
  const topic = namedTopic || previousTopic;
  if (/\b(vision)\b/.test(query) && /\b(mission)\b/.test(query)) return { text: `Our vision\n${company.vision}\n\nOur mission\n${company.mission}`, sources: source("About ICE", "/about-us") };
  if (/\b(founder|ceo|director|salary|revenue|profit|password|api key|source code|account balance|order status|ticket status|uptime|live status)\b/.test(query)) return { text: "That information isn't published in the website content I can access. I can't look up private accounts, internal systems or live status. Please contact ICE for an accurate answer.", sources: contact };
  if (/\b(price|pricing|cost|costs|quote|quotation|budget|charge|charges|fee|fees|how much|discount|timeline|duration|how long)\b/.test(query)) {
    const item = [...products, ...services].find((entry) => entry.id === topic);
    return { text: `The website does not publish fixed prices or delivery timelines${item ? ` for ${item.title}` : ""}. ICE can provide a quote based on your requirements. Contact the team with your scope and preferred timing.`, sources: source("Request a quote", `/contact-us${item ? `?${topic?.startsWith("product") ? "product" : "service"}=${encodeURIComponent(item.title)}` : ""}`), topic };
  }
  if (/\b(demo|demonstration|book|booking|appointment)\b/.test(query)) {
    const product = products.find((item) => item.id === topic);
    return { text: `To request ${product ? `a ${product.title} demo` : "a demo or meeting"}, use the Contact page to prepare an email to ICE. The team will confirm availability. I cannot make bookings directly.`, sources: source("Request a demo", `/contact-us${product ? `?product=${encodeURIComponent(product.title)}` : ""}`), topic };
  }
  // Named entities take priority over generic keywords such as "products".
  if (namedProducts.length || namedServices.length) {
    const matches = [...namedProducts, ...namedServices].map((item) => getEntry(item.id));
    return { text: matches.map((entry) => entry.text).join("\n\n———\n\n"), sources: matches.flatMap((entry) => entry.sources), topic: matches[0].id };
  }
  if (/\b(features|more|details|it|that|this product|this service)\b/.test(query) && topic && words.every((word) => ["feature", "detail", "include", "included", "explain", "information", "product", "service"].includes(word))) return result(getEntry(topic));
  const intents: [RegExp, string][] = [
    [/\b(vision)\b/, "vision"], [/\b(mission)\b/, "mission"],
    [/\b(values|ethics|filter)\b/, "values"], [/\b(careers?|jobs?|hiring|vacanc\w*|intern\w*|cv|resume)\b/, "careers"],
    [/\b(address|location|located|directions|where are you|where is ice|where is your office|where are your offices|where.*based)\b/, "location"],
    [/\b(hours|opening|closing|weekend|saturday|sunday)\b/, "hours"],
    [/\b(contact|email|phone|telephone|human|reach|talk to|touch)\b/, "contact"],
    [/\b(clients?|customers?|sectors?)\b/, "clients"],
    [/\b(services|capabilities|offerings|what do you offer|what do you do|what does ice do|what can ice do)\b/, "services"],
    [/\b(products|catalogue|catalog|platforms|systems)\b/, "products"],
    [/\b(about ice|who is ice|who are you guys|what is ice|ice stand for|company|founded|established|team|employees|experience|black owned)\b/, "company"],
  ];
  if (/\b(form|draft|delivered|delivery confirmation)\b/.test(query)) return result(getEntry("form"));
  for (const [pattern, id] of intents) if (pattern.test(query)) return result(getEntry(id));
  const aliases: [RegExp, string][] = [
    [/\b(bi|dashboard|dashboards|reporting)\b/, "service-2"],
    [/\b(ai|machine learning|prediction|computer vision|nlp)\b/, "service-5"],
    [/\b(cybersecurity|phishing|ddos|hack|hacked)\b/, "service-4"],
    [/\b(cloud|hosting)\b/, "service-8"],
    [/\b(integration|integrate|connecting)\b/, "service-6"],
  ];
  for (const [pattern, id] of aliases) if (pattern.test(query)) return result(getEntry(id));
  const ranked = entries.map((entry) => {
    const terms = tokens(entry.terms);
    const matching = words.filter((word) => terms.includes(word));
    return { entry, count: matching.length, coverage: matching.length / Math.max(words.length, 1) };
  }).filter((item) => item.count > 0 && item.coverage >= 0.5).sort((a, b) => b.count - a.count || b.coverage - a.coverage);
  if (ranked.length) return result(ranked[0].entry);
  return { text: "I couldn't find a confirmed answer to that in the website content. Try a product or service name, or ask about ICE's team, values, clients or contact details. For information that isn't published here, the ICE team can help.", sources: contact };
}
