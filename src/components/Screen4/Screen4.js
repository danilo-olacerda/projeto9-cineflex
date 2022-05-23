import "./style.css";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";

function Seats({seat, name, cpf}){

    function newCpf() {
        let aux='';
        for (let i=0; i<cpf.length-2; i++){
            if (i%3===0 && i!==0){
                aux+=`.${cpf[i]}`
            } else {
                aux+=`${cpf[i]}`
            }
        }
        aux+="-"+cpf[cpf.length-2]+cpf[cpf.length-1];
        return aux;
    }

    let stringCPF = newCpf();

    return (
        <>
            <div className="buyer-info">
                <h3>Comprador (Poltrona {seat})</h3>
                <h4>Nome: {name}</h4>
                <h4>CPF: {stringCPF}</h4>
            </div>
        </>
    )
}

export default function Screen4({reserves, finalId, setReserves}) {

    const [seats, setSeats] = useState({name:"", movie:"", day:""});

    useEffect(()=>{

        let newReserve = {ids: [], compradores:[]};
        for (let i=0; i<reserves.length; i++) {
            let comprador={idAssento: reserves[i].id, nome: reserves[i].name, cpf: reserves[i].cpf}
            newReserve.ids.push(reserves[i].id);
            newReserve.compradores.push(comprador);
        }
        axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", newReserve);
        let promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${finalId}/seats`);
        promise.then(info => setSeats(info.data));
    },[]);

    let navigate=useNavigate();

    function backhome() {
        setReserves([]);
        let path = `/`; 
        navigate(path);
    }

    return (
        <div className="final">
            <p>Pedido feito com sucesso!</p>
            <div className="session-info">
                <h3>Filme e sessão</h3>
                <h4>{seats.movie.title}</h4>
                <h4>{seats.day.date} {seats.name}</h4>
            </div>
            <div className="seats-info">
                <h3>Ingressos</h3>
                {reserves.map((info, i) => <h4 key={i}>Assento {info.seatNumber}</h4>)}
            </div>
            {reserves.map((data, i) => <Seats key={i} name={data.name} cpf={data.cpf} seat={data.seatNumber} />)}
            <button className="reserve" onClick={backhome}>
                <h3>Voltar pra Home</h3>
            </button>
        </div>
    )
}