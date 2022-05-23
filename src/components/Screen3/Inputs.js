import { useState } from "react"

export default function Inputs({seatNumber, data}) {

    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");

    function verifyCpf(e) {
        
        const maxLength=11;
        if (cpf.length < maxLength || e.nativeEvent.inputType==="deleteContentBackward"){
            setCpf(e.target.value);
        }
        if (cpf.length===maxLength && name){
            data.valid=true;
        } else {
            data.valid=false;
        }
    }

    function verifyName(e) {
        setName(e.target.value);

        const maxLength=11;
        if (cpf.length===maxLength && name){
            data.valid=true;
        } else {
            data.valid=false;
        }
    }
    
    data.name=name;
    data.cpf=cpf;

    return (
        <>
            <label htmlFor="nome">Nome do comprador (Poltrona {seatNumber}):</label>
            <input id="nome" className="reservationIn" type="text" placeholder="Digite seu nome..." value={name} onChange={(e) => verifyName(e)} required/>
            <label htmlFor="cpf">CPF do comprador (Poltrona {seatNumber}):</label>
            <input id="cpf" className="reservationIn" type="number" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => verifyCpf(e)} required/>
        </>
    )
}