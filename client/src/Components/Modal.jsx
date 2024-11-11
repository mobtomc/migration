import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setScrapping } = useContext(UserContext);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [websiteLink, setWebsiteLink] = useState("");

  const handleClick = async () => {
    try {
      
      const response = await axios.post(
        `${process.env.REACT_APP_BACKENDURI2}/scrape/`,
        {
          url: websiteLink, 
        }
      );

      
      const fullText = response?.data?.data;
      console.log(fullText);
      setScrapping(fullText); 

    } catch (error) {
      console.error("Error sending data to the FastAPI backend", error);
    }
  };

  return (
    <div className="z-[5] relative">
      <button
        onClick={togglePopup}
        className="px-4 py-2 rounded-xl text-white hover:text-black bg-black hover:bg-white"
      >
        Get Started!
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10">
          <div className="bg-[#2699fb] py-12 px-5 sm:px-12 rounded-xl flex flex-col w-[90%] sm:w-[60%] md:w-[40%] justify-center items-center shadow-lg">
            <h2 className="text-xl sm:text-3xl text-green-800 font-bold mb-4 text-center">
              Enter Site URL
            </h2>
            <input
              type="text"
              value={websiteLink}
              placeholder="Enter URL"
              onChange={(e) => setWebsiteLink(e.target.value)}
              className="text-white h-[40px] border-white w-[90%] sm:w-[60%] bg-[#070708] rounded-full px-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleClick}
                className="mt-6 bg-white hover:bg-black text-black hover:text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg sm:rounded-2xl"
              >
                Submit!
              </button>
              <button
                onClick={togglePopup}
                className="mt-6 bg-white hover:bg-black text-black hover:text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg sm:rounded-2xl"
              >
                Close Popup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
