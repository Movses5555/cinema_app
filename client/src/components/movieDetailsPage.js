import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const MovieDetails = ({ movie, handleDelete }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (movieId) => {
    setMenuOpen((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  if (!movie) {
    return <Typography variant="h4">Movie not found</Typography>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader color="blue" className="relative h-auto">
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
              <MenuItem className="flex" onClick={() => handleDelete(movie.id)}>
                <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                <Typography className="text-red-500">Delete</Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h3" className="mb-4">
          {movie.title}
        </Typography>
        <Typography>{movie.description}</Typography>
      </CardBody>
    </Card>
  );
};
