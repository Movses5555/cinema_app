import React from "react";
import {
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";



export const Seances = ({
  rooms,
  seances,
  onChangeRoom,
  onChangeDate,
  onChangeTime,
  onAddNewSeance,
  onAddNewTime,
  onRemoveSeance,
  onRemoveTime,
  errors,
}) => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-start mb-3">
        <Typography variant="h3">Seances</Typography>
        <div className="flex justify-end">
          <Button color="blue" size="md" onClick={onAddNewSeance}>
            Add New Seance
          </Button>
        </div>
      </div>
      {seances?.map((seance, index) => {
        return (
          <div key={index.toString()} className="mb-5">
            {seances?.length > 1 && (
              <div className="flex justify-end mt-4">
                <Button
                  color="red"
                  size="sm"
                  onClick={() => onRemoveSeance(seance.id)}
                >
                  Remove Seance
                </Button>
              </div>
            )}
            <div className="mb-4 max-w-[250px]">
              <div className="flex justify-between">
                <Typography variant="h5" className="mb-2">
                  Room
                </Typography>
              </div>
              <Select
                id="room"
                value={seance?.roomId?.toString()}
                onChange={(value) => onChangeRoom(seance.id, +value)}
                className="border border-gray-300 rounded-md p-2 w-full "
              >
                {rooms?.map((room) => (
                  <Option key={room.id?.toString()} value={room.id.toString()}>
                    {room.name}
                  </Option>
                ))}
              </Select>
              {!!errors?.seances?.[index]?.roomId && (
                <Typography variant="small" color="red" className="mb-2">
                  {errors?.seances?.[index]?.roomId}
                </Typography>
              )}
            </div>
            <div className="">
              <div className="">
                <Typography variant="h5" className="mr-2 mb-2">
                  Select date:
                </Typography>
                <div>
                  <input
                    type="date"
                    id={`date-${seance.id}`}
                    value={seance.date}
                    onChange={(event) =>
                      onChangeDate(seance.id, event.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2 mr-2"
                  />
                  {!!errors?.seances?.[index]?.date && (
                    <Typography variant="small" color="red" className="mb-2">
                      {errors?.seances?.[index]?.date}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <div className="my-2">
                  <div className="min-w-[130px] mb-2">
                    <Typography variant="h5" className="mr-2">
                      Select time:
                    </Typography>
                  </div>
                  <div className="flex flex-wrap justify-start">
                    {seance.times?.map((time, timeIndex) => {
                      return (
                        <div
                          key={timeIndex}
                          className="flex items-start mb-2 mr-4"
                        >
                          <div>
                            <input
                              type="time"
                              id={`time-${seance.id}-${timeIndex}`}
                              value={time}
                              onChange={(event) =>
                                onChangeTime(
                                  seance.id,
                                  timeIndex,
                                  event.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md p-2 mr-2"
                            />
                            {!!errors?.seances?.[index]?.times?.[timeIndex] && (
                              <Typography
                                variant="small"
                                color="red"
                                className="mb-2 max-w-full"
                              >
                                {errors?.seances?.[index]?.times?.[timeIndex]}
                              </Typography>
                            )}
                          </div>
                          {seance.times.length > 1 && (
                            <Button
                              color="red"
                              size="sm"
                              className="ml-2"
                              onClick={() => onRemoveTime(seance.id, timeIndex)}
                            >
                              <TrashIcon className="h-4 w-4 text-withe" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                    <div>
                      <Button
                        color="blue"
                        size="sm"
                        onClick={() => onAddNewTime(seance.id)}
                      >
                        Add New Time
                      </Button>
                    </div>
                  </div>
                </div>
                {seances?.length > 1 && seances?.length - 1 !== index && (
                  <div className="border-t border-gray-200 w-full my-8"></div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
