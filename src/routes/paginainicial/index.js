import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './styles.js';
import { Container, Body, TopBar, BodyContent, SeparationBar, Ilustrations, Inverno, IlustClothes, TopSection, Title, Login, DownArrow, Bag, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos } from './styles.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ilustracao1 from '../../assets/ilustracao1.png';
import inverno from '../../assets/inverno.png';
import adidas from '../../assets/adidas.png';
import colcci from '../../assets/colcci.png';
import nike from '../../assets/nike.png';
import dataContext from "../../context/dataContext";

export default function PaginaInicial() {
    const { data } = useContext(dataContext);
    const array = [];
    if (data.token) {
        array.push(data);
    }

    console.log(`array:`, array, "data", data, data.token)
    return (
        <Container>
            <Body>
                <TopBar>
                    <TopSection>
                        <Title><Link to={"/"}>sapatin</Link></Title>
                        <Login>
                            {(array.length > 0) ? data.name : <Link to={"/login"}>Entrar</Link>}
                        </Login>
                        <DownArrow>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </DownArrow>
                        <Bag>
                            <Link to={"/bag"}><ion-icon name="bag-outline"></ion-icon></Link>
                        </Bag>
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
                    <Ilustrations>
                        <Inverno src={inverno} />
                        <IlustClothes src={ilustracao1} />
                    </Ilustrations>
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
    );
}