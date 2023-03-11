import { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Switch from "@mui/material/Switch";


// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
/*
 columnas de la tabla usuarios
id	
name	
email	
email_verified_at	
password	
remember_token	
api_token	
date_createtoken	
expires_at	
role	
avatar	
telefono	
ubicacion	
created_at	
updated_at*/

function SimpleModal() {
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(true);
    const [checked, setChecked] = useState(true);

    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    useEffect(() => {

        axios
            .post(`http://localhost:8000/api/usuarios/buscador/usuario`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Authorization": '${api_token}',
                    "user_id": `${user_id}`,
                    "role": `${role}`

                }
            })
            .then((res) => {
                alert(res.data.api_token);
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            });
    }, []);






    const toggleModal = () => setShow(show);




    return (
        <MKBox component="section" py={6} >
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
                                <MKTypography variant="h5">Ventana de información del usuario</MKTypography>
                                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox component="section" py={6}>
                                <Container>
                                    <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
                                        <MKTypography variant="h3" mb={1}
                                            style={{ marginBottom: "50px" }}>
                                            Mi cuenta
                                        </MKTypography>
                                    </Grid>
                                    <Grid container item
                                        xs={12}

                                        lg={7}
                                        sx={{ mx: "auto" }}
                                    >
                                        <MKBox width="100%" component="form" method="post" autoComplete="off">
                                            <MKBox alignItems="center"  >
                                                <Grid container >
                                                    <Grid item xs={12} sm={10} >
                                                        <MKInput
                                                            id="name"
                                                            name="name"
                                                            label="Nombre"
                                                            variant="outlined"
                                                            style={{ marginBottom: "20px" }}

                                                            required
                                                            fullWidth

                                                        />
                                                        <MKInput
                                                            id="email"
                                                            name="email"
                                                            label="Nombre"
                                                            variant="outlined"
                                                            style={{ marginBottom: "20px" }}

                                                            fullWidth
                                                            required

                                                        />
                                                        <MKInput
                                                            id="phone"
                                                            name="phone"
                                                            label="Telefono"
                                                            variant="outlined"
                                                            style={{ marginBottom: "20px" }}

                                                            fullWidth
                                                            required
                                                        />
                                                        <MKInput
                                                            id="password"
                                                            name="password"
                                                            label="Password"
                                                            variant="outlined"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            required
                                                        />
                                                        <MKInput
                                                            id="password_confirmation"
                                                            name="password_confirmation"
                                                            label="Password Confirmation"
                                                            variant="outlined"
                                                            style={{ marginBottom: "20px" }}
                                                            fullWidth
                                                            required
                                                        />
                                                        <MKInput
                                                            id="ubicacion"
                                                            name="ubicacion"
                                                            label="Ubicacion (Ciudad, País)"
                                                            fullWidth
                                                            required
                                                        />

                                                    </Grid>
                                                </Grid>
                                                <Grid container item justifyContent="center" xs={12} my={2}>
                                                    <MKButton type="submit" variant="gradient" color="dark" fullWidth onClick={() => {
                                                        window.location.href = `/login`;
                                                    }} >
                                                        Guardar cambios
                                                    </MKButton>
                                                </Grid>
                                            </MKBox>
                                        </MKBox>
                                    </Grid>
                                </Container>
                            </MKBox>
                            <Divider sx={{ my: 0 }} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="warning" onClick={() => {
                                    window.location.href = `/homeusuario`;
                                }}>
                                    volver
                                </MKButton>

                            </MKBox>
                        </MKBox>
                    </Slide>
                </Modal>
            </Container>
        </MKBox>
    );
}

export default SimpleModal;