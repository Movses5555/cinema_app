import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

const roomSeats = {
  row: 10,
  seats: 8,
};

export const Seats = ({
  handleBuyTickets,
  loadingBookSeats,
  bookedSeats,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if(loadingBookSeats && selectedSeats) {
      setSelectedSeats([])
    }
  }, [loadingBookSeats, selectedSeats])

  const handleSeatSelection = (rowIndex, seatIndex) => {
    const isAlreadySelected = selectedSeats.some(
      (seat) => seat.row === rowIndex && seat.seat === seatIndex
    );
    if (isAlreadySelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (seat) => !(seat.row === rowIndex && seat.seat === seatIndex)
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, { row: rowIndex, seat: seatIndex }]);
    }
  };
  const isSeatAvailable = (rowIndex, seatIndex) => {
    let row = bookedSeats?.[rowIndex];
    if(row) {
    }
    if (row?.includes(seatIndex)) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 mb-10">
      <div className="grid gap-4">
        {Array.from({ length: roomSeats.row }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center space-x-2">
            <div className="w-8 h-12 flex items-center justify-center text-black font-semibold">
              {rowIndex + 1}
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: roomSeats.seats }).map((_, seatIndex) => {
                const isDisabled = !isSeatAvailable(rowIndex, seatIndex);
                const isSelected = selectedSeats.some(
                  (seat) => seat.row === rowIndex && seat.seat === seatIndex
                );
                return (
                  <Button
                    key={seatIndex}
                    className={`${
                      !isSelected ? "text-white" : "text-gray-500"
                    }`}
                    color={isSelected || isDisabled ? "red" : "blue"}
                    onClick={() => handleSeatSelection(rowIndex, seatIndex)}
                    disabled={isDisabled}
                  >
                    {seatIndex + 1}
                  </Button>
                );
              })}
            </div>
            <div className="w-8 h-12 flex items-center justify-center text-black font-semibold">
              {rowIndex + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-16">
        {!!selectedSeats.length && (
          <Button
            color="amber"
            size="md"
            onClick={() => handleBuyTickets(selectedSeats)}
            disabled={loadingBookSeats}
          >
            Buy a {selectedSeats.length} tickets
          </Button>
        )}
      </div>
    </div>
  );
};
