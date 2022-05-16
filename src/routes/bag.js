import { Container, Body, TopBar, BodyContent, SeparationBar, TopSection, Title, Login, DownArrow, Bag, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos } from '../../src/routes/paginainicial/styles.js';
import adidas from '../assets/adidas.png';
import colcci from '../assets/colcci.png';
import nike from '../assets/nike.png';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";
import dataContext from "../context/dataContext";

export default function ProductsBag() {
    const { idCategory } = useParams();
    const [products, setProducts] = useState([]);
    const { data } = useContext(dataContext);

    useEffect(() => {
        const requestion = axios.get(`http://localhost:5000/produtos/${idCategory}`);

        requestion.then(answer => {
            setProducts(answer.data);
            console.log(answer.data);
        })

        requestion.catch(err => {
            console.error(err.data);
        })
    }, [idCategory]);

    return (
        <Container>
            <Body>
                <TopBar>
                    <TopSection>
                        <Title><Link to={"/"}>sapatin</Link></Title>
                        <Login>
                            {(data.length > 0) ? <Link to={"/login"}>"Entrar"</Link> : data.name}
                        </Login>
                        <DownArrow>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </DownArrow>
                        <Bag>
                            <ion-icon name="bag-outline"></ion-icon>
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
                    <Products>
                        {products.map(element => {
                            return (
                                <div className="product">
                                    <img src={element.image} alt="produto" />
                                    <p>{element.name}</p>
                                    <p>Preço: {parseFloat(element.price).toFixed(2)}</p>
                                    <button onClick={() => {

                                    }}>Colocar na Sacola</button>
                                </div>
                            )
                        })}
                    </Products>
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

const Products = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
    .product{
        width: 200px;
        height: 300px;
        background-color: white;
        padding: 8px;
        flex-direction: column;
        margin: 20px;
        padding-bottom: 30px;
    }
    .product p{
        font-family: 'Roboto';
        font-size: 16px;
        color: #000;
    }
    .information{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    img{
        width: 150px;
        height: 200px;
    }
    button{
        width: 150px;
        height: 20px;
        background-color: #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
`