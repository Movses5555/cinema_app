import client from "./index";

export const fetchClientRooms = async () => {
  const response = await client.get("/rooms");
  return response.data;
};

export const fetchClientMovieById = async (id) => {
  const response = await client.get(`/movies/${id}`);
  return response.data;
};

export const fetchClientMoviesByRoomId = async (roomId) => {
  const response = await client.get(`/rooms/${roomId}/movies`);
  return response.data;
};

export const bookSeats = async (data) => {
  const response = await client.post(`/booking`, data);
  return response.data;
};

export const getBookedSeats = async (movieId, roomId, params) => {
  const response = await client.get(`/booking/booked-seats/movie/${movieId}/room/${roomId}?${params}`);
  return response.data;
};

