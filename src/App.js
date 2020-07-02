import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { connect, useSelector, useDispatch  } from "react-redux";
import {add_menu} from './redux';
import './style/menu.scss';

function App() {

    //Redux
    const menu$ = useSelector(state => state.menus);
    console.log('Load Menu',menu$);

    //const add_menu = useActions((data) => add_menu(data));
    const dispatch = useDispatch();


    // Declara title del texto
    const [title, setTitle] = useState('X');

    const [menu, setMenu] = useState({ data: menu$ });

    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        celular: '',
        edad: ''
    });



    const url_sever_name = window.location.hostname;

    let url = `http://${url_sever_name}`;

    if( url_sever_name === 'localhost'){
         url = `http://${url_sever_name}:8000`;
    }

    console.log(process.env.NODE_ENV);

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const fetchDataMenu = () => {


        axios.request({
            method: 'get',
            url: `${url}/ObtenerMenu`,
            data: datos,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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

        event.preventDefault()

        axios.request({
            method: 'post',
            url: `${url}/GuardaInformacion`,
            data: datos,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },        }

            , )
          .then(function (response) {
            console.log(response);
            console.log(response.message);
            swal({
                title: "Exitoso!",
                text: `${response.data.message}`,
                icon: "success",
                button: "cerrar",
                timer: 3000
              });
          })
          .catch(function (error) {
            console.log(error);
            swal({
                title: "opps ",
                text: `ocurrio un problema!`,
                icon: "error",
                button: "cerrar",
                timer: 3000
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
                        {menu.data.map(item => (
                            <li key={item.id}>
                                <a className={`${title === item.nombre ? 'active' : ''}`} onClick={() => setTitle(item.nombre)} href={'#' + item.nombre}>{item.nombre}</a>
                            </li>
                        ))}

                    </ul>
                </nav>

                <hr/>

                <h1>Hola bienvenido sabemos que quieres viajar en un {title}  </h1>

                <hr />


                <form onSubmit={GuardarInformacion}>

                    <input  placeholder="nombre" onChange={handleInputChange} name="nombre" id="nombre" type="text" required />
                    <input  placeholder="email" onChange={handleInputChange} name="email" id="email" type="email" />
                    <input  placeholder="celular" onChange={handleInputChange} name="celular" type="text" />
                    <input  placeholder="number" onChange={handleInputChange} name="edad" type="number" />

                    <button type="submit" >Enviar </button>
                </form>




            </header>
        </div>
    );
}




export default connect() (App);
