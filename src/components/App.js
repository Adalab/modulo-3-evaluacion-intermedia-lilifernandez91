import { useEffect, useState } from "react";
import "../styles/App.scss";
import objectExport from "../services/fetch";

function App() {
  const [phrases, setPhrases] = useState([]);
  const [newPhrase, setNewPhrase] = useState({
    quote: "",
    character: "",
  });
  const [filters, setFilters] = useState({
    filterPhrase: "",
    filterCharacter: "",
  });

  useEffect(() => {
    objectExport.getDataApi().then((data) => {
      setPhrases(data);
    });
  }, []);

  
  const html = phrases.filter(p => p && p.quote && p.quote.toLowerCase().includes(filters.filterPhrase.toLowerCase())).filter(p => p && p.character && p.character.toLowerCase().includes(filters.filterCharacter.toLowerCase())).map((phrasesItem, i) => {
    return (
      <li key={i} className="phrase-element">
        <span className="title">{phrasesItem.quote}</span>{" "}
        {phrasesItem.character}
      </li>
    );
  });

  const handleNewPhrase = (ev) => {
    ev.preventDefault();
    setNewPhrase({
      ...newPhrase,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleFilters = (ev) => {
    ev.preventDefault();
    setFilters({
      ...filters,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleAddNewPhrase = (ev) => {
    ev.preventDefault();
    setPhrases([...phrases, newPhrase]);
    setNewPhrase({
      quote: "",
      character: "",
    });
  };

  return (
    <div className="app-container">
      <header className="phrases-header">
        <h1>Frases de Friends</h1>
        <div className="phrases-header-filters">
          <div>
            <p>Filtrar por frase</p>
            <input
              className="phrases-filter phrases-filter-phrase"
              value={filters.filterPhrase}
              onChange={handleFilters}
              type="text"
              name="filterPhrase"
              id="filterPhrase"
              placeholder="Frase"
            ></input>
          </div>
          <div>
            <p>Filtrar por personaje</p>
            <input
              className="phrases-filter"
              value={filters.filterCharacter}
              onChange={handleFilters}
              type="text"
              name="filterCharacter"
              id="filterCharacter"
              placeholder="Character"
            ></input>
          </div>
        </div>
      </header>

      <main>
        <ul className="phrase-list">{html}</ul>
        <section className="add-new-phrase">
          <form onSubmit={(ev) => handleAddNewPhrase(ev)}>
            <h2>Añadir una nueva frase</h2>
            <div className="new-phrase-inputs">
              <div>
                <p>Frase</p>
                <input
                  className="new-phrase-input new-phrase-input-left"
                  value={newPhrase.quote}
                  onChange={handleNewPhrase}
                  type="text"
                  name="quote"
                  id="quote"
                  placeholder="Quote"
                ></input>
              </div>
              <div>
                <p>Personaje</p>
                <input
                  className="new-phrase-input"
                  value={newPhrase.character}
                  onChange={handleNewPhrase}
                  type="text"
                  name="character"
                  id="character"
                  placeholder="Personaje"
                ></input>
              </div>
            </div>
            <button type="submit" className="new-phrase-submit">
              Añadir una nueva frase
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
