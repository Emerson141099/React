import React, { useState, useEffect } from 'react';

const DeletarJogador = () => {
  const [jogadores, setJogadores] = useState([]);
  const [jogadorSelecionado, setJogadorSelecionado] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/Jogadores')
      .then((response) => response.json())
      .then((data) => setJogadores(data.content));
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:8080/Jogadores/${jogadorSelecionado}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Atualizar a lista de jogadores
        setJogadores(jogadores.filter((jogador) => jogador.id !== jogadorSelecionado));
        setJogadorSelecionado('');
      })
      .catch((error) => {
        console.error('Erro ao excluir jogador:', error);
      });
  };

  return <div>
      <label htmlFor="jogador">Selecione um jogador:</label>
      <select
        id="jogador"
        value={jogadorSelecionado}
        onChange={(event) => setJogadorSelecionado(event.target.value)}
      >
        <option value="">Selecione...</option>
        {jogadores.map((jogador) => (
          <option key={jogador.id} value={jogador.id}>
            {jogador.nome}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Excluir</button>
    </div>
};

export default DeletarJogador;
