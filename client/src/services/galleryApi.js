import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api/gallery`,
});

export async function fetchGallery() {
  const { data } = await api.get("/");
  return data;
}

export async function uploadGalleryItem(formData) {
  const { data } = await api.post("/", formData);
  return data;
}

export async function updateGalleryItem(id, formData) {
  const { data } = await api.put(`/${id}`, formData);
  return data;
}

export async function deleteGalleryItem(id) {
  const { data } = await api.delete(`/${id}`);
  return data;
}
