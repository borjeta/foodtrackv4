import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";



// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";




function InfoFoodtruckPropietario() {
    const [data, setData] = useState([]);
    const [foodtruck, setFoodtruck] = useState([]);
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(true);
    const id = useParams();


    const [open, setOpen] = useState(false);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/foodtrucks/`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "user_id": `${user_id}`,
                    "api_token": `${api_token}`,
                    "role": `${role}`
                }
            })
            .then((res) => {
                setFoodtruck(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
        , []);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/usuarios/${user_id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "user_id": `${user_id}`,
                    "api_token": `${api_token}`,
                    "role": `${role}`
                }
            })
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
        , []);

    const handleOpen = () => {
        setOpen(true);
        axios
            .put(`http://localhost:8000/api/foodtrucks/${id.id}`, {
                "estado": "Activo"
            }, {
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
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/info`;

            })
            .catch((err) => {
                console.log(err);
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/info`;

            });
    }
    const handleClose = () => {
        setOpen(false);
        axios
            .put(`http://localhost:8000/api/foodtrucks/${id.id}`, {
                "estado": "Inactivo"
            }, {
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
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${id.id}`;

            })
            .catch((err) => {
                console.log(err);
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${id.id}`;
            });
    }

    const toggleModal = () => {
        setShow(!show);
        window.location.href = `/foodtrucks/propietario/listafoodtrucks`;
    };


    const interruptor = () => {
        if (foodtruck.estado == 'Activo') {

            return (
                <MKButton className="btn" variant="contained" color="primary" onClick={handleOpen}>
                    Desactivar foodtruck
                </MKButton>
            )
        } else {
            return (
                <MKButton variant="contained" color="primary" onClick={handleClose}>
                    Activar foodtruck
                </MKButton>
            )
        }
    }




    return (
        <MKBox component="section" py={4} >
            <Container>

                <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">

                </Grid>
                <Modal open={show} sx={{ display: "grid", placeItems: "center" }}>
                    <Slide direction="down" in={show} timeout={500}>
                        <MKBox
                            position="relative"
                            width="100%"
                            maxWidth="1000px"
                            display="flex"
                            flexDirection="column"
                            borderRadius="xl"
                            bgColor="white"
                            shadow="xl"
                        >
                            <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                                <MKTypography variant="h5">Ventana de edición de foodtruck</MKTypography>
                                <MKButton
                                    variant="text"
                                    color="primary"
                                    size="small"
                                    onClick={toggleModal}
                                    startIcon={<CloseIcon />}
                                >
                                    Cerrar
                                </MKButton>
                            </MKBox>
                            <Divider />
                            <MKBox p={2}>
                                <MKTypography variant="h6">Información del foodtruck</MKTypography>
                                <MKBox display="flex" flexDirection="column" gap={2}>
                                    <MKInput
                                        id="nombre"
                                        label="Nombre del foodtruck"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={foodtruck.nombre}
                                    />
                                    <MKInput
                                        id="descripcion"
                                        label="Descripción del foodtruck"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={foodtruck.descripcion}
                                    />
                                    <MKInput
                                        id="direccion"
                                        label="Dirección del foodtruck"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={foodtruck.direccion}
                                    />
                                    <MKInput
                                        id="telefono"
                                        label="Teléfono del foodtruck"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={foodtruck.telefono}
                                    />
                                    <MKInput
                                        id="email"
                                        label="Email del foodtruck"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={foodtruck.email}
                                    />
                                    {
                                        interruptor()
                                    }
                                    <MKInput
                                        id="email"
                                        label="Email del foodtruck"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={foodtruck.email}
                                    />

                                </MKBox>

                            </MKBox>
                            <MKBox display="flex" justifyContent="flex-end" p={2}>
                                <MKButton variant="contained" color="primary" onClick={toggleModal}>
                                    Guardar cambios
                                </MKButton>
                            </MKBox>
                        </MKBox>
                    </Slide>
                </Modal>
            </Container>
        </MKBox>
    );


}

export default InfoFoodtruckPropietario;
