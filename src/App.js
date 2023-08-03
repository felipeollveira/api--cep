
import './App.css';
import Modal from './componentes/modal.js';
import './componentes/cepModal.css'
 import React, { useState } from 'react';


function App() {
  

    const [modalOpen, setModalOpen] = useState(false);
  
    const handleButtonClick = () => {
      setModalOpen(true);
    };

  return (
    <div> 
    <button onClick={handleButtonClick}
     className='botao01' 
     aria-required>
      Busque um cep</button>

      {modalOpen && <Modal />}
   </div>
   
  );
}

export default App;