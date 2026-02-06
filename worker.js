export default {
  async fetch(request, env) {
    // Try to fetch the requested asset
    let response = await env.ASSETS.fetch(request);

    // If not found, serve 404.html instead
    if (response.status === 404) {
      const url = new URL(request.url);
      const notFoundRequest = new Request(
        new URL("/404.html", url),
        request
      );

      const notFoundResponse = await env.ASSETS.fetch(notFoundRequest);

      return new Response(notFoundResponse.body, {
        status: 404,
        headers: notFoundResponse.headers,
      });
    }

    return response;
  }
};