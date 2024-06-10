import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { MovieListTable } from "../../components/movieListTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientMovieByIdAsync } from "../../redux/cinemaReducer";
import {} from "../../api/client";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const ClientMoviePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, movieId } = useParams();
  const [selectedDate, setSelectedDate] = useState("");

  
  const { movie, loadingMovie } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClientMovieByIdAsync(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movie?.seances && Object.keys(movie?.seances).length) {
      if (!selectedDate) {
        setSelectedDate(Object.keys(movie?.seances)?.[0]);
      }
    }
  }, [movie, selectedDate]);

  const buyTicket = (data) => {
    navigate(
      `/room/${id}/movies/${data.movieId}/ticket?date=${data.date}&time=${data.time}`
    );
  };

  if (loadingMovie) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-5">
      <Card className="w-full flex-row min-h-[250px]">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-1/2 shrink-0 rounded-r-none"
        >
          <img
            src={movie.posterFullPath}
            alt="poster"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="w-1/2">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {movie.title}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {movie.description}
          </Typography>
        </CardBody>
      </Card>
      <div className="mt-10">
        <MovieListTable
          seances={movie.seances}
          selectedDate={selectedDate}
          handleChangeSelectedDate={setSelectedDate}
          buyTicket={buyTicket}
        />
      </div>
    </div>
  );
};
