import "./style.css";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";

function Seat({seatNumber, isAvailable, reserves, setReserves, id}) {

    const [choice, setChoice] = useState("");

    function select () {
        if (choice===""){
            setChoice("choice");
            setReserves([...reserves, id]);
        } else {
            for (let i=0; i<reserves.length; i++){
                if (reserves[i]===id) {
                    reserves.splice(i, 1);
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

export default function Screen3() {

    const {idSession} = useParams();
    const [seats, setSeats] = useState({seats:[{}], movie:"", day:""});
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [reserves, setReserves] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(info => setSeats(info.data));
    }, []);

    function verifyCpf(e) {
        if (cpf.length < 11 || e.nativeEvent.inputType==="deleteContentBackward")
        setCpf(e.target.value);
    }

    return (
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
                <label htmlFor="nome">Nome do comprador:</label>
                <input id="nome" className="reservationIn" type="text" placeholder="Digite seu nome..." value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="cpf">CPF do comprador:</label>
                <input id="cpf" className="reservationIn" type="number" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => verifyCpf(e)}/>
            </form>

            <button className="reserve" onClick={() => console.log(reserves)}>
                <h3>Reservar assento(s)</h3>
            </button>

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
    )
}