import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './style/menu.scss';

function App() {

    // Declara title del texto
    const [title, setTitle] = useState('X');

    const [menu, setMenu] = useState({ data: [] });

    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        celular: '',
        edad: ''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const fetchDataMenu = async () => {
        const result = await axios(
            `http://localhost:8000/ObtenerMenu`,
        );

        console.log('result', result.data.data);
        console.log('result', result.data.status);

        if (result.data.status) {
            setMenu(result.data);
        }


    };

    const GuardarInformacion = (event) => {

        event.preventDefault()

        axios.request({
            method: 'post',
            url: `http://localhost:8000/GuardaInformacion`,
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

                <h1>Hola bienvenido sabemos que quieres viajar en un {title}  </h1>

                <hr />


                <form onSubmit={GuardarInformacion}>

                    <input type="text" placeholder="nombre" onChange={handleInputChange} name="nombre" type="text" required />
                    <input type="text" placeholder="email" onChange={handleInputChange} name="email" type="email" />
                    <input type="text" placeholder="celular" onChange={handleInputChange} name="celular" type="text" />
                    <input type="text" placeholder="number" onChange={handleInputChange} name="edad" type="number" />

                    <input type="submit" value="Submit" />
                </form>




            </header>
        </div>
    );
}

export default App;
