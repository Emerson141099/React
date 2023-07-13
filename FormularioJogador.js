import React, { useState } from 'react';
import './FormStyle.css';

const FormularioJogador = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [datanasc, setDatanasc] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/Jogadores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, datanasc }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Limpar os campos do formulário
        setNome('');
        setEmail('');
        setDatanasc('');
      })
      .catch((error) => {
        console.error('Erro ao enviar dados:', error);
      });
  };

  return <form onSubmit={handleSubmit}>
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
      <button type="submit">Enviar</button>
    </form>
  
};

export default FormularioJogador;
