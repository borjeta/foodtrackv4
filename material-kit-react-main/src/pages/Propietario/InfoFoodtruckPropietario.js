import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

import CardMedia from "@mui/material/CardMedia";



// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";





function InfoFoodtruckPropietario() {
    const [data, setData] = useState([]);
    const [foodtruck, setfoodtruck] = useState([]);
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(true);
    const id = useParams();


    const [open, setOpen] = useState(false);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    useEffect(() => {
        /*OBtener datos del foodtruck*/
        axios
            .get(`http://localhost:8000/api/foodtrucks/${id.id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "user_id": `${user_id}`,
                    "api_token": `${api_token}`,
                    "role": `${role}`
                }
            })
            .then((res) => {
                setfoodtruck(res.data);
                document.getElementById("nombre").value = res.data.nombre;
                document.getElementById("descripcion").value = res.data.descripcion;
                document.getElementById("ubicacion").value = res.data.ubicacion;
                document.getElementById("telefono").value = res.data.telefono;
                document.getElementById("avatar").value = res.data.avatar;
                document.getElementById("horario").value = res.data.horario;
                document.getElementById("TipoComida").value = res.data.TipoComida;
                if (document.getElementById)

                    console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });



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



    }, []);

    /*ACtivar y desactivar foodtruck*/

    const handleOpen = () => {
        axios
            .get(`http://localhost:8000/api/foodtrucks/listaporpropietario/${foodtruck.id}/abrirfoodtruck`, {
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

            });
    }



    const handleClose = () => {
        axios
            .get(`http://localhost:8000/api/foodtrucks/listaporpropietario/${foodtruck.id}/cerrarfoodtruck`, {
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
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/info`;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const toggleModal = () => {

        handleSubmit();
        setShow(!show);
    };
    const handleSubmit = () => {

        alert(document.getElementById("telefono").value);
        axios.put(`http://localhost:8000/api/foodtrucks/${foodtruck.id}/editar`, {
            "nombre": document.getElementById("nombre").value,
            "descripcion": document.getElementById("descripcion").value,
            "ubicacion": document.getElementById("ubicacion").value,
            "telefono": document.getElementById("telefono").value,
            "avatar": document.getElementById("avatar").value,
            "horario": document.getElementById("horario").value,
            "tipocomida": document.getElementById("TipoComida").value,
            "status": foodtruck.status,

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
            }
            )
            .catch((err) => {
                console.log(err);

            }
            );
    };


    const handleAvatar = (e) => {
        /* Lector de archivos
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
        */

        window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/info`;

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
                                <MKTypography variant="h5" alignItems="center">Ventana de edición de foodtruck</MKTypography>
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

                            <MKBox p={4}>
                                <MKBox display="flex" flexDirection="column" gap={1}>
                                    <MKTypography variant="h6" >
                                        Nombre
                                    </MKTypography>

                                    <MKInput
                                        id="nombre"
                                        variant="outlined"
                                        size="medium"
                                        required
                                        fullWidth

                                    />
                                    <MKTypography variant="h6" >
                                        Descripción
                                    </MKTypography>
                                    <MKInput
                                        id="descripcion"
                                        variant="outlined"
                                        size="medium"
                                    />
                                    <MKTypography variant="h6" >
                                        Ubicacion
                                    </MKTypography>
                                    <MKInput
                                        id="ubicacion"
                                        variant="outlined"
                                        size="medium"
                                    />
                                    <MKTypography variant="h6" >
                                        Teléfono
                                    </MKTypography>
                                    <MKInput
                                        id="telefono"
                                        variant="outlined"
                                        size="medium"
                                    />
                                    <MKTypography variant="h6" >
                                        Categoria
                                    </MKTypography>
                                    <MKInput
                                        id="TipoComida"
                                        variant="outlined"
                                        size="medium"
                                    />

                                    <MKTypography variant="h6" >
                                        Avatar (Los cambios se mostrarán después de guardar)
                                    </MKTypography>
                                    <MKInput
                                        id="avatar"
                                        variant="outlined"
                                        size="medium"
                                        onChange={handleAvatar}
                                    />

                                    <MKTypography variant="h6" >
                                        Previsualización
                                    </MKTypography>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        URL image={foodtruck.avatar}
                                        alt="green iguana"
                                    />
                                    <br />
                                    {
                                        foodtruck.status == 'Activo' ? (
                                            <MKButton variant="contained" color="dark" onClick={handleClose}>
                                                Cerrar foodtruck
                                            </MKButton>
                                        ) : (
                                            <MKButton variant="contained" color="warning" onClick={handleOpen}>
                                                Abrir foodtruck
                                            </MKButton>
                                        )

                                    }


                                    <MKBox display="flex" flexDirection="column" gap={2}>
                                        <MKTypography variant="h3">Hora de cierre</MKTypography>
                                        <MKBox display="flex" flexDirection="column" gap={2}>
                                            <MKBox display="flex" flexDirection="row" gap={2}>
                                                <MKBox display="flex" flexDirection="column" gap={2}>
                                                    <MKBox display="flex" flexDirection="row" gap={2}>
                                                        <MKInput
                                                            id="horario"
                                                            label="Hora"
                                                            size="large"
                                                            type="time"
                                                            defaultValue={foodtruck.horario}
                                                        />

                                                    </MKBox>
                                                </MKBox>
                                            </MKBox>
                                        </MKBox>
                                    </MKBox>


                                    <MKBox display="flex" justifyContent="flex-end" p={2}>
                                        <MKButton variant="contained" color="primary" onClick={toggleModal}>
                                            Guardar cambios
                                        </MKButton>

                                    </MKBox>
                                </MKBox>
                            </MKBox>
                        </MKBox>
                    </Slide>
                </Modal>
            </Container>
        </MKBox>
    );
};







export default InfoFoodtruckPropietario;
