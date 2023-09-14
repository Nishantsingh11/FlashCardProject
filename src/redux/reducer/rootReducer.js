import { combineReducers } from "redux";
import flashcardReducer from "./flashcardReducer";


const rootReducer = combineReducers({
    flashcard: flashcardReducer,
    
})


export default rootReducer;
    