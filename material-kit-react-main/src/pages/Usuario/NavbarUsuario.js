import react from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

function NavbarUsuario() {
    return (
        <div>
            <DefaultNavbar
                routes={routes}
                action={{
                    type: "external",
                    route: "https://www.creative-tim.com/product/material-kit-react",
                    label: "free download",
                    color: "info",
                }}
                sticky
            />
        </div>
    )
}

export default NavbarUsuario;
