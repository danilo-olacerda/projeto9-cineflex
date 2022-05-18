import { BrowserRouter, Routes, Route } from "react-router-dom";
import Screen1 from "../Screen1/Screen1";
import Screen2 from "../Screen2/Screen2";
import Top from "../Top/Top";
import "../../styles/reset.css"
import "../../styles/style.css"
export default function App() {

  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<Screen1 />} />
        <Route path="/filme/:movieID" element={<Screen2 />}/>
        {/*
        <Route path="/session/:idSession" element={<Contato />}
        <Route path="/success" element={<Contato />}/>*/}
      </Routes>
		</BrowserRouter>
  );
}
