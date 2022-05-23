import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import Screen1 from "../Screen1/Screen1";
import Screen2 from "../Screen2/Screen2";
import Screen3 from "../Screen3/Screen3";
import Screen4 from "../Screen4/Screen4";
import Top from "../Top/Top";
import "../../styles/reset.css"
import "../../styles/style.css"
export default function App() {

  const [reserves, setReserves] = useState([]);
  const [finalId, setFinalId] = useState(0);
  const [lastpage, setLastpage] = useState("/");

  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<Screen1 />} />
        <Route path="/filme/:movieID" element={<Screen2 setLastpage={setLastpage} />}/>
        <Route path="/sessao/:idSession" element={<Screen3 reserves={reserves} setReserves={setReserves} setFinalId={setFinalId} lastpage={lastpage}/>}/>
        <Route path="/sucesso" element={<Screen4 reserves={reserves} finalId={finalId} setReserves={setReserves} />}/>
      </Routes>
		</BrowserRouter>
  );
}
