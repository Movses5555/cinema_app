import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  bookSeatsAsync,
  fetchClientMovieByIdAsync,
  getBookedSeatsAsync,
} from "../../redux/cinemaReducer";
import { Seats } from "../../components/seats";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const ClientMovieRoomPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const { id, movieId } = useParams();

  const {
    loadingBookSeats,
    loadingBookedSeats,
    bookedSeats,
    movie,
    loadingMovie
  } = useSelector((state) => state.client);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get("date");
    const timeParam = queryParams.get("time");

    const params = `date=${dateParam}&time=${timeParam}`;
    const data = { movieId, roomId: id, params };
    dispatch(fetchClientMovieByIdAsync(movieId));
    dispatch(getBookedSeatsAsync(data));
    setDate(dateParam);
    setTime(timeParam);
  }, [dispatch, location.search, movieId, id]);

  const handleBuyTickets = (seats) => {
    dispatch(
      bookSeatsAsync({
        roomId: +id,
        movieId: +movieId,
        date,
        time,
        seats,
      })
    );
  };
  
  if (loadingBookedSeats || loadingMovie) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-5 pb-24">
      <div className="w-full  mb-10">
        <img
          src={movie?.posterFullPath}
          alt="poster"
          className="max-h-[350px] w-full object-cover"
        />
      </div>
      <div className="w-full h-2 mt-12 mb-24 bg-red-200"></div>
      <div>
        <Seats
          bookedSeats={bookedSeats}
          handleBuyTickets={handleBuyTickets}
          loadingBookSeats={loadingBookSeats}
        />
      </div>
    </div>
  );
};
