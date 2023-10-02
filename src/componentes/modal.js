import './cepModal.css'
import api from '../services/api.js';
import React, { useState, useRef, useCallback } from 'react';
import { FiSearch, FiCopy } from 'react-icons/fi';
import styled from 'styled-components';



function Modal(){

 const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  let cepInputRef = useRef();
  let msgRef = useRef();
  let mainRef = useRef();
 

  const exibirMensagem = useCallback(() => {
    msgRef.current.style.opacity = '1';
    setTimeout(() => {
      msgRef.current.style.opacity = '0';
      msgRef.current.textContent = '';
    }, 1500); // Tempo em milissegundos 
  }, []);

  async function pesquisa() {
    if (input === '') {
      mainRef.current.style.display = 'none';
        msgRef.current.textContent = 'Digite algum cep!';
        msgRef.current.style.color = 'black';
        exibirMensagem();
        return 0;
    }

    // Verificação caso cep incompleto
    if (input.length >= 1 && input.length <= 7) {
      msgRef.current.textContent = 'CEP incompleto.';
      msgRef.current.style.color = 'red';
      exibirMensagem();
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);

      // Verificação caso cep inexistente
      if (response.data.cep === undefined) {
        mainRef.current.style.display = 'none';
        msgRef.current.textContent = 'Verifique o CEP digitado.';
        msgRef.current.style.color = 'red';
        exibirMensagem();
      } else {
        mainRef.current.style.display = 'flex';
        msgRef.current.textContent = 'CEP encontrado com sucesso!';
        msgRef.current.style.color = 'green';
       exibirMensagem();
        
      }

      setInput('');
    } catch (error) {
      mainRef.current.style.display = 'none';
      msgRef.current.textContent ='Não pode haver caracteres especiais ou letras.';
      msgRef.current.style.color = 'red';
      msgRef.current.style.fontSize = '8pt'
      exibirMensagem();
      setInput('');
    }
  }

  function copiar() {
    const dados = `${cep.cep}: ${cep.logradouro}, ${cep.bairro}, ${cep.localidade}-${cep.uf}`;

    navigator.clipboard.writeText(dados).then(() => {
      alert('Copiado para área de transferência');
    });
     }
    
  
      
  return (
    
  <div className='cep'>
  <div className="container">



      <h1 className="title">Buscador de CEP🌎</h1>

      
      <div className="containerInput" tabIndex={0}>
        <input
          ref={cepInputRef}
          required
          id="cepInput"
          type="text"
          placeholder="Digite um cep..."
          autoComplete="off"
          maxLength={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Campo de entrada para digitar o CEP"
        />

        <button
          className="buttonSearch"
          onClick={pesquisa}
          id="tecleEnter"
          aria-label="Pesquisar CEP"
        >
          <FiSearch size={25} color="" />
        </button>
      </div>

      <main ref={mainRef}>
        <div onClick={copiar} className="copy">
            <h2>{cep.cep}</h2>
          <span className="FiCopy">
            <FiCopy size={14} color="#fff" />
          </span>
          
        </div>

        <section>
          <span id="dados">
            <p>Rua</p>
            <span id="rua" className="animate">
              {cep.logradouro}
            </span>
          </span>

          <span id="dados">
            <p>Bairro</p>
            <span id="bairro" className="animate">
              {cep.bairro}
            </span>
          </span>

          <span id="dados">
            <p>Localidade</p>
            <span id="local" className="animate">
              {cep.localidade}
            </span>
          </span>

          <span id="dados">
            <p>UF</p>
            <span className="animate">{cep.uf}</span>
          </span>
        </section>
       
      </main>
       <span id="return">
        <span id="msg" ref={msgRef}></span>
      </span>
      </div>
    </div>
  );

}





export default Modal;

