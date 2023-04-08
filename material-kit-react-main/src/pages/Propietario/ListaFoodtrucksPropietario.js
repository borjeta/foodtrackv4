import { useEffect, useState } from "react";
import axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavbarPropietario from "pages/Propietario/NavbarPropietario";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-mdi/edit';
import Modal from '@mui/material/Modal';



import MKButton from "components/MKButton";
import MenuFoodtrucks from "pages/Foodtruck/MenuFoodtrucks";


function ListaFoodtrucksPropietario() {
    const [foodtrucks, setFoodtrucks] = useState([]);
    const [show, setShow] = useState(false);
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

    const confirmarborrado = () => {
    }



    return (
        <div >
            <NavbarPropietario />
            <br />
            <br />
            <MenuFoodtrucks />
            {/*align-center justify-content-center*/}
            <Container maxWidth="lg" align="center">
                <Box sx={{ width: '100%' }}>
                    <Table
                        border="12px solid black"
                        border-spacing="0"
                        width="100%"
                        flex-direction="column"
                        align-items="center"
                        justify-content="center"
                        bgcolor="white"

                    >
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Estado</th>
                                <th scope="col"><div className="d-flex justify-content-center align-text-center ">Acciones</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodtrucks.map((foodtruck) => (
                                <tr key={foodtruck.id}>
                                    <td>{foodtruck.nombre}</td>
                                    <td>{foodtruck.status}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">


                                            &nbsp;
                                            <MKButton
                                                href={`/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/editar`}
                                                variant="gradient"
                                                color="info"
                                                size="large"
                                                startIcon={<Icon icon={editIcon} />}
                                            >
                                                Editar
                                            </MKButton>
                                            &nbsp;
                                            <MKButton variant="gradient" color="info" size="large"
                                                startIcon={<Icon icon={editIcon} />}
                                                onClick={() => {
                                                    setShow(true);
                                                }}>Eliminar</MKButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Box>
            </Container>
            <Modal open={show} onClose={() => setShow(false)}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Foodtruck</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}></button>
                            ¿Está seguro que desea eliminar el foodtruck?
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShow(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
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
                                setShow(false);
                            }}>Eliminar</button>

                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )


}
export default ListaFoodtrucksPropietario;

