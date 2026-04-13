

async function testWebhook() {
  try {
    const res = await fetch('https://n8n.getabba.info/webhook/landing-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Hello, how does ABBA work?',
        context: 'how_it_works',
        sessionId: 'test-123'
      })
    });
    const text = await res.text();
    console.log('STATUS:', res.status);
    console.log('HEADERS:', res.headers.raw());
    console.log('BODY:', text);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

testWebhook();
