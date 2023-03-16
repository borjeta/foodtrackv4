import react from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavbarPropietario from "pages/Propietario/NavbarPropietario";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-mdi/edit';
import eyeIcon from '@iconify/icons-mdi/eye';

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";


function ListaFoodtrucksPropietario() {
    const [data, setData] = useState([]);
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [foodtrucks, setFoodtrucks] = useState([]);
    const [foodtruck, setFoodtruck] = useState([]);

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

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <div >
            <NavbarPropietario />
            <br />
            <br />
            <Toolbar />
            <Container maxWidth="lg">
                <Box sx={{ width: '100%' }}>
                    <Table >
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Estado</th>
                                <th scope="col"><div className="d-flex justify-content-center align-text-center ">Acciones</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodtrucks.map((foodtruck) => (
                                <tr>
                                    <td>{foodtruck.nombre}</td>
                                    <td>{foodtruck.status}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">

                                            <MKButton
                                                href={`/foodtrucks/${foodtruck.id}/info`}
                                                variant="gradient"
                                                color="info"
                                                size="large"
                                                startIcon={<Icon icon={eyeIcon} />}
                                            >
                                                Ver
                                            </MKButton>
                                            &nbsp;
                                            <MKButton
                                                href={`/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/info`}
                                                variant="gradient"
                                                color="info"
                                                size="large"
                                                startIcon={<Icon icon={editIcon} />}
                                            >
                                                Editar
                                            </MKButton>
                                            &nbsp;
                                            <MKButton variant="gradient" color="info" size="large" onClick={() => {
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
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Box>
            </Container>
        </div>
    )


}
export default ListaFoodtrucksPropietario;

/*                                        <a href={`/foodtrucks/${foodtruck.id}/info`}>Ver detalles</a>
*/