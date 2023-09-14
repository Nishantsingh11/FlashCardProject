import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { FiPrinter } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFlashcardDetail } from "../redux/action/flashcardActions";
import img from "../img/img.png"
import { FaFacebook, FaTwitter, FaInstagram, FaCopy } from "react-icons/fa";
import { Link } from "react-router-dom";


const FlasDetails = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  // const flashcardDetail = useSelector(state => state.flashcard.flashcardDetail); // Access flashcard detail from Redux store
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedTermIndex, setSelectedTermIndex] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("flashcards");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  // Find the flashcard with   the matching 'id' parameter
  const cardData = data.find((card) => card.id === id);
  if (!cardData) {
    // Handle the case when the flashcard with the given 'id' is not found
    return <div>Flashcard not found</div>;
  }


  // const findTermByName = (termName) => {
  //   return cardData.terms.find((item) => item.termName === termName);
  // };


  const handleTermClick = (e, termName) => {
    e.preventDefault();
    const term = cardData.terms.find((item) => item.termName === termName);
    setSelectedTermIndex(cardData.terms.indexOf(term));
    setSelectedTerm(term); // Update the selected term
    dispatch(setFlashcardDetail(term)); // Dispatch the action here
  };
  const handlePrevTerm = () => {
    setSelectedTermIndex((prevIndex) => prevIndex - 1);
    setSelectedTerm(cardData.terms[selectedTermIndex - 1]);

  };
  const handleNextTerm = () => {
    setSelectedTermIndex((prevIndex) => prevIndex + 1);
    setSelectedTerm(cardData.terms[selectedTermIndex + 1]);
  };


  const isPrevEnabled = selectedTermIndex > 0;
  const isNextEnabled = selectedTermIndex < cardData.terms.length - 1;

  const handlePopup = () => {

    setShowPopup(prevShowPopup => !prevShowPopup);
 
  }


  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyStatus("Copied!");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
        setCopyStatus("Copy failed");
      });

    // Clear the copy status after a short duration
    setTimeout(() => {
      setCopyStatus(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="flex flex-row">
          <Link to="/myflasCard">

            <AiOutlineArrowLeft className="font-bold text-2xl" />
          </Link>
          <h2 className="text-2xl font-bold ml-5">
            {cardData.group.groupName}
          </h2>
        </div>
        <div className="ml-12">
          <p className="block">{cardData.group.groupDescription}</p>
        </div>
        <div className="flex flex-row justify-between mt-10">
          <div className="h-96 bg-white shadow-md w-2/12">
            <div className="title mb-2 text-blue-700 mt-2 ml-2">Flashcard</div>
            <hr className="border-2" />
            <dir className="flex flex-col">
              {cardData.terms.map((item) => {
                return (
                  <p
                    className="text-lg mt-5 cursor-pointer hover:text-blue-600"
                    onClick={(event) => handleTermClick(event, item.termName)}
                  >
                    {item.termName}
                  </p>
                );
              })}
            </dir>
          </div>
          <div className="h-96 bg-white shadow-md w-6/12">
            <div className="flex justify-center items-center  mt-16">
              <img
                src={selectedTerm ? selectedTerm.termImage : img}
                alt="term img "
                className="w-6/12  h-60 mr-2 shadow-lg"
              />
              <p className="w-5/12 text-center font-light ml-2">
                {selectedTerm
                  ? selectedTerm.termDescription
                  : "Select a term to view its description"}
              </p>
            </div>
          </div>
          <div className=" w-2/12">
            <div className="h-12 bg-white shadow-md container mx-auto">
              <div className="flex justify-center cursor-pointer" onClick={handlePopup}>
                <FaShare className="font-extrabold inline mt-4 mr-3 text-xl text-blue-700 cursor-pointer" />
                <p className="text-center font-bold text-lg inline mt-3 text-blue-700">
                  Share
                </p>
              </div>
            </div>
            <div className="h-12 bg-white shadow-md mt-2">
              <div className="flex justify-center">
                <FiDownload className="font-extrabold inline mt-4 mr-3 text-xl text-blue-700" />
                <p className="text-center font-bold text-lg inline mt-3 text-blue-700">
                  Downlad
                </p>
              </div>
            </div>
            <div className="h-12 bg-white shadow-md mt-2">
              <div className="flex justify-center">
                <FiPrinter className="font-extrabold inline mt-4 mr-3 text-xl text-blue-700" />
                <p className="text-center font-bold text-lg inline mt-3 text-blue-700">
                  Print
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-10">
          <AiOutlineLeft
            className={`inline mr-10 font-bold text-3xl text-blue-700 ${!isPrevEnabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
              }`}
            onClick={isPrevEnabled ? handlePrevTerm : null}
          />
          <p className="font-bold text-xl text-blue-700">
            {selectedTermIndex + 1}/{cardData.terms.length}
          </p>
          <AiOutlineRight
            className={`inline ml-10 font-bold text-3xl text-blue-700 ${!isNextEnabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
              }`}
            onClick={isNextEnabled ? handleNextTerm : null}
          />
        </div>
      </div>


      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-900 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-4">Share</h2>
            <p className="text-gray-700 mb-4">
              Share this link with others to let them view this flashcard
            </p>
            <div className="flex justify-between items-center mb-4 overflow-x-auto">
              <a
                href={`http://localhost:3000/Flasdetailes/${id}`}
                className="text-blue-500 hover:underline border-b border-blue-500 whitespace-nowrap overflow-x-auto"
                onClick={handlePopup}
              >
                {`http://localhost:3000/Flasdetailes/${id}`}
              </a>
              <div className="flex space-x-3">
                <FaCopy
                  className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer"
                  onClick={() => handleCopyToClipboard(`http://localhost:3000/Flasdetailes/${id}`)}
                />
                {copyStatus && <span className="text-green-500">{copyStatus}</span>}

                <FaShare
                  className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer"
                // onClick={handleShare}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <a
                href="instagram.com"
                className="text-gray-500 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/"
                className="text-gray-500 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="twitter.com"
                className="text-gray-500 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={handlePopup}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div >

  );
};

export default FlasDetails;