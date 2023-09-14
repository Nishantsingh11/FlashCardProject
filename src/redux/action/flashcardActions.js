import { SET_FLASHCARDS,ADD_FLASHCARD,SET_FLASHCARD_DETAIL } from "../actionTypes";
export const addFlashcard = (flashcard) => {
  return {
    type: ADD_FLASHCARD,
    payload: flashcard,
  };
};
export const setFlashCard = (flashcards) => {
  return {
    type: SET_FLASHCARDS,
    payload: {
      flashcards,
    },
  };
};

export const setFlashcardDetail = (flashcardDetail) =>{
    return{
      type:SET_FLASHCARD_DETAIL,
      payload: flashcardDetail
    }
} 