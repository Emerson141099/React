import React, { useState, useEffect } from 'react';

const JogadoresPage = () => {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/Jogadores')
      .then((response) => response.json())
      .then((data) => setJogadores(data.content));
  }, []);

  return (
    <div>
      <h2>Jogadores</h2>
      {jogadores.map((jogador) => (
        <div key={jogador.id}>
          <h3>{jogador.nome}</h3>
          <p>Email: {jogador.email}</p>
          <p>Data Nascimento: {jogador.datanasc}</p>
          {/* Outros dados do jogador */}
        </div>
      ))}
    </div>
  );
};

export default JogadoresPage;