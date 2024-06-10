import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  fetchAdminMoviesAsync,
  removeMovieAsync,
} from "../../../redux/adminMovieReducer";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ConfirmationDialog } from "../../../components/dialog";

export const AdminMoviesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { 
    loadingMovies, 
    loadingRemoveMovie,
    movies, 
  } = useSelector((state) => state.adminMovie);

  useEffect(() => {
    dispatch(fetchAdminMoviesAsync());
  }, [dispatch]);

  const handleMenuToggle = (movieId) => {
    setMenuOpen((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  const handleOpenDialog = (bool, movieId) => {
    setOpenDialog(bool);
    setSelectedMovieId(movieId);
  };
  const handleDelete = () => {
    dispatch(removeMovieAsync(selectedMovieId));
    if(!loadingRemoveMovie) {
      setOpenDialog(false);
      setSelectedMovieId(null);
    }
  };

  if (loadingMovies) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start mb-8">
        <Typography variant="h2" className="text-center mb-8">
          Movies List
        </Typography>
        <Link to={`/admin/movies/new`}>
          <Button color="blue" size="lg">
            Add New Movie
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        {movies.map((movie) => (
          <Card key={movie.id} className="shadow-lg mb-8">
            <CardHeader color="blue" className="relative h-56">
              <img
                src={movie.posterFullPath}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Menu
                  open={menuOpen[movie.id]}
                  handler={() => handleMenuToggle(movie.id)}
                >
                  <MenuHandler>
                    <IconButton className="p-2 bg-transparent hover:bg-gray-200">
                      <EllipsisVerticalIcon className="h-6 w-6 text-white" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                    <MenuItem
                      className="flex"
                      onClick={() => navigate(`/admin/movies/${movie.id}/edit`)}
                    >
                      <PencilIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <Typography className="text-blue-500">Edit</Typography>
                    </MenuItem>
                    <MenuItem
                      className="flex"
                      onClick={() => handleOpenDialog(true, movie.id)}
                    >
                      <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                      <Typography className="text-red-500">Delete</Typography>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                {movie.title}
              </Typography>
              <Typography className='truncate'>{movie.description}</Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
              <Link to={`/admin/movies/${movie.id}`}>
                <Button color="blue" size="sm">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ConfirmationDialog
        isOpen={isOpenDialog}
        text="Do you have delete this movies?"
        handleConfirm={handleDelete}
        loading={loadingRemoveMovie}
      />
    </div>
  );
};
