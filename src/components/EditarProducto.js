import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editarProductoAction } from "../actions/productoActions"
import { useNavigate } from "react-router-dom"

const EditarProducto = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // Nuevo State de producto
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: ""
  })

  // Producto a Editar
  const productoeditar = useSelector(state => state.productos.productoeditar)

  // Llenar el Satate automaticamente
  useEffect(() => {
    guardarProducto(productoeditar)
  }, [productoeditar])

  // Leer los datos del formulario
  const onChangeFormulario = e => {
    guardarProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }

  const {nombre, precio} = producto

  const submitEditarProducto = e => {
    e.preventDefault()
    dispatch(editarProductoAction(producto))
    navigate("/")
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 front-weight-bold">
              Editar Producto
            </h2>

            <form
              onSubmit={submitEditarProducto}
            >
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Prodcuto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Prodcuto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                  Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto