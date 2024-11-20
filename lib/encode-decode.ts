import pako from "pako"

export function encodeJson(jsonData: object) {
  const jsonString = JSON.stringify(jsonData)

  const compressed = pako.deflate(jsonString)

  const base64 = btoa(String.fromCharCode(...compressed))
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export const decodeString = (encodedData: string) => {
  const base64 = encodedData.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(base64)

  const compressed = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  const decompressed = pako.inflate(compressed, { to: "string" })

  return JSON.parse(decompressed)
}
