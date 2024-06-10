import React from "react";
import {
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const TABLE_HEAD = ["TIME","ROOM", ""];

export const MovieListTable = ({
  seances,
  selectedDate,
  handleChangeSelectedDate,
  buyTicket,
}) => {
  return (
    <div>
      {selectedDate && (
        <Tabs value={selectedDate} className="w-full">
          <TabsHeader
            className="bg-blue-gray-50"
            indicatorProps={{
              className: "bg-[#ffca28] shadow-none !text-gray-900",
            }}
          >
            {Object.keys(seances).map((date) => (
              <Tab
                key={date}
                value={date}
                onClick={(e) => handleChangeSelectedDate(date)}
              >
                <Typography variant="h5">{date}</Typography>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {Object.keys(seances).map((date) => {
              if (date === selectedDate) {
                const data = seances[date];
                return (
                  <TabPanel key={date} value={selectedDate}>
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full table-auto text-left">
                        <thead>
                          <tr>
                            {TABLE_HEAD?.map((head) => (
                              <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                              >
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                >
                                  {head}
                                </Typography>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="">
                          {data?.map((item, index) => {
                            const isLast = index === data.length - 1;
                            const classes = isLast
                              ? "p-4"
                              : "p-4 border-b border-blue-gray-50";
                            return (
                              <tr key={item.id}>
                                <td className={classes}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {item.time.substring(0, 5)}
                                  </Typography>
                                </td>
                                <td className={classes}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {item.rooms?.name}
                                  </Typography>
                                </td>
                                <td
                                  className={`${classes} bg-blue-gray-50/50 flex justify-end`}
                                >
                                  <Button
                                    color="amber"
                                    size="sm"
                                    onClick={() => buyTicket(item)}
                                  >
                                    Buy a ticket
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                );
              }
            })}
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
};
