import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MKBox from "components/MKBox";



function CrearFoodtruck() {
    const [foodtrucks, setFoodtrucks] = useState([]);
    const [show, setShow] = useState(false);
    const api_token = document.cookie.replace(/(?:(?:^|.*;\s*)api_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const role = document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    useEffect(() => {

        axios
            .get(`http://localhost:8000/api/foodtrucks/listaporpropietario/${user_id}`, {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            nombre: data.get('nombre'),
            descripcion: data.get('descripcion'),
            ubicacion: data.get('ubicacion'),
            telefono: data.get('telefono'),
            horario: data.get('horario')


        });
    };



    return (
        <div>
            <MKBox title="Crear Foodtruck" color="info">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" />
                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion" placeholder="Descripcion" />
                        <label htmlFor="ubicacion">Ubicacion</label>
                        <input type="text" className="form-control" id="ubicacion" name="ubicacion" placeholder="Ubicacion" />
                        <label htmlFor="telefono">Telefono</label>
                        <input type="text" className="form-control" id="telefono" name="telefono" placeholder="Telefono" />
                        <label htmlFor="horario">Horario</label>
                        <input type="text" className="form-control" id="horario" name="horario" placeholder="Horario" />
                    </div>
                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </MKBox>
        </div>
    );
}

export default CrearFoodtruck;

