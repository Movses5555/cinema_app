import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  addRoomAsync,
  fetchAdminRoomsAsync,
  removeRoomAsync,
  updateRoomAsync,
  handleChangeOpenDialog,
  handleChangeError,
} from "../../../redux/adminRoomReducer";
import { ConfirmationDialog } from "../../../components/dialog";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const AdminRoomsPage = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomName, setRoomName] = useState("");

  const {
    loadingRooms,
    rooms,
    loadingAddRoom,
    loadingUpdateRoom,
    loadingRemoveRoom,
    openDialog,
    error
  } = useSelector((state) => state.adminRoom);

  useEffect(() => {
    dispatch(fetchAdminRoomsAsync());
  }, [dispatch]);

  useEffect(() => {
    if(error?.name) {
      dispatch(handleChangeError({name: 'name', value: ''}))
    }
  }, []);

  const handleMenuToggle = (movieId) => {
    setMenuOpen((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  const handleDeleteRoom = (bool) => {
    if (bool) {
      dispatch(removeRoomAsync(selectedRoom?.id));
      if (!loadingRemoveRoom) {
        setOpenConfirmationDialog(false);
      }
    } else {
      setOpenConfirmationDialog(false);
    }
  };

  const handleChange = (value) => {
    setRoomName(value);
    if(error?.name) {
      dispatch(handleChangeError({name: 'name', value: ''}))
    }
  };
  
  const handleOpenDialog = (room) => {
    setSelectedRoom(room ? room : null);
    setRoomName(room ? room.name : "");
    dispatch(handleChangeOpenDialog(true))
  };

  const handleCloseDialog = () => {
    dispatch(handleChangeOpenDialog(false))
    dispatch(handleChangeError({name: 'name', value: ''}))
  };

  const handleSaveRoom = () => {
    if (!selectedRoom?.id) {
      dispatch(addRoomAsync({ name: roomName }));
    } else {
      dispatch(
        updateRoomAsync({ id: selectedRoom.id, data: { name: roomName } })
      );
    }
  };

  if (loadingRooms) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
        <Typography variant="h2" className="text-center mb-8">
          Room List
        </Typography>
        <Button color="blue" size="lg" onClick={() => handleOpenDialog()}>
          Add Room
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <Card key={room.id} className="shadow-lg">
            <CardBody className="relative">
              <Typography variant="h5" className="">
                {room.name}
              </Typography>
              <div className="absolute top-2 right-2 ">
                <Menu
                  open={menuOpen[room.id]}
                  handler={() => {
                    setSelectedRoom(room);
                    handleMenuToggle(room.id);
                  }}
                >
                  <MenuHandler>
                    <IconButton className="p-2 hover:bg-gray-200">
                      <EllipsisVerticalIcon className="h-6 w-6 text-white" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                    <MenuItem
                      className="flex"
                      onClick={() => handleOpenDialog(room)}
                    >
                      <PencilIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <Typography className="text-blue-500">Edit</Typography>
                    </MenuItem>
                    <MenuItem
                      className="flex"
                      onClick={() => setOpenConfirmationDialog(true)}
                    >
                      <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                      <Typography className="text-red-500">Delete</Typography>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>{!!selectedRoom ? "Edit Room" : "Add Room"}</DialogHeader>
        <DialogBody>
          <input
            type="text"
            value={roomName}
            minLength={3}
            maxLength={25}
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={(e) => handleChange(e.target.value)}
          />
          {
            !!error?.name && (
              <Typography variant="small" color="red" className="mb-2">
                {error.name}
              </Typography>
            )
          }
        </DialogBody>
        <DialogFooter>
          <Button
            color="gray"
            className="text-black-500 mr-2"
            onClick={handleCloseDialog}
          >
            Close
          </Button>
          <Button
            color="blue"
            disabled={!roomName || loadingAddRoom || loadingUpdateRoom}
            onClick={handleSaveRoom}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
      <ConfirmationDialog
        isOpen={openConfirmationDialog}
        text="Do you have delete this room?"
        handleConfirm={handleDeleteRoom}
        loading={loadingRemoveRoom}
      />
    </div>
  );
};
