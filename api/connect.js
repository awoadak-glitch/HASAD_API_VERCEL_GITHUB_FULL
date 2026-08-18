import {
  respond,
  parseBody,
  usersFromEnv,
  expiryToMs,
  md5,
  allowedForGame
} from "./_common.js";

export async function GET() {
  return respond({
    status: true,
    service: "connect",
    contracts: ["PUBG/V10", "VIP/V2"],
    message: "API is running"
  });
}

export async function POST(request) {
  let body;

  try {
    body = await parseBody(request);
  } catch {
    return respond({ status: false, reason: "INVALID_REQUEST" }, 400);
  }

  const game = String(body?.game || "");
  const userKey = String(body?.user_key || "");
  const serial = String(body?.serial || "");
  const verrr = String(body?.verrr || "");

  if (!game || !userKey || !serial) {
    return respond({ status: false, reason: "MISSING_FIELDS" }, 400);
  }

  if (game !== "PUBG" && game !== "VIP") {
    return respond({ status: false, reason: "INVALID_GAME" }, 403);
  }

  // V10 sends verrr. V2 does not.
  if (game === "PUBG") {
    const expectedVersion = process.env.V10_APP_VERSION || "1.0.0";
    if (!verrr || verrr !== expectedVersion) {
      return respond({ status: false, reason: "UPDATE_REQUIRED" }, 403);
    }
  }

  const users = usersFromEnv();
  const user = users[userKey];

  if (!user || user.enabled !== true) {
    return respond({ status: false, reason: "INVALID_KEY" }, 403);
  }

  if (!allowedForGame(user, game)) {
    return respond({ status: false, reason: "GAME_NOT_ALLOWED" }, 403);
  }

  if (user.serial && user.serial !== "*" && user.serial !== serial) {
    return respond({ status: false, reason: "DEVICE_MISMATCH" }, 403);
  }

  const exp = String(user.exp || "");
  const expMs = expiryToMs(exp);

  if (!Number.isFinite(expMs)) {
    return respond({ status: false, reason: "INVALID_EXPIRY" }, 500);
  }

  if (Date.now() >= expMs) {
    return respond({ status: false, reason: "EXPIRED" }, 403);
  }

  const rng = Math.floor(Date.now() / 1000);

  let real;
  if (game === "PUBG") {
    const salt = process.env.V10_TOKEN_SALT || "Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E";
    real = `PUBG-${userKey}-${serial}-${salt}`;
  } else {
    const salt = process.env.V2_TOKEN_SALT || "ABUFAHADTOP";
    real = `VIP-${userKey}-${serial}-${salt}`;
  }

  return respond({
    status: true,
    data: {
      token: md5(real),
      EXP: exp,
      rng
    }
  });
}
