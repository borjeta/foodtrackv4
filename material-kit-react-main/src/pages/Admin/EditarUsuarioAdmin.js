import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
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



function EditarFoodtruck() {
    const [data, setData] = useState([]);
    const [foodtruck, setfoodtruck] = useState([]);
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(true);
    const [usuarioAmodificar, setUsuarioAmodificar] = useState([]);
    const id = useParams();


    const [open, setOpen] = useState(false);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    useEffect(() => {

        /*Obtener usuario logueado*/
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


        /*Obtener usuario a modificar*/
        axios
            .get(`http://localhost:8000/api/usuarios/${id.id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "user_id": `${user_id}`,
                    "api_token": `${api_token}`,
                    "role": `${role}`
                }
            })
            .then((res) => {
                setUsuarioAmodificar(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);





    const handleSubmit = () => {

        /*Editar por usuario*/
        axios.put(`http://localhost:8000/api/foodtrucks/${userAmodificar.id}/editaradmin`, {
            "name": `${userAmodificar.name}`,
            "email": `${userAmodificar.email}`,
            "telefono": `${userAmodificar.telefono}`,
            "password": `${userAmodificar.password}`,
            "location": `${userAmodificar.location}`,


        }, {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "user_id": `${user_id}`,
                "api_token": `${api_token}`,
                "role": `${role}`
            }
        })

            .then((res) => {
                console.log(res.data);
                if (user.role == "propietario")
                    window.location.href = `/foodtrucks/propietario/listafoodtrucks`;
                else if (user.role == "admin")
                    window.location.href = `/homeadmin`;
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    };


    const toggleModal = () => {
        /*setOpen(!open);*/
        window.location.href = `/admin/usuarios`;
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
        window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/editar`;
    }








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
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/editar`;

            })
            .catch((err) => {
                console.log(err);

            });
    }



    const handleClose = () => {
        axios
            .get(`http://localhost:8000/api/foodtrucks/listaporpropietario/${foodtruck.id}/cerrarfoodtruck`, {
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
                window.location.href = `/foodtrucks/propietario/listafoodtrucks/${foodtruck.id}/editar`;

            })
            .catch((err) => {
                console.log(err);
            });
    }






    /*Editar usuario
    Nombre
    Email
    Teléfono
    Password
    Confirmación Password
    Ubicación*/

    return (
        <div>


            <MKBox component="section" py={4} >
                <br />
                <br />
                <br />
                <Container>
                    x
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
                                    <MKTypography variant="h5" alignItems="center">Ventana de edición de usuario</MKTypography>
                                    <MKButton
                                        variant="text"
                                        color="primary"
                                        size="large"
                                        onClick={toggleModal}
                                        startIcon={<CloseIcon />}
                                    >
                                        Volver a la lista
                                    </MKButton>
                                </MKBox>

                                <MKBox p={4}>
                                    <MKBox display="flex" flexDirection="column" gap={1}>
                                        {/* <!--Fila 1--> */}
                                        <div className="row">

                                            {/* <!--Columna 1--> */}
                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Nombre
                                                </MKTypography>
                                                <MKInput
                                                    id="nombre"
                                                    variant="outlined"
                                                    size="medium"
                                                    required

                                                    value={usuarioAmodificar.name}

                                                />
                                            </div>

                                            {/* <!--Columna 2--> */}
                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Email
                                                </MKTypography>
                                                <MKInput
                                                    id="descripcion"
                                                    variant="outlined"
                                                    size="medium"
                                                    value={usuarioAmodificar.email}
                                                    required
                                                    fullWidth
                                                />
                                            </div>
                                        </div>

                                        {/* <!--Fila 2--> */}
                                        <div className="row">


                                            {/* <!--Columna 1--> */}

                                            <div className="col">

                                                <MKTypography variant="h6" >
                                                    Teléfono
                                                </MKTypography>
                                                <MKInput
                                                    id="telefono"
                                                    variant="outlined"
                                                    size="medium"
                                                    value={usuarioAmodificar.telefono}
                                                />


                                            </div>


                                            {/* <!--Columna 3--> */}

                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Ubicacion
                                                </MKTypography>
                                                <MKInput
                                                    id="ubicacion"
                                                    variant="outlined"
                                                    size="medium"
                                                    required
                                                    fullWidth
                                                    value={usuarioAmodificar.ubicacion}
                                                />




                                            </div>

                                        </div>
                                        <div className="row">

                                            {/* <!--Columna 2--> */}
                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Password
                                                </MKTypography>
                                                <MKInput
                                                    id="password"
                                                    variant="outlined"
                                                    size="small"
                                                    type="text"
                                                />

                                            </div>
                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Rol
                                                </MKTypography>
                                                <select className="form-select">
                                                    <option selected>{usuarioAmodificar.rol}</option>
                                                    <option value="admin">Administrador</option>
                                                    <option value="propietario">Propietario</option>
                                                    <option value="user">Cliente</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="row align-center justify-content-center">




                                            <MKBox display="flex" justifyContent="flex-end" p={2}>
                                                <MKButton variant="contained" color="primary"
                                                    sx={
                                                        {
                                                            backgroundColor: "#FFA500",
                                                            color: "white",
                                                            "&:hover": {
                                                                backgroundColor: "#FFA500",
                                                                color: "white",
                                                            },
                                                        }
                                                    }

                                                    size="small" onClick={toggleModal}>
                                                    Guardar cambios
                                                </MKButton>
                                            </MKBox>
                                        </div>
                                    </MKBox>
                                </MKBox>
                            </MKBox>
                        </Slide>
                    </Modal>
                </Container>
            </MKBox>
        </div >
    );
}

export default EditarFoodtruck;


