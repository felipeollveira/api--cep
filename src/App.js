
import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import {FiCopy} from 'react-icons/fi';
import './App.css';
import api from './services/api.js';
import Mapa from './componentes/mapa.js'

function App() {
  const main = document.querySelector('main')
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  
    const cepInput = document.getElementById("cepInput");
/* Mascara de CEP - Add de - apois 5 primeiros numeros
    cepInput.addEventListener("input", function (e) {
      const value = e.target.value;

      // Remover quaisquer hífens existentes para evitar duplicação
      const formattedValue = value.replace(/-/g, '');

      // Adicionar hífen após os 5 primeiros dígitos
      const newValue = formattedValue.replace(/^(\d{5})/, '$1-');

      // Atualizar o valor do campo de entrada com o novo valor formatado
      cepInput.value = newValue;

    });
  */

    // Mensagens de retorno
  
  let msg = document.getElementById('msg')
  function exibirMensagem() {
      try{
        setTimeout(function() {
      msg.style.opacity = "1";
      msg.setAttribute('id', 'msg')
      msg.textContent=""
      }, 900);}
      catch(error){
        throw new Error("Erro inesperado, como chegou aqui?");
      }
  }
  
  //fim


  async function pesquisa() {
    if (input === '') {
      alert("Digite algum CEP!");
      return;
      }
      // verificação caso cep incompleto
      if(input.length <= 7){
        msg.textContent = 'CEP incompleto.'
        msg.setAttribute('id', 'erro')
        msg.style.color='yellow'
        exibirMensagem()
        return;
      }
     try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
   
      console.log(response.data);
      // verificação caso cep inexistente
      if (response.data.cep === undefined){
        try{
          main.style.display='none'
        msg.textContent = 'Verifique o CEP digitado.'
        msg.setAttribute('id', 'erro')
        msg.style.color='yellow'
        exibirMensagem();
        }
        catch(error){
         alert('You are a human?')
        }
        } else {
        try{ 
        main.style.display='flex'
        msg.textContent = 'CEP encontrado com sucesso!'
        msg.setAttribute('id', 'sucesso')
        msg.style.color='green'
        exibirMensagem()}
        catch(error){
          alert('You are a human?')
        }
      }
      setInput("");
    } catch (error) {
      try{
      main.style.display='none'
      //console.error(error); // Exibe o erro no console para depuração
      msg.textContent = 'Não pode haver caracteres especiais ou letras.'
       msg.setAttribute('id', 'erro')
       msg.style.color='rgb(255, 65, 44)'
       exibirMensagem()
       setInput("")
      }catch(error){
        alert('You are a human?')
      }
      }
      


  }
  
  // Evento de clique no icone de lupa
   function icon(){  
    pesquisa()};
  

  // Função para lidar com a tecla "Enter"
  
  // fim

 
 


  function copiar() {
    const dados = `${cep.cep}: ${cep.logradouro}, ${cep.bairro}, ${cep.localidade}-${cep.uf}`;

    navigator.clipboard.writeText(dados).then(() => {
      alert('Copiado para área de transferência');
    });
  }

  const spans = document.querySelectorAll('.animate');

  

// JSX com os elementos do componente App

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP🌎</h1>
      
      <span id='return'>
        <span id='msg' ></span>
        </span>
      
      <div className='containerInput' tabIndex={0}>
        
        <input
        id='cepInput'
        type='text'
        placeholder='Digite seu cep...'
        autoComplete='off'
        maxLength={8}
        value={input}
        onChange={(e) => setInput(e.target.value) } 
        />

        
        <button className='buttonSearch' onClick={icon} id='tecleEnter'>
          <FiSearch size={25} color=''/>
        </button>
      </div>

       <Mapa/>

            <main>
              <div onClick={copiar} className='copy'>
                <h2>{cep.cep}</h2>
                <span className='FiCopy'>
                    <FiCopy
                    size={14} 
                    color='#fff' 
                    >
                    </FiCopy>
                  </span>
                  </div>

                  <section>
                   
                    <span id='dados'>
                      <p>Rua</p>
                      <span id='rua' className="animate">{cep.logradouro}</span>
                    </span>
                  
                  <span id='dados'>
                    <p>Bairro</p>
                     <span id='bairro' className="animate">{cep.bairro}</span>
                  </span>
                  
                  <span id='dados'>
                    <p>Localidade</p>
                    <span id='local' className="animate">{cep.localidade}</span>
                  </span>
                  
                  <span id='dados'>
                    <p>UF</p>
                    <span className="animate">{cep.uf}</span>
                  </span>
                   
                </section>
            </main>
        </div>
  );
}

export default App;

