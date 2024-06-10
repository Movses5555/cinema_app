import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export const RoomList = ({ rooms }) => {
  return (
    <div>
      <div className="flex items-center justify-center mb-10">
        <Typography variant="h2" color="blue-gray" className="mb-2">
          Room List
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        {rooms.map((room) => (
          <Link key={room.id} to={`/room/${room.id}`}>
            <Card className="mt-6">
              <CardBody className="flex items-center justify-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {room.name}
                </Typography>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
