import { respond } from "./_common.js";

export async function GET(request) {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  return respond({
    bypassVersion: String(process.env.V10_RESOURCE_VERSION || "5"),
    bypassLink: `${origin}/bypass/HASADVIP1/new.zip`
  });
}
