function respond(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0"
    }
  });
}

export async function GET(request) {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;
  const version = process.env.RESOURCE_VERSION || "5";

  return respond({
    bypassVersion: version,
    bypassLink: `${origin}/bypass/HASADVIP1/new.zip`
  });
}
