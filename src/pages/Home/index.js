//o projeto é um formulário que receberá um campo de texto e terá um botão. O formulário receberá o usuário do github que buscará
//os repositórios do usuário

import React, {useState, repositoriesName} from 'react';
import axios from 'axios';
import * as S from './styled';
import {useNavigate} from 'react-router-dom';

//useState para citar e modificar estados.

export default function App() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(''); 
  const [erro, setErro] = useState (false);
  
  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => { 
    const repositories = response.data; //retorna um objeto com as info solicitadas
    
    const repositoriesName=[]; //uma nova variável para receber este array

    repositories.forEach((repository) => //leva o nome dos repositórios ao repositoriesName, ao invés de toda a info do usuário
     repositoriesName.push(repository.name)
    );

    localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName)); //armazena o array com o nome dos repositórios. JSON.stringify transforma em string.
    //para ver isto no console, ir em aplicativos > armazenamento local > nossa url
    setErro(false);
    navigate('/repositories'); //nos envia para repositories
  })
  .catch(err => //o then é usado quando o valor boleano dá certo e o catch quando dá errado
    setErro(true)
  );
}
    return (
    //para retornar apenas um fragmento/sempre que quiser conter vários elementos
    //para serem retornados dentro de um elemento, mas não quer que fique dentro de uma tag específica <> </>//    
    
     <S.HomeContainer>
    <S.Content>
      <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} 
      onChange={e => {setUsuario(e.target.value); setErro(false)}} />
      <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
    </S.Content>
      {erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente!</S.ErrorMsg>: '' }
</S.HomeContainer>
   
  );
  }