
import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import {FiCopy} from 'react-icons/fi';
import './App.css';
import api from './services/api.js';


function App() {



  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  
  async function Btn(){
    if(input === ''){
    alert("Digite algum CEP!")
      return;
    }try{
      const response = await api.get(`${input}/json`)
      if(response.data == 'true'){ 
        alert('erro na busca.')
      }
      setCep(response.data)
      console.log(response.data)
      setInput("")
      
     
    }catch{
        alert("Erro na busca.")
       
         }
  }
        
   

    function copiar(){
       const dados = `${cep.cep}: ` + `${cep.logradouro},` + ` ${cep.bairro},` 
       + ` ${cep.localidade}-` + `${cep.uf}`;

       navigator.clipboard.writeText(dados).then(() =>{
        alert('Copiado para área de transferência')
       }
       )
    }

   



  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>

      <div className='containerInput'>
        <input
      
        type='text'
        placeholder='Digite seu cep...'
        autoComplete='off'
        maxLength={8}
        value={input}
        onChange={(e) => setInput(e.target.value) } 
        />

        
        <button className='buttonSearch' onClick={Btn}>
          <FiSearch size={25} color=''/>
        </button>
      </div>

   
            <main >
            
                <h2>{cep.cep}</h2>
                <section>
                
                      
                  <span id='rua'>{cep.logradouro}</span>
                  <span id='bairro'>{cep.bairro}</span>
                  <span id='local'>{cep.localidade}
                  {cep.uf}</span> 
                  <span 
                  className='copy'>
                    <FiCopy
                    size={15} 
                    color='#fff' 
                    onClick={copiar}>
                    </FiCopy>
                  </span>
        </section>
            </main>
        </div>
  );
}

export default App;

