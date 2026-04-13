const fs = require('fs');

const WEBHOOK_URL = 'https://n8n.getabba.info/webhook/landing-chat';

const testCases = [
  // --- HOW IT WORKS CONTEXT ---
  {
    id: 1,
    name: "Standard Discovery",
    context: "how_it_works",
    sessionId: "test-how-01",
    message: "I own a dental clinic and we lose a lot of patients over the weekend when the desk is closed."
  },
  {
    id: 2,
    name: "Conversational Memory (Follow-up)",
    context: "how_it_works",
    sessionId: "test-how-01", // Reuses sessionId from #1
    message: "And can it handle WhatsApp specifically? How fast does it take to deploy?"
  },
  {
    id: 3,
    name: "Aggressive Objection",
    context: "how_it_works",
    sessionId: "test-how-03",
    message: "AI sounds super robotic. I don't want my patients talking to a stupid bot."
  },
  {
    id: 4,
    name: "Short/Vague Input",
    context: "how_it_works",
    sessionId: "test-how-04",
    message: "hi"
  },
  {
    id: 5,
    name: "Lead Capture (Email provided in chat)",
    context: "how_it_works",
    sessionId: "test-how-05",
    message: "Sounds like what I need. Can you send a demo to hello@smileclinic.com?"
  },

  // --- PRICING CONTEXT ---
  {
    id: 6,
    name: "High Roller Inquiry",
    context: "pricing",
    sessionId: "test-price-06",
    message: "We're a large aesthetic hospital doing 2M/yr. We need a robust enterprise setup, what does it cost?"
  },
  {
    id: 7,
    name: "Budget Conscious",
    context: "pricing",
    sessionId: "test-price-07",
    message: "I'm a solo practitioner, I can't afford a $5,000/mo software. Give me straight numbers."
  },
  {
    id: 8,
    name: "Comparison Objection",
    context: "pricing",
    sessionId: "test-price-08",
    message: "Why would I pay for ABBA when ManyChat is basically free?"
  },
  {
    id: 9,
    name: "Pricing Lead Capture",
    context: "pricing",
    sessionId: "test-price-09",
    message: "Okay, I'm sold. Shoot the custom quote to owner@medspa.com."
  },

  // --- NEWSLETTER CONTEXT ---
  {
    id: 10,
    name: "Footer Newsletter Signup",
    context: "newsletter",
    sessionId: "test-news-10",
    message: "Newsletter signup: dr.smith@clinic.info",
    email: "dr.smith@clinic.info"
  }
];

async function runTests() {
  console.log("Starting 10 Test Cases against ABBA Chat Webhook...\n");
  let markdown = "# ABBA AI Chat Agent — 10 Test Scenarios\n\n";

  for (const tc of testCases) {
    console.log(`Running Test ${tc.id}: ${tc.name}...`);
    try {
      const start = Date.now();
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: tc.message,
          context: tc.context,
          sessionId: tc.sessionId,
          ...(tc.email && { email: tc.email })
        })
      });
      const end = Date.now();
      
      const status = res.status;
      const textResponse = await res.text();
      let parsed = null;
      try {
        parsed = JSON.parse(textResponse);
      } catch(e) {}

      markdown += `## Test ${tc.id}: ${tc.name}\n`;
      markdown += `- **Context:** \`${tc.context}\`\n`;
      markdown += `- **User Input:** "${tc.message}"\n`;
      markdown += `- **Response Time:** ${end - start}ms\n`;
      
      if (status === 200 && parsed) {
        markdown += `- **Success Flag:** ${parsed.success}\n\n`;
        markdown += `> **ABBA AI:** ${parsed.text || parsed.reply || parsed.output || parsed.message || JSON.stringify(parsed)}\n\n`;
      } else {
        markdown += `- **Status:** ${status}\n`;
        markdown += `- **Raw Output:** \`${textResponse}\`\n\n`;
      }
      
    } catch (err) {
      console.error(`Error on Test ${tc.id}:`, err.message);
      markdown += `## Test ${tc.id}: ${tc.name}\n`;
      markdown += `- **Error:** ${err.message}\n\n`;
    }
  }

  fs.writeFileSync('C:\\Users\\moham\\.gemini\\antigravity\\brain\\cfa67b47-a3ad-464c-8abc-7ae61002ca08\\chat_agent_tests.md', markdown);
  console.log("Tests completed. Output saved to artifact.");
}

runTests();
