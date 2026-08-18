import { respond } from "./_common.js";

export async function GET(request) {
  const updateUrl = process.env.V2_UPDATE_URL || "";

  return respond({
    bypassVersion: Number(process.env.V2_RESOURCE_VERSION || "5"),
    version: String(process.env.V2_APP_VERSION || "4.5"),
    url: updateUrl
  });
}
