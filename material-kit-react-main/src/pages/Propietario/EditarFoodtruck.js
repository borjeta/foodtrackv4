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
    const [imagen, setImagen] = useState([]);
    const id = useParams();


    const [open, setOpen] = useState(false);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    const handleSubmit = () => {


        axios.put(`http://localhost:8000/api/foodtrucks/${foodtruck.id}/editar`, {
            "id": foodtruck.id,
            "nombre": document.getElementById("nombre").value,
            "descripcion": document.getElementById("descripcion").value,
            "ubicacion": document.getElementById("ubicacion").value,
            "telefono": document.getElementById("telefono").value,
            "avatar": document.getElementById("avatar").value,
            "horario": document.getElementById("horario").value,
            "tipocomida": document.getElementById("tipocomida").value,
            "status": foodtruck.status,

        }, {
            headers: {
                "Access-Control-Allow-Origin": "localhost:3000/*/*/*",
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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
                    /*recarga la pagina*/
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

        handleSubmit();
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
    useEffect(() => {

        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        document.getElementById("root").scrollTop = 0;

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
                document.getElementById("tipocomida").value = res.data.TipoComida;
                alert(res.data.horario)
            })
            .catch((err) => {
                console.log(err);
            });



        axios
            .post(`http://localhost:8000/api/usuarios/${user_id}/buscausuario`, {
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



    const dondeestaras = () => {
        axios
            .get(`http://localhost:8000/api/foodtrucks/listaporpropietario/${foodtruck.id}/dondeestaras`, {
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
            })
            .catch((err) => {
                console.log(err);
            });
    }



    /*Editar foodtruck*/

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
                                    <MKTypography variant="h5" alignItems="center">Ventana de edición de foodtruck</MKTypography>
                                    <MKButton
                                        variant="text"
                                        color="primary"
                                        size="large"
                                        onClick={() => {
                                            window.location.href = `/foodtrucks/propietario/listafoodtrucks`;
                                        }
                                        }
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
                                                    size="small"
                                                    required
                                                    fullWidth

                                                />
                                            </div>

                                            {/* <!--Columna 2--> */}
                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Descripción
                                                </MKTypography>
                                                <MKInput
                                                    id="descripcion"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            </div>
                                        </div>

                                        {/* <!--Fila 2--> */}
                                        <div className="row">


                                            {/* <!--Columna 1--> */}
                                            <div className="col">
                                                <MKTypography variant="h6" >
                                                    Ubicacion
                                                </MKTypography>
                                                <MKInput
                                                    id="ubicacion"
                                                    variant="outlined"
                                                    size="small"

                                                />
                                                <MKTypography variant="h6" >
                                                    Horario
                                                </MKTypography>
                                                <MKInput
                                                    id="horario"
                                                    size="large"
                                                    type="time"
                                                    defaultValue={foodtruck.horario}
                                                />

                                            </div>



                                            {/* <!--Columna 3--> */}
                                            <div className="col">

                                                <MKTypography variant="h6" >
                                                    Teléfono
                                                </MKTypography>
                                                <MKInput
                                                    id="telefono"
                                                    variant="outlined"
                                                    size="small"
                                                />


                                            </div>


                                        </div>
                                        <div className="row">

                                            {/* <!--Columna 2--> */}

                                            <div className="col">
                                                <MKBox display="flex" flexDirection="column" gap={3}
                                                    py={3}>
                                                    <MKTypography variant="h6" >
                                                        Guarda cambios antes para ubicación
                                                    </MKTypography>
                                                    <MKButton variant="contained"

                                                        color="primary"
                                                        size="large"
                                                        onClick={() => { window.location.href = `https://www.google.com/maps/search/?api=1&query=${foodtruck.ubicacion}` }}
                                                    > Dónde estarás</MKButton>
                                                </MKBox>
                                            </div>
                                        </div>
                                        <MKTypography variant="h6" >
                                            Categoria
                                        </MKTypography>
                                        <MKInput
                                            id="tipocomida"
                                            variant="outlined"
                                            size="small"
                                        />

                                        <MKTypography variant="h6" >
                                            Avatar URL (Los cambios se mostrarán después de guardar)
                                        </MKTypography>
                                        <MKInput
                                            id="avatar"
                                            variant="outlined"
                                            size="small"
                                            onChange={handleAvatar}
                                        />

                                        <MKTypography variant="h6" >
                                            Previsualización
                                        </MKTypography>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            alt="green iguana"
                                            image={foodtruck.avatar}
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

                                        <div className="row align-center justify-content-center">


                                            <MKBox display="flex" flexDirection="column" gap={2}>
                                                <MKTypography variant="h4">Hora de cierre</MKTypography>
                                                <MKBox display="flex" flexDirection="column" gap={2}>
                                                    <MKBox display="flex" flexDirection="row" gap={2}>
                                                        <MKBox display="flex" flexDirection="column" gap={2}>
                                                            <MKBox display="flex" flexDirection="row" gap={2}>
                                                                <MKInput
                                                                    id="horario"
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
                            </MKBox >
                        </Slide >
                    </Modal >
                </Container >
            </MKBox >
        </div >
    );
}

export default EditarFoodtruck;


