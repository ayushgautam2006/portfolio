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

// Browser-compatible base64url encoding/decoding helper
function base64urlEncode(str: string): string {
  const bytes = textEncoder.encode(str);
  let binString = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binString += String.fromCharCode(bytes[i]);
  }
  return btoa(binString)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binString = atob(base64);
  const bytes = new Uint8Array(binString.length);
  for (let i = 0; i < binString.length; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
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

function base64urlToBuffer(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binString = atob(base64);
  const bytes = new Uint8Array(binString.length);
  for (let i = 0; i < binString.length; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

export async function generateMagicToken(email: string): Promise<string> {
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
  const payload = JSON.stringify({ email, expires });
  const base64Payload = base64urlEncode(payload);
  
  const key = await getCryptoKey();
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(base64Payload)
  );
  
  const signature = bufferToBase64url(signatureBuffer);
  return `${base64Payload}.${signature}`;
}

export async function verifyMagicToken(token: string): Promise<{ email: string } | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [base64Payload, signature] = parts;
  
  try {
    const key = await getCryptoKey();
    const signatureBuffer = base64urlToBuffer(signature);
    const payloadData = textEncoder.encode(base64Payload);
    
    const isValid = await globalThis.crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer as any,
      payloadData as any
    );
    
    if (!isValid) return null;
    
    const payloadStr = base64urlDecode(base64Payload);
    const { email, expires } = JSON.parse(payloadStr);
    
    if (Date.now() > expires) return null;
    return { email };
  } catch {
    return null;
  }
}

export async function generateSessionValue(email: string): Promise<string> {
  const key = await getCryptoKey();
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(email)
  );
  return bufferToBase64url(signatureBuffer);
}
