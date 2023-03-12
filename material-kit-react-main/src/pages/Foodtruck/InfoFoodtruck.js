import react from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AppBar from '@mui/material/AppBar';

import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavbarUsuario from "pages/Usuario/NavbarUsuario";

import Footer from "pages/LandingPages/Author/sections/Footer";



function InfoFoodtruck() {
    const [data, setData] = useState([]);
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [foodtruck, setFoodtruck] = useState([]);
    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const id = useParams();

    useEffect(() => {

        axios
            .get(`http://localhost:8000/api/foodtrucks/${id.id}/infofoodtruck`, {
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
                       
                        <Typography variant="h2" align="center" color="text.secondary" paragraph>
                           Nombre: {foodtruck.name}
                        </Typography>
                        <div>
                           
                        </div>
                    </Container>
                </Box>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </div>
    )
}

export default InfoFoodtruck;

