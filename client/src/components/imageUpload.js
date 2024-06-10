import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const ImageUpload = ({
  image,
  loading,
  loadingFileRemoving,
  handleImageChange,
  handleRemoveImage,
}) => {
  const onFileChange = (e) =>  {
    const file = e.target.files[0]
    const type = file.name.split('.');
    const validFormat = ['jpeg', 'jpg', 'png'];
    const isValid = validFormat.indexOf(type[type.length - 1].toLowerCase()) !== -1 && type.length > 1;
    if(isValid) {
      handleImageChange(file)
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="p-4">
      {image ? (
        <div className="relative">
          <button
            className="absolute top-2 right-2 z-10 w-24 h-auto bg-red-500 p-2 rounded-md font-medium"
            onClick={handleRemoveImage}
            disabled={loadingFileRemoving}
          >
            Remove
          </button>
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="block w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}
    </div>
  );
};
