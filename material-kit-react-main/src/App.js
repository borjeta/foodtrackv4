/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import Logout from "pages/Usuario/Logout";
import HomeUsuario from "pages/Usuario/HomeUsuario";
import Signin from "pages/LandingPages/SignIn";
import InfoCuenta from "pages/Usuario/InfoCuenta";
import Registro from "pages/Usuario/Registro";
import InfoFoodtruck from "pages/Foodtruck/InfoFoodtruck";
import HomePropietario from "pages/Propietario/HomePropietario";
import routes from "routes";
import ListaFoodtrucksPropietario from "pages/Propietario/ListaFoodtrucksPropietario";
import InfoFoodtruckPropietario from "pages/Propietario/InfoFoodtruckPropietario";
import EditarFoodtruck from "pages/Propietario/EditarFoodtruck";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Presentation />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/homeusuario" element={<HomeUsuario />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/micuenta" element={<InfoCuenta />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/foodtrucks/:id/info" element={<InfoFoodtruck />} />
        <Route path="/foodtrucks/dondeesta/:id/info" element={<InfoFoodtruck />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/homepropietario" element={<HomePropietario />} />
        <Route path="/foodtrucks/propietario/listafoodtrucks" element={<ListaFoodtrucksPropietario />} />
        <Route path="/foodtrucks/propietario/listafoodtrucks/:id/info" element={<InfoFoodtruckPropietario />} />
        <Route path="/foodtrucks/propietario/listafoodtrucks/:id/editar" element={<EditarFoodtruck />} />
      </Routes>
    </ThemeProvider>
  );
}

