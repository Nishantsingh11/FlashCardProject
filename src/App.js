import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateFlashCard from "./Componets/CreateFlashCard";
import MyFlasCard from "./Componets/MyFlasCard";
import FlasDetails from "./Componets/FlasDetails";
import Navbar from "./Componets/Navbar";
import Header from "./Componets/Header";
function App() {
  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<CreateFlashCard />} />
          <Route path="/myflasCard" element={<MyFlasCard />} />
          <Route path="/Flasdetailes/:id" element={<FlasDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
