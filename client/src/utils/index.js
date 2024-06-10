export const convertMinutesToTime = (minutes) => {
  if (!minutes) {
    return "0 min";
  }
  const remainingMinutes = minutes % 60;
  if (minutes < 60) {
    return `${remainingMinutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  return `${hours} h ${remainingMinutes} min`;
};

export const convertErrorMessages = (originalData) => {
  let convertedData = {};

  for (const key in originalData) {
    if (key.startsWith("seances")) {
      const match = key.match(
        /seances\[(\d+)\]\.(date|times|roomId(?:\[(\d+)\])?)/
      );
      if (match) {
        const index = parseInt(match[1], 10);
        const subKey = match[2];
        const timesIndex = match[3] ? parseInt(match[3], 10) : null;
        if (!originalData.seances) {
          convertedData.seances = [];
        }
        if (convertedData.seances && !convertedData.seances?.[index]) {
          convertedData.seances[index] = {
            roomId: "",
            date: "",
            times: [],
          };
        }
        if (subKey === "roomId") {
          convertedData.seances[index].roomId = originalData[key];
        } else if (subKey === "date") {
          convertedData.seances[index].date = originalData[key];
        } else if (subKey.startsWith("times")) {
          if (timesIndex !== null) {
            convertedData.seances[index].times[timesIndex] = originalData[key];
          } else {
            convertedData.seances[index].times.push(originalData[key]);
          }
        }
      }
    } else {
      convertedData[key] = originalData[key];
    }
  }

  return convertedData;
};
