import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { RoomList } from "../../components/roomList";
import { fetchClientRoomsAsync } from "../../redux/cinemaReducer";

export const ClientHomePage = () => {
  const dispatch = useDispatch();
  const { loadingRooms, rooms } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClientRoomsAsync());
  }, [dispatch]);

  if (loadingRooms) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full h-[500px]">
      <div className="container mx-auto p-4">
        <RoomList rooms={rooms} />
      </div>
    </div>
  );
};
