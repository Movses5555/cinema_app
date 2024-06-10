import client from "./index";

export const fetchAdminMovies = () => {
  return client.get(`/admin/movies`);
};

export const fetchAdminMovieById = (id) => {
  return client.get(`/admin/movies/${id}`);
};

export const addMovie = (data) => {
  return client.post(`/admin/movies`, data);
};

export const updateMovie = (id, data) => {
  return client.put(`/admin/movies/${id}`, data);
};

export const removeMovieById = (id) => {
  return client.delete(`/admin/movies/${id}`);
};

export const fetchAdminRooms = () => {
  return client.get(`/admin/rooms`);
};

export const addRoom = (data) => {
  return client.post(`/admin/rooms`, data);
};

export const updateRoom = (id, data) => {
  return client.put(`/admin/rooms/${id}`, data);
};

export const removeRoomById = (id) => {
  return client.delete(`/admin/rooms/${id}`);
};
