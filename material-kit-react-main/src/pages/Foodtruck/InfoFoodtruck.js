import react from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AppBar from '@mui/material/AppBar';

import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavbarUsuario from "pages/Usuario/NavbarUsuario";
import Footer from "pages/LandingPages/Author/sections/Footer";
import MKAlert from "components/MKAlert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import MKButton from "components/MKButton";


function InfoFoodtruck() {
    const [foodtruck, setFoodtruck] = useState([]);
    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const id = useParams();

    useEffect(() => {

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
                setFoodtruck(res.data);
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <NavbarUsuario />
            <CssBaseline />
            <AppBar position="relative">

            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <br>
                        </br>
                        <MKButton variant="gradient" color="info" size="large" onClick={() => {
                            window.location.href = `/homeusuario`;
                        }}>
                            volver
                        </MKButton>
                        <br>
                        </br>
                        <Card sx={{ maxWidth: 345 }}>

                            <CardMedia
                                component="img"
                                height="140"
                                image={foodtruck.avatar}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {foodtruck.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {foodtruck.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                        <br>
                        </br>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {foodtruck.nombre}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            {foodtruck.descripcion}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            {foodtruck.direccion}
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            {foodtruck.horario}
                        </Typography>




                        <div>

                        </div>
                    </Container>
                </Box>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </div >
    )
}

export default InfoFoodtruck;

