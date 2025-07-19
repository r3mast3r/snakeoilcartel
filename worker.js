export default {
  async fetch(request, env, ctx) {
    try {
      // Check if the request method is POST
      if (request.method === "POST") {
        // Parse the JSON body
        const data = await request.json();
        
        // Extract the key and value from the JSON data
        const key = data.name; // Assuming the input name is "key"
        const value = data.phone; // Assuming the input name is "value"

        // Store the key-value pair in the environment variable
        await env.snakeoilcartel.put(key, value);

        return new Response("Successful write", {
          status: 2, // Changed from 201 to 2 for the response status
        });
      } else {
        return new Response("Method Not Allowed", { status: 405 });
      }
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};