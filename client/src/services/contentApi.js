import { API_URL, mediaUrl } from "./blogApi";

async function parseResponse(res) {
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function fetchSiteContent() {
  const res = await fetch(`${API_URL}/api/content`);
  return parseResponse(res);
}

export async function updateSiteContent(formData) {
  const res = await fetch(`${API_URL}/api/content`, {
    method: "PUT",
    body: formData,
  });
  return parseResponse(res);
}

export { mediaUrl };
