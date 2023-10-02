
import './App.css';
import Modal from './componentes/modal.js';
import './componentes/cepModal.css'
import React, { useState } from 'react';



function App() {
  
  const [modalOpen, setModalOpen] = useState();
  const handleBtnClick = () => {
    setModalOpen(true)
   };
   const handleBtnFecha = () =>{
    setModalOpen(false)
   }
  
  return (
    <div>
      <div className='CEP'>
        <button onClick={handleBtnClick}
          className='btnCep' 
          aria-required>
          Busque um cep</button>
          {modalOpen && <Modal />}

        <span className='fechar' onClick={handleBtnFecha}>x</span>
        
        </div>
        <div className='COMPRAS'>

        </div>
    </div>
     
  );
}

export default App;