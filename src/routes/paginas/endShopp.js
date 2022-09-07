import { Container, Body, TopBar, BodyContent, SeparationBar, TopSection, Title, Categories, Category, Infos } from '../paginainicial/styles';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import axios from "axios";

export default function EndShopp() {
    const navigate = useNavigate();

    // inputs states to finish shopp
    const [street, setStreet] = useState("");
    const [name, setName] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");


    //State to show the button loading
    const [loadbutton, setLoadButton] = useState(true);

    return (
        <Container>
            <Body>
                <TopBar>
                    <TopSection>
                        <Title><Link to={"/"}>sapatin</Link></Title>
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
                        <input type="text" id='cep' placeholder='cep' required onChange={(e) => setCep(e.target.value)} />
                        <input type="text" id='street' placeholder='Rua' required onChange={(e) => setStreet(e.target.value)} />
                        <input type="text" id="city" placeholder='cidade' required onChange={(e) => setCity(e.target.value)} />
                        <input type="text" id="state" placeholder='Estado' required onChange={(e) => setState(e.target.value)} />

                        <button className={loadbutton ? "" : "hide"} onClick={() => {
                            if (!name || !cep || !street || !city || !state) {
                                alert("Preecha todos os campos!");
                                navigate("/endShopp")
                            } else {
                                setLoadButton(false)
                                const requestion = axios.post("http://localhost:5000/end", {
                                    name,
                                    cep,
                                    street,
                                    city,
                                    state
                                });
                                requestion.then(answer => {
                                    console.log(answer.data);
                                    alert("enviado!")
                                    navigate("/");
                                })
                                requestion.catch(err => {
                                    alert("Problema ao enviar, tente novamente mais tarde!", err.data);
                                    console.error(err.data);
                                    setLoadButton(true);
                                    navigate("/register");
                                })
                            }
                        }}>Enviar Dados</button>

                        <button className={loadbutton ? "hide" : "loading"}>
                            <ThreeDots
                                height="80"
                                width="80"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button>
                    </Registerstyle>
                    <SeparationBar />
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
        font-family: 'Roboto';
        font-size: 20px;
        border-radius: 5px;
        color: #000;
    }
    input:placeholder-shown{
        font-family: 'Roboto';
    }
    button{
        width: 326px;
        height: 58px;
        background-color: #000;
        border-radius: 5px;
        margin-bottom: 25px;
        cursor: pointer;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 20px;
        color: white;
        border: none;
    }
    p{
        font-family: 'Roboto';
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