import "./style.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from 'react';

function Movie ({image, id}) {
    return (
        <Link to={`/filme/${id}`}> 
            <div className="movie">
                <img src={image} alt="" />
            </div>
        </Link>
    )
}

export default function Screen1 () {

    const [items, setItems] = useState([]);
    useEffect(()=> {
        let promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(data => {
            setItems([...data.data]);
        })
    }, []);

    return (
    <>
        <div className="main-content">
            <p>Selecione o filme</p>
            <div className="movies">
                {items.map((infos,i) => <Movie key={i} image={infos.posterURL} id={infos.id}/>)}
            </div>
        </div>
    </>
    )
}