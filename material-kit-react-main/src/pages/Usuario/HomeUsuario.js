import react from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import NavbarUsuario from "./NavbarUsuario";


function HomeUsuario() {
    const [data, setData] = useState([]);
    const cookies = document.cookie.split("; ");
    const api_token = cookies[0].split("=")[1];
    const user_id = cookies[1].split("=")[1];

    useEffect(() => {
        /*Si el usuario tiene guardado un token en las cookies, comprobamos si es válido*/
        if (document.cookie) {
            axios
                .get(`http://localhost:8000/api/usuarios/${user_id}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Authorization": `${api_token}`,
                    },
                })
                .then((res) => {
                    setData(res.data);
                    alert("Usuario logueado correctamente");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div>
            <NavbarUsuario />
        </div>
    );
}

export default HomeUsuario;
