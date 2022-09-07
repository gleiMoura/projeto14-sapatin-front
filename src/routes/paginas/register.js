import { Container, Body, TopBar, BodyContent, SeparationBar, TopSection, Title, DownArrow, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos } from '../paginainicial/styles';
import adidas from '../../assets/adidas.png';
import colcci from '../../assets/colcci.png';
import nike from '../../assets/nike.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

    // inputs states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    //State to show the button loading
    const [loadbutton, setLoadButton] = useState(true);

    return (
        <Container>
            <Body>
                <TopBar>
                    <TopSection>
                        <Title><Link to={"/"}>sapatin</Link></Title>
                        <DownArrow>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </DownArrow>
                    </TopSection>
                    <Categories>
                        <Category>
                            <Link to={"/category/masculino"}>
                                MASCULINO
                            </Link>
                        </Category>
                        <Category>
                            <Link to={"/category/feminino"}>
                                FEMININO
                            </Link>
                        </Category>
                        <Category>
                            <Link to={"/category/infantil"}>
                                INFANTIL
                            </Link>
                        </Category>
                    </Categories>
                </TopBar>
                <BodyContent>
                    <SeparationBar />
                    <Registerstyle>
                        <input type="text" id="name" placeholder='nome' required onChange={(e) => setName(e.target.value)} />
                        <input type="email" id='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" id="password" placeholder='senha (6 dígitos)' required onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" id="secondPassword" placeholder='senha (6 dígitos)' required onChange={(e) => setSecondPassword(e.target.value)} />

                        <button className={loadbutton ? "" : "hide"} onClick={() => {
                            if (!name || !email || !password || !secondPassword) {
                                alert("Preecha todos os campos!");
                                navigate("/register")
                            } else if (password !== secondPassword) {
                                alert("As duas senhas devem ser iguais!");
                                navigate("/register")
                            } else {
                                setLoadButton(false)
                                const requestion = axios.post("http://localhost:5000/register", {
                                    name: name,
                                    email: email,
                                    password: password
                                });
                                requestion.then(answer => {
                                    console.log(answer.data);
                                    alert("Usuário criado com sucesso!")
                                    navigate("/login");
                                })
                                requestion.catch(err => {
                                    alert("dados inválidos!", err.data);
                                    console.error(err.data);
                                    setLoadButton(true);
                                    navigate("/register");
                                })
                            }
                        }}>Cadastrar</button>

                        <button className={loadbutton ? "hide" : "loading"}>
                            <ThreeDots
                                height="80"
                                width="80"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button>

                        <p>
                            <Link to="/login">
                                Já tem conta? Entre agora!
                            </Link>
                        </p>
                    </Registerstyle>
                    <SeparationBar />
                    <BrandTitle>GRANDES MARCAS, PEQUENOS PREÇOS</BrandTitle>
                    <BrandLogos>
                        <BrandLogo src={adidas} />
                        <BrandLogo src={colcci} />
                        <BrandLogo src={nike} />
                    </BrandLogos>
                    <Infos>By Gleison Moura e Gabriel Hoelzle, Driven 2022</Infos>
                </BodyContent>
            </Body>
        </Container>
    )
}

const Registerstyle = styled.div`
padding: 100px 0;
display: flex;
flex-direction: column;
align-items: center;
background-color: #fff;
    .hide{
        display: none;
    }
    header{
        margin-top: 160px;
        margin-bottom: 24px;
    }
    form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    input{
        width: 326px;
        height: 58px;
        background-color: #FFF;
        border: 1px solid #D4D4D4;
        padding: 10px;
        text-align: left;
        margin-bottom: 13px;
        font-family: 'Raleway';
        font-size: 20px;
        border-radius: 5px;
        color: #000;
    }
    input:placeholder-shown{
        font-family: 'Raleway';
    }
    button{
        width: 326px;
        height: 46px;
        background-color: #000;
        border-radius: 5px;
        margin-bottom: 25px;
        cursor: pointer;
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 20px;
        color: white;
        border: none;
    }
    p{
        font-family: 'Raleway';
        font-size: 14px;
        color: #000;
        cursor: pointer;
    }
    a{
        text-decoration: none;
        color: #000;
    }
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        border: 1px solid rgb(140, 17, 190);
    }
`