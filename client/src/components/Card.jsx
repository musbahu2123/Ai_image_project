import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  // Ensure all fields are passed and valid
  if (!photo || !prompt || !name) {
    return (
      <div className="rounded-xl shadow-card card">
        <p className="text-red-500 text-center py-4">Invalid Post Data</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      {/* Display post image */}
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />

      {/* Overlay section */}
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        {/* Display post prompt */}
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          {/* Display user initials and name */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name ? name[0].toUpperCase() : "?"}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>

          {/* Download button */}
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
