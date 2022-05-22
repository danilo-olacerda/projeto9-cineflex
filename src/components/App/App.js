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
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [finalId, setFinalId] = useState(0);

  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<Screen1 />} />
        <Route path="/filme/:movieID" element={<Screen2 />}/>
        <Route path="/sessao/:idSession" element={<Screen3 reserves={reserves} setReserves={setReserves} name={name} setName={setName} cpf={cpf} setCpf={setCpf} setFinalId={setFinalId}/>}/>
        <Route path="/sucesso" element={<Screen4 reserves={reserves} name={name} cpf={cpf} finalId={finalId} setReserves={setReserves} setCpf={setCpf} setName={setName}/>}/>
      </Routes>
		</BrowserRouter>
  );
}
