import "./style.css";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Backbutton from "../Backbutton/Backbutton";

function Time({name, id}) {
    return (
        <Link to={`/sessao/${id}`}>
            <div className="session-time">
                <h3>{name}</h3>
            </div>
        </Link>
    )
}

function Session({weekday, date, showtime}) {
    return (
            <div className="session">
                <p>{weekday} - {date}</p>
                <div className="sessions-times">
                    {showtime.map((data, i) => <Time name={data.name} id={data.id} key={i}/>)}
                </div>
            </div>
    )
}

export default function Screen2() {

    const {movieID} = useParams();
    const [items, setItems] = useState({days: []});
    
    useEffect(()=>{
        let promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`);
        promise.then(data => {
            setItems(data.data);
        })
    }, []);

    return (
        <>
            <Backbutton />
            <div className="sessions">
                <p>Selecione o horário</p>

                {items.days.map((data, i) => <Session key={i} weekday={data.weekday} date={data.date} showtime={data.showtimes} />)}

                <div className="footer">
                    <div className="footer-img">
                        <img src={items.posterURL} alt="" />
                    </div>
                    <h4>{items.title}</h4>
                </div>
            </div>
        </>
    )
}