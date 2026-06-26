const SECRET = process.env.TOKEN_SECRET || "fallback_secret_key_change_in_prod";

const textEncoder = new TextEncoder();

// Safely resolve Web Crypto API on older Node versions (like Node 18) without triggering Edge compile errors
const webCrypto =
  typeof globalThis !== "undefined" && globalThis.crypto
    ? globalThis.crypto
    : typeof require !== "undefined"
    ? require("crypto").webcrypto
    : null;

async function getCryptoKey(): Promise<CryptoKey> {
  if (!webCrypto || !webCrypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }
  const keyData = textEncoder.encode(SECRET);
  return webCrypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Convert ArrayBuffer to base64url
function bufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binString = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binString += String.fromCharCode(bytes[i]);
  }
  return btoa(binString)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function generateSessionValue(value: string): Promise<string> {
  if (!webCrypto || !webCrypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }
  const key = await getCryptoKey();
  const signatureBuffer = await webCrypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(value)
  );
  return bufferToBase64url(signatureBuffer);
}
