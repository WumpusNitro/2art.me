export default {
  async fetch(request, env) {
    // Serve requested asset
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    // Serve custom 404 page
    const notFoundResponse = await env.ASSETS.fetch(
      new Request("/404.html", { method: "GET" })
    );

    return new Response(notFoundResponse.body, {
      status: 404,
      headers: notFoundResponse.headers,
    });
  }
};