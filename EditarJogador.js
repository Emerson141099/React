import React, { useState, useEffect } from 'react';

const EditarJogador = () => {
  const [jogadores, setJogadores] = useState([]);
  const [jogadorSelecionado, setJogadorSelecionado] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [datanasc, setDatanasc] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/Jogadores')
      .then((response) => response.json())
      .then((data) => setJogadores(data.content));
  }, []);

  useEffect(() => {
    if (jogadorSelecionado) {
      const jogador = jogadores.find((jogador) => jogador.id === jogadorSelecionado);
      setNome(jogador.nome);
      setEmail(jogador.email);
      setDatanasc(jogador.datanasc);
    }
  }, [jogadorSelecionado]);

  const handleUpdate = () => {
    fetch(`http://localhost:8080/Jogadores/${jogadorSelecionado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, datanasc }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Atualizar a lista de jogadores
        setJogadores(
          jogadores.map((jogador) =>
            jogador.id === jogadorSelecionado ? { ...jogador, nome, email, datanasc } : jogador
          )
        );
        setJogadorSelecionado('');
        setNome('');
        setEmail('');
        setDatanasc('');
      })
      .catch((error) => {
        console.error('Erro ao atualizar jogador:', error);
      });
  };

  return <div>
      <h2>Editar Jogador</h2>
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
      {jogadorSelecionado && (
        <>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="datanasc">Data de Nascimento:</label>
            <input
              type="text"
              id="datanasc"
              value={datanasc}
              onChange={(event) => setDatanasc(event.target.value)}
            />
          </div>
          <button onClick={handleUpdate}>Atualizar</button>
        </>
      )}
    </div>
};

export default EditarJogador;
