import react from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import NavbarUsuario from "./NavbarUsuario";


function HomeUsuario() {
    const [data, setData] = useState([]);
    const cookies = document.cookie.split("; ");
    const api_token = cookies[0].split("=")[1];
    const user_id = cookies[1].split("=")[1];


    return (
        <div>
            <NavbarUsuario />
        </div>
    );
}

export default HomeUsuario;
