import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminMovieReducer from "./adminMovieReducer";
import adminRoomReducer from "./adminRoomReducer";
import cinemaReducer from "./cinemaReducer";

const rootReducer = combineReducers({
  adminMovie: adminMovieReducer,
  adminRoom: adminRoomReducer,
  client: cinemaReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'adminRoom/fetchAdminRooms/fulfilled',
          'adminRoom/updateRoom/fulfilled',
          'adminRoom/addRoom/fulfilled',
          'adminMovie/fetchAdminMovies/fulfilled',
          'adminMovie/fetchAdminMovie/fulfilled',
          'adminMovie/addMovie/fulfilled',
          'adminMovie/updateMovie/fulfilled',
          'adminMovie/removeMovie/fulfilled',
        ],
      },
    }),
});
