import { Routes, Route, useLocation } from "react-router-dom";
import { AdminMoviesPage } from "../pages/admin/movies";
import { AdminRoomsPage } from "../pages/admin/room";
import { AdminMovieCreatePage } from "../pages/admin/movies/create";
import { AdminMovieDetails } from "../pages/admin/movies/details";
import { AdminMovieEditPage } from "../pages/admin/movies/edit";
import { ClientHomePage } from "../pages/client";
import { ClientRoomPage } from "../pages/client/room";
import { ClientMoviePage } from "../pages/client/movie";
import { ClientMovieRoomPage } from "../pages/client/movieRoom";

export const AppRoutes = () => {
  const location = useLocation();
  const isAdminURL = location.pathname.includes("admin");

  if (isAdminURL) {
    return <AdminRoutes />;
  } else {
    return <ClientRoutes />;
  }
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route exact path="/admin" element={<AdminMoviesPage />} />
      <Route exact path="/admin/movies/new" element={<AdminMovieCreatePage />} />
      <Route exact path="/admin/movies/:id" element={<AdminMovieDetails />} />
      <Route exact path="/admin/movies/:id/edit" element={<AdminMovieEditPage />} />
      <Route exact path="/admin/rooms" element={<AdminRoomsPage />} />
    </Routes>
  );
};

const ClientRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ClientHomePage />} />
      <Route exact path="/room/:id" element={<ClientRoomPage />} />
      <Route exact path="/room/:id/movies/:movieId" element={<ClientMoviePage />} />
      <Route exact path="/room/:id/movies/:movieId/ticket" element={<ClientMovieRoomPage />} />
      <Route path="/*" element={<ClientHomePage />} />
    </Routes>
  );
};
