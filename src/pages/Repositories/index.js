import React, {useEffect, useState, repositoriesName} from 'react'; //sempre precisa importar
import * as S from './styled';
import { useNavigate} from 'react-router-dom';

export default function Repositories(){
    const navigate = useNavigate();
    const [repositories, setRepositories] = useState([]);

    useEffect(() => { //hook para capturar o ciclo de vida de variáveis alteradas
       let repositoriesName = localStorage.getItem('repositoriesName');
       console.log(repositoriesName);

       if (repositoriesName !== null){
           repositoriesName = JSON.parse(repositoriesName);
           setRepositories(repositoriesName);
           localStorage.clear();
       }else{
            navigate('/')
       }
    }, [navigate]);

    return( //S de style abaixo
        <S.Container>
            <S.Title>Repositórios</S.Title>
            <S.List>
                {repositories.map((repositories, index => <S.ListItem key={index}> Respositórios {repositories} </S.ListItem>))}
            </S.List>
            <S.LinkHome to= "/">Voltar</S.LinkHome>
        </S.Container>
        
    )
}