import React, { useState, useEffect } from "react";
import axios from "axios";
import kanye1 from "./img/kanye.jpg";
import kanye2 from "./img/kanye2.jpg";
import kanye3 from "./img/kanye3.jpg";
import kanye4 from "./img/kanye4.jpg";
import kanye5 from "./img/kanye5.webp";
import kanye6 from "./img/kanye6.webp";
import kanye7 from "./img/kanye7.webp";
import kanye8 from "./img/kanye8.jpg";

const listaDeImagens = [
  kanye1,
  kanye2,
  kanye3,
  kanye4,
  kanye5,
  kanye6,
  kanye7,
  kanye8,
];

const obterImagemAleatoria = () => {
  const indiceAleatorio = Math.floor(Math.random() * listaDeImagens.length);
  return listaDeImagens[indiceAleatorio];
};

const App = () => {
  const [fraseKanye, setFraseKanye] = useState("");
  const [erro, setErro] = useState(null);
  const [imagemDeFundo, setImagemDeFundo] = useState("");
  const [carregando, setCarregando] = useState(true);

  const buscarDadosKanye = async () => {
    try {
      setCarregando(true);

      const resposta = await axios.get(`https://api.kanye.rest`);
      const fraseOriginal = resposta.data.quote;
      console.log("Frase original:", fraseOriginal);

      const options = {
        method: "POST",
        url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "1136fcefa8msh7685030f419d76dp154591jsn183d22a2edac",
          "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
        },
        data: `from=en&to=pt&text=${encodeURIComponent(fraseOriginal)}`,
      };

      const res = await axios.request(options);
      console.log("Resposta da API de tradução:", res);
      const fraseTraduzida = res.data.trans;
      console.log("Frase traduzida:", fraseTraduzida);

      setFraseKanye(fraseTraduzida);
      setErro(null);
    } catch (erro) {
      console.error("Erro ao buscar dados do Kanye West:", erro);
      setErro("Erro ao carregar frase do Kanye West");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosKanye();
    setImagemDeFundo(obterImagemAleatoria());
  }, []);

  const handleClickButton = () => {
    buscarDadosKanye();
    setImagemDeFundo(obterImagemAleatoria());
  };

  return (
    <div className="relative">
      {carregando && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${imagemDeFundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <button
            onClick={handleClickButton}
            className="p-3 bg-slate-950 hover:bg-white hover:text-slate-950 ease-in duration-100 border border-white hover:border-slate-950 rounded-lg text-white"
          >
            Obter Frase de Kanye West
          </button>
        </div>
        <div className="mt-4 text-center text-3xl italic tracking-wide leading-8 text-white bg-black bg-opacity-50 w-1/3">
          {fraseKanye && <p>{fraseKanye}</p>}
          {erro && <p>{erro}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
