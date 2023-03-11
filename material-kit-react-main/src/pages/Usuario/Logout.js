import { useEffect, useState } from "react";
import axios from "axios";


function Logout() {
    const [data, setData] = useState([]);

    const cookies = document.cookie.split("; ");
    const api_token = cookies[0].split("=")[1];
    const user_id = cookies[1].split("=")[1];

    useEffect(() => {
        /*borra el token y el id del usuario de las cookies*/

        document.cookie = `api_token=""`;
        document.cookie = `user_id=""`;
        window.location.href = `/login`;

    }, []);





    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}

export default Logout;