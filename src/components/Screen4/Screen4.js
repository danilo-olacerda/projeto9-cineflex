import "./style.css";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from "axios";

export default function Screen4({reserves, name, cpf, finalId, setReserves, setCpf, setName}) {

    const [seats, setSeats] = useState({name:"", movie:"", day:""});

    useEffect(()=>{

        let newReserve = {ids: [], name: name, cpf: cpf};
        for (let i=0; i<reserves.length; i++) {
            newReserve.ids.push(reserves[i].id);
        }
        axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", newReserve);
        let promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${finalId}/seats`);
        promise.then(info => setSeats(info.data));
    },[]);

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
    let navigate=useNavigate();

    function backhome() {
        setReserves([]);
        setName("");
        setCpf("");
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
            <div className="buyer-info">
                <h3>Comprador</h3>
                <h4>Nome: {name}</h4>
                <h4>CPF: {stringCPF}</h4>
            </div>
            <button className="reserve" onClick={backhome}>
                <h3>Voltar pra Home</h3>
            </button>
        </div>
    )
}