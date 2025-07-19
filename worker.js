// worker.js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Only handle POST requests
  if (request.method === 'POST') {
    try {
      // Parse the request body as JSON
      const body = await request.json();

      // Extract name and phone number from the form data
      const { name, phone } = body;

      // Get the KV namespace for subscriber data
    const kv = await KVNamespace.get('snakeoilcartel');

      // Store the subscriber information in the KV namespace
    await kv.put(name, phone);

      // Return a success response
    return new Response(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    } catch (error) {
      // Handle any errors that occurred during processing
      return new Response(JSON.stringify({ status: 'error', message: 'Failed to process request' }), {
        status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
    }
  }

  // For other request types, return a simple response
  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}