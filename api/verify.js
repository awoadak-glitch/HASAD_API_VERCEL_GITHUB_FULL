import { respond, parseBody } from "./_common.js";

export async function GET() {
  return respond({
    status: "ok",
    service: "verify",
    message: "POST license_key, package and signature"
  });
}

export async function POST(request) {
  let body;

  try {
    body = await parseBody(request);
  } catch {
    return respond({ status: "error", reason: "INVALID_REQUEST" }, 400);
  }

  const licenseKey = String(body?.license_key || "");
  const packageName = String(body?.package || "");
  const signature = String(body?.signature || "").toLowerCase();

  const expectedLicense = process.env.VERIFY_LICENSE_KEY || "FAHAD41";
  const expectedPackage = process.env.VERIFY_PACKAGE || "pubgm.loader";
  const expectedSignature = String(process.env.VERIFY_SIGNATURE_MD5 || "*").toLowerCase();

  if (!licenseKey || !packageName || !signature) {
    return respond({ status: "error", reason: "MISSING_FIELDS" }, 400);
  }

  if (licenseKey !== expectedLicense) {
    return respond({ status: "error", reason: "INVALID_LICENSE" }, 403);
  }

  if (packageName !== expectedPackage) {
    return respond({ status: "error", reason: "INVALID_PACKAGE" }, 403);
  }

  if (expectedSignature !== "*" && signature !== expectedSignature) {
    return respond({ status: "error", reason: "INVALID_SIGNATURE" }, 403);
  }

  return respond({ status: "ok" });
}
