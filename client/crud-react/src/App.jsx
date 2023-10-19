import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
/* import withReactContent from "sweetalert2-react-content"; */

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleadosList] = useState([]);

  const add = () => {
    axios
      .post("http://localhost:3001/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limparCampos();
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html:
            "<i>El empleado <strong>" +
            nombre +
            "</strong> fue registrado con éxito</i>",
          icon: "success",
          timer: 3000,
        });
      })
      .catch(function (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró registrar el empleado!",
          footer:
            JSON.parse(JSON.stringify(err)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parse(JSON.stringify(err)).message,
        });
      });
  };

  const update = () => {
    axios
      .put("http://localhost:3001/update", {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limparCampos();
        Swal.fire({
          title: "<strong>Actualización exitosa</strong>",
          html:
            "<i>El empleado <strong>" +
            nombre +
            "</strong> fue actualizado con éxito</i>",
          icon: "success",
          timer: 3000,
        }).catch(function (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró actualizar el empleado!",
            footer:
              JSON.parse(JSON.stringify(err)).message === "Network Error"
                ? "Intente más tarde"
                : JSON.parse(JSON),
          });
        });
      });

    const deleteEmple = (val) => {
      Swal.fire({
        title: "Confrimar eliminación",
        html:
          "<i>Realmente desea eliminar a <strong>" +
          val.nombre +
          "</strong>?</i>",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminalo",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(`http://localhost:3001/delete/${val.id}`)
            .then((res) => {
              getEmpleados();
              limparCampos();
              Swal.fire({
                icon: "success",
                title: val.nombre + "fue eliminado.",
                showConfirmButton: false,
                timer: 3000,
              });
            })
            .catch(function (err) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró eliminar el empleado!",
                footer:
                  JSON.parse(JSON.stringify(err)).message === "Network Error"
                    ? "Intente más tarde"
                    : JSON.parse(JSON.stringify(err)).message,
              });
            });
        }
      });
    };

    const limparCampos = () => {
      setAnios("");
      setNombre("");
      setPais("");
      setId("");
      setCargo("");
      setEdad("");
      setEditar(false);
    };

    const editarEmpleado = (val) => {
      setEditar(true);
      setNombre(val.nombre);
      setEdad(val.edad);
      setPais(val.pais);
      setCargo(val.cargo);
      setAnios(val.anios);
      setId(val.id);
    };

    const getEmpleados = () => {
      axios.get("http://localhost:3001/empleados").then((response) => {
        setEmpleadosList(response.data);
      });
    };

    getEmpleados();

    return (
      <div className="container">
        <div className="card text-center">
          <div className="card-header">GESTIÓN DE EMPLEADOS</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Nombre:
              </span>
              <input
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingresa tu nombre"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={nombre}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Edad:
              </span>
              <input
                onChange={(e) => setEdad(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingresa tu edad"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={edad}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                País:
              </span>
              <input
                onChange={(e) => setPais(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingresa tu país"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={pais}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Cargo:
              </span>
              <input
                onChange={(e) => setCargo(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingresa tu cargo"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={cargo}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Años de experiencia:
              </span>
              <input
                onChange={(e) => setAnios(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingresa tu experiencia"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={anios}
              />
            </div>
          </div>
          <div className="card-footer text-muted">
            {editar ? (
              <div>
                <button className="btn btn-warning m-2" onClick={update}>
                  Actualizar
                </button>
                <button className="btn btn-info m-2" onClick={limparCampos}>
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="btn btn-success" onClick={add}>
                Registrar
              </button>
            )}
          </div>
        </div>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">País</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editarEmpleado(val);
                        }}
                        className="btn btn-info"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          deleteEmple(val);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
}
export default App;
