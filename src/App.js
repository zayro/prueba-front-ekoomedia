import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { connect, useSelector, useDispatch } from "react-redux";
import { add_menu } from "./redux";
import "./style/menu.scss";

function App() {
    //Redux
    const menu$ = useSelector((state) => state.menus);
    console.log("Load Menu", menu$);

    //const add_menu = useActions((data) => add_menu(data));
    const dispatch = useDispatch();

    // Declara title del texto
    const [title, setTitle] = useState("X");

    const [menu, setMenu] = useState({ data: menu$ });

    const [validacion, setValidacion] = useState("");

    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        celular: "",
        edad: 0,
    });

    const url_sever_name = window.location.hostname;

    let url = ``;

    if (url_sever_name === "localhost") {
        url = `http://${url_sever_name}:8000`;
    } else {
        url = `https://api-ekoomedia.herokuapp.com`;
    }

    console.log(process.env.NODE_ENV);

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const fetchDataMenu = () => {
        axios
            .request({
                method: "get",
                url: `${url}/ObtenerMenu`,
                data: datos,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response);
                console.log(response.message);
                if (response.data.status) {
                    setMenu(response.data);
                    dispatch(add_menu(response.data.data));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const GuardarInformacion = (event) => {
        event.preventDefault();

        if (datos.nombre.length === 0) {
            setValidacion("debe llenar el registro NOMBRE");

            return false;
        }

        if (datos.celular.length === 0) {
            setValidacion("debe llenar el registro CELULAR");

            return false;
        }

        console.log(datos.edad);
        if (datos.edad < 18 || datos.edad > 100 || typeof datos.edad !== 'number') {
            setValidacion("no cumple el rango de EDAD");

            return false;
        }


        const regx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

        //console.log(datos.email.match(regx));
        //console.log(regx.test(datos.email));

        if (!regx.test(datos.email)) {
            setValidacion("no es un EMAIL valido");

            return false;
        }


        axios
            .request({
                method: "post",
                url: `${url}/GuardaInformacion`,
                data: datos,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response);
                console.log(response.message);
                swal({
                    title: "Exitoso!",
                    text: `${response.data.message}`,
                    icon: "success",
                    button: "cerrar",
                    timer: 3000,
                });
            })
            .catch(function (error) {
                console.log(error);
                swal({
                    title: "opps ",
                    text: `ocurrio un problema!`,
                    icon: "error",
                    button: "cerrar",
                    timer: 3000,
                });
            });
    };

    useEffect(() => {
        fetchDataMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <header>
                <nav>
                    <ul className="sidenav">
                        {menu.data.map((item) => (
                            <li key={item.id}>
                                <a
                                    className={`${
                                        title === item.nombre ? "active" : ""
                                    }`}
                                    onClick={() => setTitle(item.nombre)}
                                    href={"#" + item.nombre}
                                >
                                    {item.nombre}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr />

                <h1>
                    <p className="text-center"> Hola bienvenido sabemos que quieres viajar en un {title}{" "} </p>
                </h1>

                <h4>
                    <p className="text-center">por favor diligencia el siguiente formulario:</p>
                </h4>

                <hr />

                <form onSubmit={GuardarInformacion}>
                    {/*                     <input  placeholder="nombre" onChange={handleInputChange} name="nombre" id="nombre" type="text" required />
                    <input  placeholder="email" onChange={handleInputChange} name="email" id="email" type="email" required />
                    <input  placeholder="celular" onChange={handleInputChange} name="celular" type="text" required />
                    <input  placeholder="number" onChange={handleInputChange} name="edad" type="number" required />
 */}

                    <input
                        placeholder="nombre"
                        onChange={handleInputChange}
                        name="nombre"
                        id="nombre"
                        type="text"
                    />
                    <input
                        placeholder="celular"
                        onChange={handleInputChange}
                        name="celular"
                        type="text"
                    />
                    <input
                        placeholder="edad"
                        onChange={handleInputChange}
                        name="edad"
                        type="text"
                    />
                    <input
                        placeholder="email"
                        onChange={handleInputChange}
                        name="email"
                        id="email"
                        type="text"
                    />

                    <button type="submit">Enviar </button>
                </form>

                <p className="error">{validacion}</p>
            </header>
        </div>
    );
}

export default connect()(App);
