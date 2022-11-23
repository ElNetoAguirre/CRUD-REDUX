import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions"
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions"

const NuevoProducto = () => {

  const navigate = useNavigate()

  // State del componente
  const [nombre, guardarNombre] = useState("")
  const [precio, guardarPrecio] = useState(0)

  // Utilizar useDispatch y te crea una funcion
  const dispatch = useDispatch()

  // Acceder al State del Store
  const cargando = useSelector(state => state.productos.loading)
  const errors = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)
  

  // Mandar llamar el action de productoAction
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

  // Cuando el ususario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault()
    // Validar formulario
    if(nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3"
      }
      dispatch(mostrarAlerta(alerta))
      return
    }

    // Si no hay errores
    dispatch(ocultarAlertaAction())

    // Crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    })

    // Redireccionar
    navigate("/")
    // Se cambia el navigate al productoActions.js para que cuando se agregue un articulo
    // se haga el redireccionamiento, si hay un error, se queda en el formulario
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 front-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

            <form
              onSubmit={submitNuevoProducto}
            >
              <div className="form-group">
                <label>Nombre del Producto:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio del Producto:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="precio"
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando ? <p>Cargando...</p> : null}

            {errors ? <p className="alert alert-danger p2 mt-4 text-center font-weight-bold">Hubo un error...</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto