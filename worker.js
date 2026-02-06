export default {
  async fetch(request, env) {
    // Try serving the requested asset
    let response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    // Fallback to custom 404 page
    const url = new URL(request.url);
    const notFoundUrl = new URL("/404.html", url.origin);

    const notFoundResponse = await env.ASSETS.fetch(notFoundUrl);

    return new Response(notFoundResponse.body, {
      status: 404,
      headers: notFoundResponse.headers,
    });
  }
};