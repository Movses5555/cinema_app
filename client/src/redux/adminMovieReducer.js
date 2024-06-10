import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminMovies,
  fetchAdminMovieById,
  addMovie,
  updateMovie,
  removeMovieById,
} from "../api/admin";
import { removeUploadedFile, uploadFile } from "../api/fileUpload";
import { convertErrorMessages } from "../utils";


export const adminMovieSlice = createSlice({
  name: "adminMovie",
  initialState: {
    movies: [],
    movie: {},
    uploadedFilePath: "",
    uploadedFileFullPath: "",
    loadingMovies: true,
    loadingMovie: true,
    loadingAddMovie: false,
    loadingUpdateMovie: false,
    loadingRemoveMovie: false,
    loadingFileUploading: false,
    loadingFileRemoving: false,
    errors: null,
  },
  reducers: {
    handleRemoveAllErrors: (state, action) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchAdminMoviesAsync.pending, (state) => {
        state.loadingMovies = true;
      })
      .addCase(fetchAdminMoviesAsync.fulfilled, (state, action) => {
        state.movies = action.payload.data;
        state.loadingMovies = false;
      })
      .addCase(fetchAdminMoviesAsync.rejected, (state, action) => {
        state.errors = action.payload;
        state.loadingMovies = false;
      })
      
      .addCase(fetchAdminMovieAsync.pending, (state) => {
        state.loadingMovie = true;
      })
      .addCase(fetchAdminMovieAsync.fulfilled, (state, action) => {
        state.movie = action.payload.data;
        state.loadingMovie = false;
      })
      .addCase(fetchAdminMovieAsync.rejected, (state, action) => {
        state.loadingMovie = false;
        state.errors = action.payload;
      })
      
      .addCase(addMovieAsync.pending, (state) => {
        state.loadingAddMovie = true;
      })
      .addCase(addMovieAsync.fulfilled, (state, action) => {
        state.movies = [...state.movies, action.payload.data];
        state.uploadedFilePath = "";
        state.uploadedFileFullPath = "";
        state.loadingAddMovie = false;
        state.errors = null;
        window.location.href = '/admin'
      })
      .addCase(addMovieAsync.rejected, (state, action) => {
        let errors = convertErrorMessages(action.payload)
        state.loadingAddMovie = false;
        state.errors = errors;
      })
      
      .addCase(updateMovieAsync.pending, (state) => {
        state.loadingUpdateMovie = true;
      })
      .addCase(updateMovieAsync.fulfilled, (state, action) => {
        const data = action.payload.data;
        const movies = state.movies.map((movie) => {
          if (movie.id === data.id) {
            return {
              ...movie,
              ...data,
            };
          }
          return movie;
        });
        state.movies = movies;
        state.uploadedFilePath = "";
        state.uploadedFileFullPath = "";
        state.loadingUpdateMovie = false;
        state.errors = null;
      })
      .addCase(updateMovieAsync.rejected, (state, action) => {
        let errors = convertErrorMessages(action.payload)
        state.loadingUpdateMovie = false;
        state.errors = errors;
      })
      
      .addCase(removeMovieAsync.pending, (state) => {
        state.loadingRemoveMovie = true;
      })
      .addCase(removeMovieAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.movies = state.movies.filter((movie) => movie.id !== id);
        state.loadingRemoveMovie = false;
      })
      .addCase(removeMovieAsync.rejected, (state, action) => {
        state.loadingRemoveMovie = false;
        state.errors = action.payload;
      })
      
      .addCase(uploadFileAsync.pending, (state) => {
        state.loadingFileUploading = true;
      })
      .addCase(uploadFileAsync.fulfilled, (state, action) => {
        const { path, fullPath } = action.payload;
        state.uploadedFilePath = path;
        state.uploadedFileFullPath = fullPath;
        state.loadingFileUploading = false;
      })
      .addCase(uploadFileAsync.rejected, (state, action) => {
        let errors = {}
        if(state.errors) {
          errors = {...state.errors}
        }
        errors = {
          ...errors,
          poster: action.payload.error
        }
        state.errors = {
          ...errors,
          poster: action.payload.error
        };
        state.loadingFileUploading = false;
      })
      
      .addCase(removeFileAsync.pending, (state) => {
        state.loadingFileRemoving = true;
      })
      .addCase(removeFileAsync.fulfilled, (state, action) => {
        state.uploadedFilePath = "";
        state.uploadedFileFullPath = "";
        state.loadingFileRemoving = false;
      })
      .addCase(removeFileAsync.rejected, (state, action) => {
        state.loadingFileRemoving = false;
        state.errors = action.payload;
      });
  },
});

export const fetchAdminMoviesAsync = createAsyncThunk(
  "adminMovie/fetchAdminMovies",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAdminMovies();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchAdminMovieAsync = createAsyncThunk(
  "adminMovie/fetchAdminMovie",
  async (id, thunkAPI) => {
    try {
      const response = await fetchAdminMovieById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const removeMovieAsync = createAsyncThunk(
  "adminMovie/removeMovie",
  async (id, thunkAPI) => {
    try {
      await removeMovieById(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const addMovieAsync = createAsyncThunk(
  "adminMovie/addMovie",
  async (data, thunkAPI) => {
    try {
      const response = await addMovie(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const updateMovieAsync = createAsyncThunk(
  "adminMovie/updateMovie",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateMovie(id, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const uploadFileAsync = createAsyncThunk(
  "adminMovie/uploadFile",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await uploadFile(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const removeFileAsync = createAsyncThunk(
  "adminMovie/removeFile",
  async (filename, thunkAPI) => {
    try {
      const response = await removeUploadedFile(filename);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const { handleRemoveAllErrors } = adminMovieSlice.actions

export default adminMovieSlice.reducer;
