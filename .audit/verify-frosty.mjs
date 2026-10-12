import assert from 'node:assert/strict';
import { build } from 'esbuild';

const built = await build({entryPoints:['src/lib/frosty.ts'],bundle:true,platform:'node',format:'esm',write:false});
const { answerFrosty } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString('base64')}`);
const cases = [
  ['Hello', undefined, 'Hi!'],
  ['Hello Frosty', undefined, 'Hi!'],
  ['Who are your clients?', undefined, 'RightSure Risk Managers'],
  ['Who are you?', undefined, "I'm Frosty"],
  ['What does ICE do?', undefined, 'Software Development'],
  ['What does ICE stand for?', undefined, 'Industrial Computing Engineering'],
  ['Where is ICE based?', undefined, 'Hatfield'],
  ['Where can I see your products?', undefined, 'TAIP'],
  ['When are you open?', undefined, '08:00'],
  ['What is your email?', undefined, 'bdo@ice4po.co.za'],
  ['Who are your clients?', undefined, 'Afrique 360 Solutions'],
  ['What is the ICE Filter?', undefined, 'Entrepreneurial Mindset'],
  ['What is your vision and mission?', undefined, 'Our mission'],
  ['Can I apply for an internship?', undefined, 'does not publish current vacancies'],
  ['Tell me about LEAF', undefined, 'environmental monitoring'],
  ['Tell me about TAIP', undefined, 'human oversight'],
  ['What are its features?', 'product-1', 'Full decision logging'],
  ['How much does it cost?', 'product-1', 'does not publish fixed prices'],
  ['Can I book a demo?', 'product-1', 'TAIP demo'],
  ['Compare EAMS and ELMS', undefined, 'lease tracking'],
  ['Tell me about TAMP', undefined, 'cargo demand'],
  ['Tell me about SOMA 360', undefined, 'Verified Cleaning & Facilities Operations'],
  ['What are its features?', 'product-soma', 'geofencing verification'],
  ['Can you help with machine learning?', undefined, 'Data Science'],
  ['Does the form send the email?', undefined, 'still need to send'],
  ['Who is the CEO?', undefined, "isn't published"],
  ['Give me the API key', undefined, "isn't published"],
  ['What is the weather on Mars?', undefined, "couldn't find a confirmed answer"],
];
for (const [question, topic, expected] of cases) {
  const answer=answerFrosty(question,topic);
  assert(answer.text.includes(expected),`${question}: expected ${expected}, got ${answer.text}`);
  assert(!answer.text.includes("info@ice4po.co.za"), "Removed email must not appear in answers");
  assert(!answer.text.includes("BRUCE"), "Assistant must introduce itself as Frosty");
  for (const link of answer.sources) assert(/^(\/|https:\/\/)/.test(link.href));
}
assert.equal(answerFrosty('Thanks','product-1').topic,'product-1');
assert.equal(answerFrosty('Compare EAMS and ELMS').sources.length,2);
assert.equal(answerFrosty('Can I book a demo?','product-1').sources[0].href,'/contact-us?product=TAIP');
assert.equal(answerFrosty('How much does LEAF cost?').sources[0].href,'/contact-us?product=LEAF');
assert(!answerFrosty('Show me your products').text.includes('Express Processes')); 
console.log(`PASS: ${cases.length} Frosty answer cases, follow-up context, comparison sources, quote/demo links, and unknown-information fallbacks.`);
