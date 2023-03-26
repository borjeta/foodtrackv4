import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Icon } from "@iconify/react";
import editIcon from "@iconify/icons-mdi/edit";
import styled from "styled-components";
import eyeIcon from "@iconify/icons-mdi/eye";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import deleteIcon from "@iconify/icons-mdi/delete";


import { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "pages/Admin/NavbarAdmin";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function HomeAdmin() {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [foodtrucks, setFoodtrucks] = useState([]);
    const [foodtruck, setFoodtruck] = useState([]);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const tabla = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #000;
    border-radius: 5px;
    padding: 10px;
    `;

    useEffect(() => {

        axios
            .get(`http://localhost:8000/api/foodtrucks`, {
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

            })
            .catch((err) => {
                console.log(err);
            });
    }
        , []);


    return (
        <div>
            <NavbarAdmin />
            Opciones de administrador
            <br />
            <br />
            <br />


            <MKBox align="center" justify-content="centerº">
                <MKButton
                    color="primary"
                    size="lg"
                    href="/admin/foodtrucks"
                >
                    Foodtrucks

                </MKButton>
                &nbsp;
                &nbsp;
                <MKButton
                    color="primary"
                    size="large"
                    href="/admin/usuarios"
                >
                    Usuarios

                </MKButton>
                &nbsp;
                &nbsp;
                <MKButton
                    color="primary"
                    size="large"
                    href="/admin/roles"
                >
                    Roles

                </MKButton>
                &nbsp;
                &nbsp;
                <MKButton
                    color="primary"
                    size="large"
                    href="/admin/permisos"
                >
                    Permisos
                </MKButton>
            </MKBox>

        </div>
    );
}


export default HomeAdmin;
