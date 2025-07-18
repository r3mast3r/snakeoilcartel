// Import the KV namespace
const KV_NAMESPACE = 'snakeoilcartel'; // Replace with your KV namespace binding

async function handleRequest(request) {
    if (request.method === 'POST') {
        // Parse the form data
        const formData = await request.formData();
        
        // Extract data from the form
        const name = formData.get('name'); // Assuming your form has an input with name="name"
        const tel = formData.get('tel'); // Assuming your form has an input with name="tel"

        // Store the data in KV
        // @ts-ignore
        await KV_NAMESPACE.put(tel, JSON.stringify({ name, tel }));

        return new Response('Data saved successfully!', { status: 200 });
    }

    // Handle GET requests by returning an HTML form
    // This allows users to input data through a web interface
    // The form uses POST method to submit data to the same endpoint
    // When the form is submitted, the data will be processed and stored in the KV namespace
    // The response for GET requests is an HTML document containing the form
    // The Content-Type header is set to 'text/html' to indicate the response is HTML
    return new Response(`
        <form method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <br>
            <label for="tel">Tel:</label>
            <input type="tel" id="tel" name="tel" required>
            <br>
            <input type="submit" value="Submit">
        </form>
    `, { headers: { 'Content-Type': 'text/html' } });
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});
