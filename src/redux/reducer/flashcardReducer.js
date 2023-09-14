import { SET_FLASHCARDS,ADD_FLASHCARD,SET_FLASHCARD_DETAIL } from "../actionTypes"
const initialState = {
    flashcards:[]
}

const flashcardReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FLASHCARD:
            return{
                ...state,
                flashcards:[state.flashcards, action.payload]
            }
            case SET_FLASHCARDS:
                return{
                    ...state,
                    flashcards:action.payload.flashcards
                }
            case SET_FLASHCARD_DETAIL :
                return {
                    ...state,
                    flashcardDetail: action.payload,
                }

            default:
            return state


    }
}

export default flashcardReducer;
