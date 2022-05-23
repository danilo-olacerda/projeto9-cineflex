import "./style.css";
import {Link} from "react-router-dom";

export default function Backbutton ({last}) {
    console.log(last)
    return (
        <>
            <Link to={last}>
                <div className="Backbutton">⬅️</div>
            </Link>
        </>
    )
}