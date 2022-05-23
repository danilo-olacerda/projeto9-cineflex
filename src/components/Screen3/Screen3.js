import "./style.css";
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";
import Inputs from "./Inputs";
import Backbutton from "../Backbutton/Backbutton";

function Seat({seatNumber, isAvailable, reserves, setReserves, id}) {

    const [choice, setChoice] = useState("");
    let newSeat = {seatNumber: seatNumber, id: id, valid: false, name: "", cpf: ""};

    function select () {
        if (choice===""){
            setChoice("choice");
            setReserves([...reserves, newSeat]);
        } else {
            for (let i=0; i<reserves.length; i++){
                if (reserves[i].seatNumber===seatNumber) {
                    reserves.splice(i, 1);
                    setReserves([...reserves]);
                    break;
                }
            }
            setChoice("");
        }
    }

    function occupied () {
        alert("Esse assento não está disponível");
    }

    if (isAvailable===true) {
        return (
            <>
                {seatNumber<10 ? <div className={`seat ${choice}`} onClick={select}><p>0{seatNumber}</p></div> : <div className={`seat ${choice}`} onClick={select}><p>{seatNumber}</p></div>}
            </>
        )
    } else {
        return (
            <>
                {seatNumber<10 ? <div className={`seat occupied`} onClick={occupied}><p>0{seatNumber}</p></div> : <div className={`seat occupied`} onClick={occupied}><p>{seatNumber}</p></div>}
            </>
        )
    }

}

export default function Screen3({reserves, setReserves, setFinalId, lastpage}) {

    const {idSession} = useParams();
    const [seats, setSeats] = useState({seats:[{}], movie:"", day:""});

    let navigate=useNavigate();
    
    function check () {
        if (reserves.length===0)
        return false;
        for (let i=0; i<reserves.length; i++){
            if (!reserves[i].valid){
                return false;
            }
        }
        return true;
    }

    const routeChange = (e) => {
        e.preventDefault();
        if (check()) {
            let path = `/sucesso`; 
            navigate(path);
        }
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(info => setSeats(info.data));
        setFinalId(idSession);
        setReserves([]);
    }, []);

    return (
    <>
        <Backbutton last={lastpage}/>
        <div className="seats">
            <p>Selecione o(s) assento(s)</p>

            <div className="seatsSelect">
                {seats.seats.map((info, i) => <Seat key={i} id={info.id} seatNumber={info.name} isAvailable={info.isAvailable} reserves={reserves} setReserves={setReserves}/>)} 
            </div>

            <div className="seatsDescription">
                <div className="seatOptions">
                    <div className="selected choice">
                    </div>
                    <h3>Selecionado</h3>
                </div>
                <div className="seatOptions">
                    <div className="selected free">
                    </div>
                    <h3>Disponível</h3>
                </div>
                <div className="seatOptions">
                    <div className="selected occupied">
                    </div>
                    <h3>Indisponínel</h3>
                </div>
            </div>

            <form className="userInfo" action="">
                {reserves.map((data, i)=> <Inputs key={i} seatNumber={data.seatNumber} data={data}/>)}
                <button type="submit" className="reserve" onClick={routeChange}>
                    <h3>Reservar assento(s)</h3>
                </button>
            </form>

            <div className="footer">
                <div className="footer-img">
                    <img src={seats.movie.posterURL} alt="" />
                </div>
                <div>
                    <h4>{seats.movie.title}</h4>
                    <h4>{seats.day.weekday} - {seats.name}</h4>
                </div>
            </div>

        </div>

    </>
    )
}