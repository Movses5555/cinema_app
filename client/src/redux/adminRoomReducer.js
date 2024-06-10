import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminRooms,
  addRoom,
  updateRoom,
  removeRoomById,
} from "../api/admin";

export const adminRoomSlice = createSlice({
  name: "adminRoom",
  initialState: {
    rooms: [],
    loadingRooms: true,
    loadingAddRoom: false,
    loadingUpdateRoom: false,
    loadingRemoveRoom: false,
    error: {},
    openDialog: false
  },
  reducers: {
    handleChangeOpenDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    handleChangeError: (state, action) => {
      const {name, value} = action.payload;
      state.error = {
        ...state.error,
        [name]: value
      } 
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchAdminRoomsAsync.pending, (state) => {
        state.loadingRooms = true;
      })
      .addCase(fetchAdminRoomsAsync.fulfilled, (state, action) => {
        state.rooms = action.payload.data;
        state.loadingRooms = false;
      })
      .addCase(fetchAdminRoomsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingRooms = false;
      })
      
      .addCase(addRoomAsync.pending, (state) => {
        state.loadingAddRoom = true;
      })
      .addCase(addRoomAsync.fulfilled, (state, action) => {
        state.rooms = [...state.rooms, action.payload.data];
        state.openDialog = false;
        state.loadingAddRoom = false;
      })
      .addCase(addRoomAsync.rejected, (state, action) => {
        state.loadingAddRoom = false;
        state.error = action.payload;
      })
      
      .addCase(updateRoomAsync.pending, (state) => {
        state.loadingUpdateRoom = true;
      })
      .addCase(updateRoomAsync.fulfilled, (state, action) => {
        const data = action.payload.data;
        const rooms = state.rooms.map((room) => {
          if (room.id === data.id) {
            return {
              ...room,
              ...data,
            };
          }
          return room;
        });
        state.rooms = rooms;
        state.loadingUpdateRoom = false;
      })
      .addCase(updateRoomAsync.rejected, (state, action) => {
        state.loadingUpdateRoom = false;
        state.error = action.payload;
      })
      
      .addCase(removeRoomAsync.pending, (state) => {
        state.loadingRemoveRoom = true;
      })
      .addCase(removeRoomAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.rooms = state.rooms.filter((Room) => Room.id !== id);
        state.loadingRemoveRoom = false;
      })
      .addCase(removeRoomAsync.rejected, (state, action) => {
        state.loadingRemoveRoom = false;
        state.error = action.payload;
      });
  },
});
export const fetchAdminRoomsAsync = createAsyncThunk(
  "adminRoom/fetchAdminRooms",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAdminRooms();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const removeRoomAsync = createAsyncThunk(
  "adminRoom/removeRoom",
  async (id, thunkAPI) => {
    try {
      await removeRoomById(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const addRoomAsync = createAsyncThunk(
  "adminRoom/addRoom",
  async (data, thunkAPI) => {
    try {
      const response = await addRoom(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const updateRoomAsync = createAsyncThunk(
  "adminRoom/updateRoom",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateRoom(id, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)


export const { 
  handleChangeOpenDialog,
  handleChangeError,
} = adminRoomSlice.actions

export default adminRoomSlice.reducer;
