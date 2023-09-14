

import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setFlashCard } from "../redux/action/flashcardActions";

function MyFlasCard() {
  const flashcards = useSelector(state => state.flashcard.flashcards);
  const dispatch = useDispatch();
  const truncate = (text, maxWords) =>{
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  }

  useEffect(() => {
    const storedFlashcards = localStorage.getItem('flashcards');
    if (storedFlashcards) {
      const parsedFlashcards = JSON.parse(storedFlashcards);
      dispatch(setFlashCard(parsedFlashcards));
    }
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto mt-20">
        <div className="flex flex-wrap justify-between">
          {flashcards.map((flashcard, index) => (
            <div className="w-1/3 mb-4" key={index}>
              <div className="flex flex-col">
                <div className="border-2 border-blue-300 rounded-full w-20 h-20 relative -mb-10 bg-white ml-36">
                  <button className="z-50">
                    <img src={flashcard.group.groupImage} alt="" className="w-20 h-20 rounded-full "/>
                  </button>
                </div>
                <div className="2nd main border-2 border-blue-400 h-64 w-96 flex flex-col justify-center items-center">
                  <div className="card text-center">
                    <h1 className="title text-center font-bold text-xl mt-2">
                      {flashcard.group.groupName}
                    </h1>
                    <p className="text-md mt-4">
                       {truncate(flashcard.group.groupDescription,10)}
                    </p>
                    <div className="card font-bold text-center mt-2">
                      {flashcard.terms.length} Card
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to ={`/Flasdetailes/${flashcard.id}`} >
                    <button className="border-4 border-red-700 text-red-700 px-20 py-2 font-bold">
                      View Card
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right my-6">
          <a href="/" className="text-red-700 font-bold text-lg">
            See all
          </a>
        </div>
      </div>
    </>
  );
}

export default MyFlasCard;
