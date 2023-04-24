import "../styles/App.scss";
import getDataApi from "../services/fetch";
import { useEffect, useState } from "react";

function App() {
  //variables de estado
  const [phrases, setPhrases] = useState([]);
  const [newPhrase, setNewPhrase] = useState({
    quote: "",
    character: "",
  });
  const [filters, setFilters] = useState("");
  const [filtersCharacter, setFiltersCharacter] = useState("all");

  //Hacer un hook para traer los datos de la Api
  useEffect(() => {
    getDataApi().then((data) => {
      setPhrases(data);
    });
  }, []);

  //Renderizar los datos. Map recibe como parametro una funcion de tipo arrow. El map recorre el array y por cada elemento del array retorna un li con las frases.
  const htmlPhrases = phrases
    .filter((item) => {
      return item.quote.toLowerCase().includes(filters.toLowerCase())
    })

    .filter((item) => {
      if (filtersCharacter === 'all') {
        return true
      }
      return item.character.includes(filtersCharacter)
    })

    .map((item, index) => {
      return (
        <li className="list-element" key={index}>
          {`${item.quote} - ${item.character}`}
        </li>
      );
    });

  //Añadir una nueva frase
  const handleNewPhrase = (ev) => {
    ev.preventDefault();
    setNewPhrase({
      ...newPhrase,
      [ev.target.name]: ev.target.value,
    });
  };

  //Boton añadir nueva frase
  const handleAddNewPhrase = (ev) => {
    ev.preventDefault();
    if (newPhrase.quote === "" || newPhrase.character === "") {
      return
    }
    setPhrases([...phrases, newPhrase]);
    setNewPhrase({
      quote: "",
      character: "",
    })

  }

  //Filtrar por frase
  const handleFilters = (ev) => {
    ev.preventDefault();
    setFilters(ev.target.value);
  };

  //Filtrar por personajes
  const handleFiltersCharacter = (ev) => {
    ev.preventDefault();
    setFiltersCharacter(ev.target.value);
  }

  return (
    <div className="container-div">
      <header>
        {/* Frases de Friends */}
        <h1 className="title-h1">Frases de Friends</h1>
        <form className="form-header">
          {/* Filtrar por frase */}
          <label className="filter-phrase">
            Filtrar por frase
            <input className="input-phrase"
              type="text"
              name="quote"
              value={filters}
              onChange={handleFilters}>
            </input>
          </label>
          {/* Filtrar por personaje */}
          <label className="filter-character">
            Filtrar por personaje
            <select
              className="input-character"
              onChange={handleFiltersCharacter}
              value={filtersCharacter}>
              <option value="all">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Mónica">Mónica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </label>
        </form>
      </header>

      <main>
        {/* Lista de frases */}
        <ul className="list">{htmlPhrases}</ul>
        {/* Añadir nueva frase */}
        <h2 className="title-h2">Añadir una nueva frase</h2>
        <form className="form-main">
          {/* Añadir frase */}
          <label className="add-phrase">
            Frase
            <input className="input-main" type="text" name="quote"
              value={newPhrase.quote}
              onChange={handleNewPhrase}>
            </input>
          </label>
          {/* Añadir personaje */}
          <label className="add-phrase">
            Personaje
            <input className="input-main" type="text" name="character"
              value={newPhrase.character}
              onChange={handleNewPhrase}>
            </input>
          </label>
        </form>
        {/* Boton añadir */}
        <div className="button">
          <button className="add-button"
            onClick={handleAddNewPhrase}>
            Añadir nueva frase
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
