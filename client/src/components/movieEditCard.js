import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ImageUpload } from "./imageUpload";
import { ConfirmationDialog } from "./dialog";
import { convertMinutesToTime } from "../utils";
import { LoadingSpinner } from "./LoadingSpinner";
import { Seances } from "./seances";

export const MovieCard = ({
  isEdit = false,
  movie,
  rooms,
  errors,
  loadingSaveMovie,
  loadingRemoveMovie,
  saveChanges,
  handleDelete,
  uploadedFilePath,
  uploadedFileFullPath,
  loadingFileUploading,
  handleFileUploading,
  handleFileRemoving,
  loadingFileRemoving,
}) => {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [duration, setDuration] = useState("");
  const [movieData, setMovieData] = useState(movie);
  const [movieChangeData, setMovieChangeData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [seances, setSeances] = useState([]);

  const seancesInitData = {
    id: uuidv4(),
    roomId: "",
    date: "",
    times: [""],
  };

  useEffect(() => {
    if (isEdit && movie) {
      setMovieData(movie);
      setSeances(movie.seances);
      setMovieChangeData({ seances: movie.seances });
    } else {
      setSeances([seancesInitData]);
      setMovieChangeData({ seances: [seancesInitData] });
    }
    return () => {
      setMovieData(null);
      setMovieChangeData({});
    };
  }, [movie, isEdit]);

  useEffect(() => {
    if (uploadedFilePath) {
      setMovieData({
        ...movieData,
        poster: uploadedFilePath,
        posterFullPath: uploadedFileFullPath,
      });
      setMovieChangeData({
        ...movieChangeData,
        poster: uploadedFilePath,
      });
    }
  }, [uploadedFilePath, uploadedFileFullPath]);

  useEffect(() => {
    const durationTime = convertMinutesToTime(movieData?.duration);
    setDuration(durationTime);
  }, [movieData?.duration]);

  useEffect(() => {
    if (errors) {
      setErrorMessages(errors);
    } else {
      setErrorMessages({});
    }
  }, [errors]);

  const handleChange = (name, value) => {
    setMovieData({
      ...movieData,
      [name]: value,
    });
    setMovieChangeData({
      ...movieChangeData,
      [name]: value,
    });
    removeErrorMessage(name);
  };

  const removeErrorMessage = (name) => {
    let errors = {
      ...errorMessages,
      [name]: null,
    };
    setErrorMessages(errors);
  };

  const handleRemoveImage = () => {
    setMovieData({
      ...movieData,
      poster: null,
      posterFullPath: null,
    });
    setMovieChangeData({
      ...movieChangeData,
      poster: null,
    });
    handleFileRemoving(uploadedFilePath);
  };

  const handleSaveChanges = () => {
    const changesData = { ...movieChangeData };
    saveChanges(changesData);
  };

  const handleDeleteMovie = (bool) => {
    if (bool && handleDelete) {
      handleDelete();
      if (loadingRemoveMovie) {
        setOpenDialog(false);
      }
    } else {
      setOpenDialog(false);
    }
  };

  const handleChangeRoom = (seanceId, roomId) => {
    const data = seances.map((seance) => {
      if (seance.id === seanceId) {
        return {
          ...seance,
          roomId: roomId,
        };
      }
      return seance;
    });
    const changeDataSeances = movieChangeData?.seances?.map((seance) => {
      if (seance.id === seanceId) {
        return {
          ...seance,
          roomId: roomId,
        };
      }
      return seance;
    });
    setSeances(data);
    setMovieChangeData({
      ...movieChangeData,
      seances: changeDataSeances,
    });
  };

  const handleChangeDate = (seanceId, date) => {
    const data = seances.map((seance) => {
      if (seance.id === seanceId) {
        return {
          ...seance,
          date: date,
        };
      }
      return seance;
    });
    const changeDataSeances = movieChangeData?.seances?.map((seance) => {
      if (seance.id === seanceId) {
        return {
          ...seance,
          date: date,
        };
      }
      return seance;
    });
    setSeances(data);
    setMovieChangeData({
      ...movieChangeData,
      seances: changeDataSeances,
    });
  };

  const handleChangeTime = (seanceId, timeIndex, time) => {
    const data = seances.map((seance) => {
      if (seance.id === seanceId) {
        let newTimes = [...seance.times];
        newTimes[timeIndex] = time;
        return {
          ...seance,
          times: newTimes,
        };
      }
      return seance;
    });
    const changeDataSeances = movieChangeData?.seances?.map((seance) => {
      if (seance.id === seanceId) {
        let newTimes = [...seance.times];
        newTimes[timeIndex] = time;
        return {
          ...seance,
          times: newTimes,
        };
      }
      return seance;
    });
    setSeances(data);
    setMovieChangeData({
      ...movieChangeData,
      seances: changeDataSeances,
    });
  };

  const handleAddNewSeance = () => {
    setSeances([...seances, { ...seancesInitData }]);
    setMovieChangeData({
      ...movieChangeData,
      seances: [...movieChangeData.seances, { ...seancesInitData }],
    });
  };

  const handleAddNewTime = (seanceId) => {
    const data = seances.map((seance) => {
      if (seance.id === seanceId) {
        return {
          ...seance,
          times: [...seance.times, ""],
        };
      }
      return seance;
    });
    const changeDataSeances = movieChangeData?.seances?.map((seance) => {
      if (seance.id === seanceId) {
        return {
          ...seance,
          times: [...seance.times, ""],
        };
      }
      return seance;
    });
    setSeances(data);
    setMovieChangeData({
      ...movieChangeData,
      seances: changeDataSeances,
    });
  };

  const handleRemoveSeance = (seanceId) => {
    setSeances([...seances.filter((seance) => seance.id !== seanceId)]);
    const changeDataSeances = movieChangeData?.seances.filter(
      (seance) => seance.id !== seanceId
    );
    setMovieChangeData({
      ...movieChangeData,
      seances: changeDataSeances,
    });
  };

  const handleRemoveTime = (seanceId, timeIndex) => {
    const data = seances.map((seance) => {
      if (seance.id === seanceId) {
        let newTimes = [...seance.times].splice(timeIndex, 1);
        return {
          ...seance,
          times: newTimes,
        };
      }
      return seance;
    });
    const changeDataSeances = movieChangeData?.seances.map((seance) => {
      if (seance.id === seanceId) {
        let newTimes = [...seance.times].splice(timeIndex, 1);
        return {
          ...seance,
          times: newTimes,
        };
      }
      return seance;
    });
    setSeances(data);
    setMovieChangeData({
      ...movieChangeData,
      seances: changeDataSeances,
    });
  };

  if (isEdit && !movieData) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Card className="shadow-lg">
        <CardHeader color="blue" className="relative h-auto max-h-[400px]">
          <ImageUpload
            image={uploadedFileFullPath || movieData?.posterFullPath}
            loading={loadingFileUploading}
            loadingFileRemoving={loadingFileRemoving}
            handleImageChange={handleFileUploading}
            handleRemoveImage={handleRemoveImage}
          />
        </CardHeader>
        <CardBody className="pt-0">
          {!!errors?.poster && (
            <div>
              <Typography variant="small" color="red" className="mb-2">
                {errors?.poster}
              </Typography>
            </div>
          )}
          <div className="mb-4 mt-6">
            <Typography variant="h5" className="mb-2">
              Title
            </Typography>
            <input
              type="text"
              value={movieData?.title || ""}
              maxLength={50}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {!!errorMessages?.title && (
              <Typography variant="small" color="red" className="mb-2">
                {errorMessages.title}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Typography variant="h5" className="mb-2">
              Description
            </Typography>
            <textarea
              value={movieData?.description}
              maxLength={500}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              rows="4"
            ></textarea>
            {!!errorMessages?.description && (
              <Typography variant="small" color="red" className="mb-2">
                {errorMessages.description}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Typography variant="h5" className="mb-2">
              Duration
            </Typography>
            <div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={movieData?.duration || ""}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="max-w-[250px] border border-gray-300 rounded-md p-2 w-full"
                />
                <Typography variant="h6" className="ml-2">
                  {duration}
                </Typography>
              </div>
              {!!errorMessages?.duration && (
                <Typography variant="small" color="red" className="mb-2">
                  {errorMessages.duration}
                </Typography>
              )}
            </div>
          </div>
          <Seances
            seances={seances}
            errors={errors}
            rooms={rooms}
            onChangeRoom={handleChangeRoom}
            onChangeDate={handleChangeDate}
            onChangeTime={handleChangeTime}
            onAddNewSeance={handleAddNewSeance}
            onAddNewTime={handleAddNewTime}
            onRemoveSeance={handleRemoveSeance}
            onRemoveTime={handleRemoveTime}
          />
        </CardBody>
        <CardFooter>
          <div className={`flex justify-${isEdit ? "between" : "center"}`}>
            <Button
              color="blue"
              onClick={handleSaveChanges}
              loading={loadingSaveMovie.toString()}
            >
              Save Changes
            </Button>
            {isEdit && (
              <Button color="red" onClick={() => setOpenDialog(true)}>
                Delete Movie
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        isOpen={isOpenDialog}
        text="Do you have delete this movies?"
        handleConfirm={handleDeleteMovie}
        loading={loadingRemoveMovie}
      />
    </>
  );
};
