import react from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarPropietario from 'pages/Propietario/NavbarPropietario';


const HomePropietario = () => {

    const [data, setData] = useState([]);
    const [foodtrucks, setFoodtrucks] = useState([]);
    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");


    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/foodtrucks/listaporpropietario/${user_id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "user_id": `${user_id}`,
                    "api_token": `${api_token}`,
                    "role": `${role}`
                }

            })
            .then((res) => {
                setFoodtrucks(res.data);
                console.log(res.data);
                    window.location.href = "/foodtrucks/propietario/listafoodtrucks";
               
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    /*Cuenta las foodtrucks que tiene el propietario*/



    return (
        <div>
            <NavbarPropietario />
        </div>
    )
}

export default HomePropietario;