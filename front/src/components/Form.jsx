function Form({ setTitulo, setImgSRC, setDescripcion, agregarPost }) {
  return (
    <div className="form">
      <div className="mb-2">
        <h6>Agregar post</h6>
        <label>Título</label>
        <input placeholder="Amo los chihuahuas"
          onChange={(event) => setTitulo(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input placeholder="https://perritos.png"
          onChange={(event) => setImgSRC(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea placeholder="Este es un post de adoración a los chihuahuas."
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="d-flex">
        <button onClick={agregarPost} className="btn btn-light m-auto">
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Form;
