import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MovieDetails } from "../../../components/movieDetailsPage";
import {
  fetchAdminMovieAsync,
  removeMovieAsync,
} from "../../../redux/adminMovieReducer";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const AdminMovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loadingMovie, movie } = useSelector((state) => state.adminMovie);

  useEffect(() => {
    dispatch(fetchAdminMovieAsync(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(removeMovieAsync(id));
  };

  if (loadingMovie) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <MovieDetails movie={movie} handleDelete={handleDelete} />
    </div>
  );
};
