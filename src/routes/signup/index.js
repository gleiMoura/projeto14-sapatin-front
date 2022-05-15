import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from "react-router-dom";
import './styles.js';
import { Button, Input, Container, Body, TopBar, BodyContent, TopSection, Title, Login, DownArrow, BrandTitle } from './styles.js';
import axios from 'axios';

export default function PaginaSignup() {

    const { token, setToken } = useContext(UserContext);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    function registerUser() {
        
        const requisicao = axios.post("http://localhost:5000/signup", { nome, email, password, confirm});

        requisicao.then(tratarSucesso);
        requisicao.catch(tratarErro);

        function tratarSucesso(resposta) {
            console.log(resposta.status); // Ex: 404
            alert("Cadastro bem sucedido!");
            setNome("");
            setEmail("");
            setPassword("");
            setConfirm("");
            
          }

        function tratarErro(erro) {
            console.log("Status code: " + erro.response.status); // Ex: 404
              console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
          }
    }

    return(
        <Container>
            <Body>
                <TopBar>
                    <TopSection>
                        <Title>sapatin</Title>
                        <Link to="/">
                            <Login>
                                Voltar
                            </Login>
                        </Link>
                        <DownArrow>
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </DownArrow>                
                    </TopSection>
                </TopBar>  
                <BodyContent>
                    <Input placeholder='E-mail' type="email" value={email} onChange={e => setEmail(e.target.value)}></Input> 
                    <Input placeholder='Nome' type="text" value={nome} onChange={e => setNome(e.target.value)}></Input>
                    <Input placeholder='Senha' type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                    <Input placeholder='Confirme a senha' type="password" value={confirm} onChange={e => setConfirm(e.target.value)}></Input>
                    <Button onClick={registerUser}>Registrar</Button> 
                    <Link to="/login">
                        <BrandTitle>Já possui uma conta? Faça login!</BrandTitle>
                    </Link>                 
                </BodyContent>
            </Body>
        </Container>
    );
}