import react from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import NavbarUsuario from "./NavbarUsuario";
import AppBar from '@mui/material/AppBar';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from "pages/LandingPages/Author/sections/Footer";
import Card from "@mui/material/Card";


function HomeUsuario() {
    const [data, setData] = useState([]);
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [foodtrucks, setFoodtrucks] = useState([]);
    const theme = createTheme();

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
                setFoodtrucks(res.data);
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDetalles = (id) => {
        window.location.href = `/foodtrucks/${id}/info`;


    }




    return (
        <div >
            <NavbarUsuario />


            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="relative">

                </AppBar>
                {/* Hero unit */}
                <br />

                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 6,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            <br />
                            &nbsp;
                            Foodtrucks activas ahora en tu zona
                        </Typography>

                        {/*<Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                </Stack>*/}
                    </Container>
                </Box>
                <Container sx={{ py: 2 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={6}>


                        {foodtrucks.map((foodtruck) => (
                            <Grid item key={foodtruck.id} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h5">
                                            {foodtruck.nombre}
                                        </Typography>
                                        <Typography>
                                            {foodtruck.descripcion}
                                        </Typography>
                                        <Typography>
                                            {foodtruck.direccion}
                                        </Typography>
                                        &nbsp;

                                        <Typography color="text.primary">
                                            {foodtruck.horario}
                                        </Typography>
                                        &nbsp;
                                        <Typography >
                                            Estado: {foodtruck.status}
                                        </Typography>
                                    </CardContent>
                                    <CardActions >
                                        <Link to={`/foodtrucks/dondeesta/${foodtruck.id}/info`} className='btn btn-primary btn-lg'>
                                            Ver donde está ahora
                                            </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}







                    </Grid>
                </Container>
                {/* Footer */}
                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Something here to give the footer a purpose!
                    </Typography>
                </Box>
                {/* End footer */}
            </ThemeProvider >


            <Footer />
        </div >
    );
}

export default HomeUsuario;
