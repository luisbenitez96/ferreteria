import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import SearchBar from './searchBar';

function App() {

  const dataFerreteria = [
    { id: 1, nombre: "puntilla", valor: 241 },
    { id: 2, nombre: "machete", valor: 225 },
    { id: 3, nombre: "sierra", valor: 216 },
    { id: 4, nombre: "tablas", valor: 216 },
    { id: 5, nombre: "tubos", valor: 207 },
    { id: 6, nombre: "llaves", valor: 195 },
    { id: 7, nombre: "tornillos", valor: 191 },
    { id: 8, nombre: "cemento", valor: 190 },
    { id: 9, nombre: "arena", valor: 190 },
    { id: 10, nombre: "pinturo", valor: 186 },
  ];

  const [data, setData] = useState(dataFerreteria);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  
  
  

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: '',
    nombre: '',
    valor: ''
  });

  const seleccionarProducto=(elemento, caso)=>{
setProductoSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    const dataNueva=data;
    dataNueva.map(producto=>{
      if(producto.id===productoSeleccionado.id){
        producto.valor=productoSeleccionado.valor;
        producto.nombre=productoSeleccionado.nombre;
      }
    

    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setProductoSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    const valorInsertar=productoSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    const dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  
  const onSearch = async (terminoBusqueda) => {
    const resultado=data.filter((elemento)=>{      
        if(elemento.id.toString().includes(terminoBusqueda)){               
        return (elemento);
      
        }
    });
    setData(resultado);
    console.log(resultado)
    setData(resultado);
    console.log(resultado)
  
    
    
   
  }

  return (
    <div className="App" >

<nav  className="navbar navbar-expand-sm bg-dark navbar-dark">
  <div className="form-inline" >
    <SearchBar onSearch={onSearch}/>
    
    
  </div>
</nav>

      
      
     
      <br />
    

    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>{" "}
    
    
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.valor}</td>
                  
              <td><button className="btn btn-primary" onClick={()=>seleccionarProducto(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarProducto(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
            
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={productoSeleccionado && productoSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productoSeleccionado && productoSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Valor</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={productoSeleccionado && productoSeleccionado.minutos}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productoSeleccionado ? productoSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Valor</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={productoSeleccionado ? productoSeleccionado.minutos: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;