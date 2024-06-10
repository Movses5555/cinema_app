import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { MovieCard } from "../../../components/movieEditCard";
import { fetchAdminRoomsAsync } from "../../../redux/adminRoomReducer";
import {
  addMovieAsync,
  removeFileAsync,
  uploadFileAsync,
  handleRemoveAllErrors,
} from "../../../redux/adminMovieReducer";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const AdminMovieCreatePage = () => {
  const dispatch = useDispatch();

  const { rooms, loadingRooms } = useSelector((state) => state.adminRoom);
  const {
    loadingAddMovie, 
    uploadedFilePath,
    uploadedFileFullPath,
    loadingFileUploading,
    loadingFileRemoving,
    errors,
  } = useSelector((state) => state.adminMovie);

  useEffect(() => {
    dispatch(fetchAdminRoomsAsync());
    return () => {
      dispatch(handleRemoveAllErrors())
    }
  }, [dispatch]);

  const handleSaveChanges = (data) => {
    data.poster = uploadedFilePath;
    dispatch(addMovieAsync(data));
  };

  const handleFileUploading = (file) => {
    if (file) {
      dispatch(uploadFileAsync(file));
    }
  };
  const handleFileRemoving = (filename) => {
    if (filename) {
      dispatch(removeFileAsync(filename));
    }
  };
  
  if (loadingRooms) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-16">
        <Typography variant="h2" className="text-start mb-8">
          Create Movie
        </Typography>
      </div>
      <MovieCard
        rooms={rooms}
        errors={errors}
        loadingSaveMovie={loadingAddMovie}
        uploadedFilePath={uploadedFilePath}
        uploadedFileFullPath={uploadedFileFullPath}
        loadingFileUploading={loadingFileUploading}
        loadingFileRemoving={loadingFileRemoving}
        saveChanges={handleSaveChanges}
        handleFileUploading={handleFileUploading}
        handleFileRemoving={handleFileRemoving}
      />
    </div>
  );
};
