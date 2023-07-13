import React from 'react';
import './App.css';
import JogadoresPage from './components/JogadoresPage'
import FormularioJogador from './components/FormularioJogador'
import DeletarJogador from './components/DeletarJogador';
import EditarJogador from './components/EditarJogador'


function App() {
  return (
    <div className="App">
      <h2>Cadastro de Jogadores</h2>
      <FormularioJogador />
      <EditarJogador />
      <JogadoresPage />
      <DeletarJogador />
    </div>
  );
}

export default App;
