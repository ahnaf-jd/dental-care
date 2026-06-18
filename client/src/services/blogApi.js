export const API_URL = import.meta.env.VITE_API_URL || "https://dental-care-wmmi.onrender.com";

export function mediaUrl(path) {

  if (!path) return null;

  if (path.startsWith("http")) return path;

  return `${API_URL}${path}`;

}



export class BlogApiError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = "BlogApiError";
    this.errors = errors;
  }
}

export function mapApiErrorsToFields(errors) {
  const map = {};
  for (const err of errors) {
    if (err.field) map[err.field] = err.message;
  }
  return map;
}

async function parseResponse(res) {

  const data = await res.json();

  if (!res.ok || !data.success) {
    if (data.errors && Array.isArray(data.errors)) {
      throw new BlogApiError(data.message || "Request failed", data.errors);
    }
    throw new Error(data.message || "Request failed");
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

    headers: {

      // Don't set Content-Type here - let browser set it automatically with boundary for FormData

    },

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

