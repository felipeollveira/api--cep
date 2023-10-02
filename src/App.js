
import './App.css';
import Modal from './componentes/modal.js';
import './componentes/cepModal.css'
import React, { useState } from 'react';



function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleBtnClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <div className='CEP'>
        <button onClick={handleBtnClick} className='btnCep' aria-required>
          Busque um cep
        </button>
        {modalOpen && <Modal />}
      </div>
      <div className='COMPRAS'></div>
    </div>
  );
}

export default App;