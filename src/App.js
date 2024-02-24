import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [kanyeQuote, setKanyeQuote] = useState("");
  const [error, setError] = useState(null);

  const fetchKanyeData = async () => {
    try {
      const response = await axios.get(`https://api.kanye.rest`);
      setKanyeQuote(response.data.quote);
      setError(null);
    } catch (error) {
      setError("Erro ao carregar frase do Kanye West");
    }
  };

  useEffect(() => {
    fetchKanyeData();
  }, []);

  return (
    <div>
      <button onClick={fetchKanyeData}>Obter Frase de Kanye West</button>
      {kanyeQuote && <p>{kanyeQuote}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
