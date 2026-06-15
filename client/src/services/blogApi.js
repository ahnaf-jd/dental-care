export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

export class BlogApiError extends Error {
  constructor(message, { errors = [], status } = {}) {
    super(message);
    this.name = "BlogApiError";
    this.errors = errors;
    this.status = status;
  }
}

async function parseResponse(res) {
  let data = {};
  try {
    data = await res.json();
  } catch {
    throw new BlogApiError("Invalid server response", { status: res.status });
  }

  if (!res.ok || !data.success) {
    throw new BlogApiError(data.message || "Request failed", {
      errors: data.errors || [],
      status: res.status,
    });
  }

  return data;
}

export async function fetchBlogs() {
  const res = await fetch(`${API_URL}/api/blogs/admin/all`);
  return parseResponse(res);
}

export async function fetchBlogById(id) {
  const res = await fetch(`${API_URL}/api/blogs/${id}`);
  return parseResponse(res);
}

export async function fetchPublishedBlogs(page = 1, limit = 9) {
  const res = await fetch(`${API_URL}/api/blogs/published?page=${page}&limit=${limit}`);
  return parseResponse(res);
}

export async function fetchBlogBySlug(slug, { publishedOnly = true } = {}) {
  const query = publishedOnly ? "?published=true" : "";
  const res = await fetch(`${API_URL}/api/blogs/slug/${slug}${query}`);
  return parseResponse(res);
}

export async function searchBlogs(query, { publishedOnly = false } = {}) {
  const params = new URLSearchParams({ q: query });
  if (publishedOnly) params.set("published", "true");
  const res = await fetch(`${API_URL}/api/blogs/search?${params}`);
  return parseResponse(res);
}

export async function createBlog(formData) {
  const res = await fetch(`${API_URL}/api/blogs`, {
    method: "POST",
    body: formData,
  });
  return parseResponse(res);
}

export async function updateBlog(id, formData) {
  const res = await fetch(`${API_URL}/api/blogs/${id}`, {
    method: "PUT",
    body: formData,
  });
  return parseResponse(res);
}

export async function deleteBlog(id) {
  const res = await fetch(`${API_URL}/api/blogs/${id}`, { method: "DELETE" });
  return parseResponse(res);
}

export function formatBlogDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function mapApiErrorsToFields(errors = []) {
  const fieldErrors = {};
  errors.forEach((err) => {
    const field = err.field || err.path?.[0];
    const message = err.message || err.msg;
    if (field && message) fieldErrors[field] = message;
  });
  return fieldErrors;
}
