import React, { useState } from 'react';
import './style/menu.scss';

function App() {

    // Declara una nueva variable de estado, la cual llamaremos “count”
    const [title, setTitle] = useState('X');

    const [datos, setDatos] = useState({
        nombre: '',
        apellido: ''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.nombre + ' ' + datos.apellido)
    }


    return (

        <div className="App">


            <header>

                <nav>
                    <ul className="sidenav">
                        <li><a className="active" href="#home">Home</a></li>
                        <li><a href="#news">News</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#about" onClick={() => setTitle('Abot')} > About</a></li>
                    </ul>
                </nav>

                <h1>Hola bienvenido sabemos que quieres viajar en un {title}  </h1>

                <hr/>


                <form onSubmit={enviarDatos}>

                <input type="text" placeholder="nombre" onChange={handleInputChange} name="nombre" type="text" required />
                <input type="text" placeholder="email"  onChange={handleInputChange} name="email" type="email" />
                <input type="text" placeholder="celular"  onChange={handleInputChange} name="celular" type="text" />
                <input type="text" placeholder="number"  onChange={handleInputChange} name="edad" type="number" />

                <input type="submit" value="Submit" />
                </form>




            </header>
        </div>
    );
}

export default App;
