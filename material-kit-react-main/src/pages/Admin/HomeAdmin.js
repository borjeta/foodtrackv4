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


function HomeAdmin() {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [foodtrucks, setFoodtrucks] = useState([]);
    const [foodtruck, setFoodtruck] = useState([]);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");



    return (
        <div>
            <NavbarAdmin />
            Opciones de administrador
            <br />
            <br />
            <br />

            <MKBox className="container" align="center" justify-content="center" py={10}>

                <MKBox align="center" justify-content="centerº">
                    <MKButton
                        color="primary"
                        size="large"
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
                        Opciones globales

                    </MKButton>
                    &nbsp;
                    &nbsp;

                </MKBox>
            </MKBox>
        </div>
    );
}


export default HomeAdmin;
