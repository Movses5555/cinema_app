import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadFile = async (formData) => {
  const response = await client.post("/upload", formData);
  return response.data;
};

export const removeUploadedFile = async (filename) => {
  const response = await client.delete(`/upload/${filename}`);
  return response.data;
};
