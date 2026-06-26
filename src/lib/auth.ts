const SECRET = process.env.TOKEN_SECRET || "fallback_secret_key_change_in_prod";

const textEncoder = new TextEncoder();

async function getCryptoKey(): Promise<CryptoKey> {
  const keyData = textEncoder.encode(SECRET);
  return globalThis.crypto.subtle.importKey(
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
  const key = await getCryptoKey();
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(value)
  );
  return bufferToBase64url(signatureBuffer);
}
