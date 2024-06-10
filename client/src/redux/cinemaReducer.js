import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchClientRooms,
  fetchClientMoviesByRoomId,
  bookSeats,
  getBookedSeats,
  fetchClientMovieById,
} from "../api/client";


const cinemaSlice = createSlice({
  name: "client",
  initialState: {
    rooms: [],
    movies: [],
    movie: {},
    moviesByRoom: [],
    movieByDateTime: {},
    seats: [],
    bookedSeats: {},
    selectedMovie: null,
    selectedRoom: null,
    loadingRooms: true,
    loadingMovies: true,
    loadingMovie: true,
    loadingMoviesByRoom: true,
    loadingBookSeats: false,
    loadingMovieByDateTime: false,
    loadingBookedSeats: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchClientRoomsAsync.pending, (state) => {
        state.loadingRooms = true;
      })
      .addCase(fetchClientRoomsAsync.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loadingRooms = false;
      })
      .addCase(fetchClientRoomsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingRooms = false;
      })
      
      .addCase(fetchClientMoviesByRoomIdAsync.pending, (state) => {
        state.loadingMoviesByRoom = true;
      })
      .addCase(fetchClientMoviesByRoomIdAsync.fulfilled, (state, action) => {
        state.moviesByRoom = action.payload;
        state.loadingMoviesByRoom = false;
      })
      .addCase(fetchClientMoviesByRoomIdAsync.rejected, (state, action) => {
        state.loadingMoviesByRoom = false;
        state.error = action.payload;
      })
      
      .addCase(fetchClientMovieByIdAsync.pending, (state) => {
        state.loadingMovie = true;
      })
      .addCase(fetchClientMovieByIdAsync.fulfilled, (state, action) => {
        state.movie = action.payload;
        state.loadingMovie = false;
      })
      .addCase(fetchClientMovieByIdAsync.rejected, (state, action) => {
        state.loadingMovie = false;
        state.error = action.payload;
      })
      
      .addCase(getBookedSeatsAsync.pending, (state) => {
        state.loadingBookedSeats = true;
      })
      .addCase(getBookedSeatsAsync.fulfilled, (state, action) => {
        state.bookedSeats = action.payload;
        state.loadingBookedSeats = false;
      })
      .addCase(getBookedSeatsAsync.rejected, (state, action) => {
        state.loadingBookedSeats = false;
        state.error = action.payload;
      })
      
      .addCase(bookSeatsAsync.pending, (state) => {
        state.loadingBookSeats = true;
      })
      .addCase(bookSeatsAsync.fulfilled, (state, action) => {
        const {bookedSeats} = action.payload
        state.bookedSeats = {...bookedSeats};
        state.loadingBookSeats = false;
      })
      .addCase(bookSeatsAsync.rejected, (state, action) => {
        state.loadingBookSeats = false;
        state.error = action.payload;
      });
  },
});

export const fetchClientRoomsAsync = createAsyncThunk(
  "clientRoom/fetchClientRooms",
  async (_, thunkAPI) => {
    try {
      const response = await fetchClientRooms();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchClientMovieByIdAsync = createAsyncThunk(
  "clientRoom/fetchClientMovieById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchClientMovieById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchClientMoviesByRoomIdAsync = createAsyncThunk(
  "clientMovies/fetchClientMoviesByRoomId",
  async (roomId, thunkAPI) => {
    try {
      const response = await fetchClientMoviesByRoomId(roomId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getBookedSeatsAsync = createAsyncThunk(
  "clientMovies/getBookedSeats",
  async ({ movieId, roomId, params }, thunkAPI) => {
    try {
      const response = await getBookedSeats(movieId, roomId, params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const bookSeatsAsync = createAsyncThunk(
  "clientMovies/bookSeats",
  async (data, thunkAPI) => {
    try {
      const response = await bookSeats(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export default cinemaSlice.reducer;
