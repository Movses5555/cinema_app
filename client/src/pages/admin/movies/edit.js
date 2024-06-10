import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { MovieCard } from "../../../components/movieEditCard";
import {
  fetchAdminMovieAsync,
  removeFileAsync,
  removeMovieAsync,
  updateMovieAsync,
  uploadFileAsync,
  handleRemoveAllErrors,
} from "../../../redux/adminMovieReducer";
import { fetchAdminRoomsAsync } from "../../../redux/adminRoomReducer";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const AdminMovieEditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loadingMovie,
    movie,
    uploadedFilePath,
    uploadedFileFullPath,
    loadingFileUploading,
    loadingUpdateMovie,
    loadingRemoveMovie,
    loadingFileRemoving,
    errors,
  } = useSelector((state) => state.adminMovie);
  const { rooms, loadingRooms } = useSelector((state) => state.adminRoom);



  useEffect(() => {
    dispatch(fetchAdminMovieAsync(id));
    dispatch(fetchAdminRoomsAsync());

    return () => {
      dispatch(handleRemoveAllErrors())
    }
  }, [dispatch]);

  const handleSaveChanges = (data) => {
    dispatch(updateMovieAsync({ id, data }));
  };

  const handleDeleteMovie = () => {
    dispatch(removeMovieAsync(id));
    navigate(`/admin`);
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

  if (loadingMovie || loadingRooms) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-16">
        <Typography variant="h2" className="text-start mb-8">
          Edit Movie
        </Typography>
      </div>
      <MovieCard
        isEdit
        movie={movie}
        rooms={rooms}
        errors={errors}
        uploadedFilePath={uploadedFilePath}
        uploadedFileFullPath={uploadedFileFullPath}
        loadingFileUploading={loadingFileUploading}
        loadingSaveMovie={loadingUpdateMovie}
        loadingRemoveMovie={loadingRemoveMovie}
        loadingFileRemoving={loadingFileRemoving}
        saveChanges={handleSaveChanges}
        handleDelete={handleDeleteMovie}
        handleFileUploading={handleFileUploading}
        handleFileRemoving={handleFileRemoving}
      />
    </div>
  );
};
