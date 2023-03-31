import react from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import MKTypography from "components/MKAlert/MKTypography";
import MKBox from "components/MKBox";



const DatosCompletosUsuario = () => {

    return (
        <div>

            <MKTypography
                variant="h4"
                component="h4"
                color="primary"
                align="center"
                fontWeight="bold"
                fontSize="1.5rem"
                lineHeight="1.5"
                m={2}
                p={2}
            >
                Datos Completos del Usuario
            </MKTypography>

            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Nombre:
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.nombre}
                </MKTypography>
            </MKBox>

            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Email:
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.email}
                </MKTypography>
            </MKBox>

            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Telefono:
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.telefono}
                </MKTypography>
            </MKBox>

            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Ubicacion:
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.ubicacion ? user.ubicacion : "No tiene ubicacion"}
                </MKTypography>
            </MKBox>

            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Telefono
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.telefono}
                </MKTypography>
            </MKBox>


            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Password
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.password}
                </MKTypography>
            </MKBox>

            <MKBox display="flex" justifyContent="center" m={2} p={2}>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    Rol
                </MKTypography>
                <MKTypography
                    variant="h4"
                    component="h4"
                    color="primary"
                    align="center"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    lineHeight="1.5"
                    m={2}
                    p={2}
                >
                    {user.rol}
                </MKTypography>
            </MKBox>




        </div>
    )
}

export default DatosCompletosUsuario
