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

            <br />
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title ">Foodtrucks</h4>
                                <p className="card-category"> Listado de foodtrucks</p>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nombre</TableCell>
                                                    <TableCell align="right">Descripción</TableCell>
                                                    <TableCell align="right">Dirección</TableCell>
                                                    <TableCell align="right">Teléfono</TableCell>
                                                    <TableCell align="right">Email</TableCell>
                                                    <TableCell align="right">Acciones</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {foodtrucks.map((foodtruck) => (
                                                    <TableRow key={foodtruck.id}>
                                                        <TableCell component="th" scope="row">
                                                            {foodtruck.nombre}
                                                        </TableCell>
                                                        <TableCell align="right">{foodtruck.descripcion}</TableCell>
                                                        <TableCell align="right">{foodtruck.direccion}</TableCell>
                                                        <TableCell align="right">{foodtruck.telefono}</TableCell>
                                                        <TableCell align="right">{foodtruck.email}</TableCell>
                                                        <TableCell align="right">
                                                            <MKButton
                                                                href={`/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/editar`}
                                                                variant="gradient"
                                                                color="warning"
                                                                size="large"
                                                                startIcon={<Icon icon={editIcon} />}
                                                            >
                                                                Editar
                                                            </MKButton>
                                                            
                                                            <MKButton variant="gradient" color="dark" size="large"
                                                                startIcon={<Icon icon={deleteIcon} />} onClick={() => {
                                                                    axios
                                                                        .delete(`http://localhost:8000/api/foodtrucks/${foodtruck.id}`, {
                                                                            headers: {
                                                                                "Access-Control-Allow-Origin": "*",
                                                                                "Content-Type": "application/json",
                                                                                "user_id": `${user_id}`,
                                                                                "api_token": `${api_token}`,
                                                                                "role": `${role}`
                                                                            }

                                                                        })
                                                                        .then((res) => {
                                                                            console.log(res.data);
                                                                            window.location.reload();
                                                                        }
                                                                        )
                                                                        .catch((err) => {
                                                                            console.log(err);
                                                                        }
                                                                        );
                                                                }}>Eliminar</MKButton>

                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default HomeAdmin;
