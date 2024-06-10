import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { fetchClientMoviesByRoomIdAsync } from "../../redux/cinemaReducer";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const ClientRoomPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams("id");

  const { 
    loadingMoviesByRoom,
    moviesByRoom
  } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClientMoviesByRoomIdAsync(id));
  }, [dispatch, id]);

  if (loadingMoviesByRoom) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mt-24 px-5">
      {
        !moviesByRoom?.length && (
          <div className="flex justify-center">
            <Typography variant="h3" className="mb-2">
              Room have not movies
            </Typography>
          </div>
        )
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        {moviesByRoom?.map((movie) => (
          <Link key={movie.id} to={`/room/${id}/movies/${movie.id}`}>
            <Card className="shadow-lg mb-8">
              <CardHeader color="blue" className="relative h-56">
                <img
                  src={movie.posterFullPath}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {movie?.title}
                </Typography>
                <div className="flex flex-wrap">
                  {Object.keys(movie.seances).map((date, index) => {
                    if(index > 5) {
                      return ''
                    }
                    return (
                      <div key={date} className="mr-6">
                        <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                          {date}
                        </div>
                        {movie.seances[date].map((item) => (
                          <div key={item.id} style={{ marginLeft: "20px" }}>
                            {item.time}
                          </div>
                        ))}
                      </div>
                    )}
                  )}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
