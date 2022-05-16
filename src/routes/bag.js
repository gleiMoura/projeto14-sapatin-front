import { Container, Body, TopBar, BodyContent, SeparationBar, TopSection, Title, DownArrow, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos } from '../../src/routes/paginainicial/styles.js';
import adidas from '../assets/adidas.png';
import colcci from '../assets/colcci.png';
import nike from '../assets/nike.png';
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";
import dataContext from "../context/dataContext";
import { useNavigate } from 'react-router-dom';


export default function ProductsBag() {
    const { data } = useContext(dataContext);
    const [bagProducts, setBagProducts] = useState([]);
    const navigate = useNavigate();
    let productsNumber = 0;
    let total = 0;
    const array = [];
    if (data) {
        array.push(data);
    }

    useEffect(() => {
        const requestion = axios.get(`http://localhost:5000/bag`, { email: data.email });

        requestion.then(answer => {
            setBagProducts(answer.data);
            console.log(answer.data);
        })

        requestion.catch(err => {
            console.error(err.data);
        })
    }, []);

    console.log(data.email)

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
                    <Products>
                        {bagProducts.map(element => {
                            if (data.email === element.email) {
                                productsNumber++;
                                if (parseFloat(element.price).toFixed(2) !== NaN) {
                                    total += parseFloat(element.price)
                                }
                                return (
                                    <div className="product">
                                        <div class="image">
                                            <img src={element.image} alt="produto" />
                                            <p>{element.name}</p>
                                            <p>tamanho: {element.size}</p>
                                        </div>
                                        <p>Preço: {parseFloat(element.price).toFixed(2)}</p>
                                        <p>Data do pedido: {element.date}</p>
                                    </div>
                                )
                            }
                        })}
                        {productsNumber === 0 ? <p className='productP'>Você não fez nenhuma compra no site ainda!</p> : <button className='ProductButton' onClick={() => { navigate("/endShopp"); }}>Finalizar Compras</button>}
                        {productsNumber === 0 ? "" : <p> valor das compras: {total.toFixed(2)}</p>}
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
        </Container >
    )
}

const Products = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
    .product{
        width: 200px;
        height: 300px;
        background-color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 50px 0;
    }
    .product p{
        font-family: 'Roboto';
        font-size: 16px;
        color: #000;
        margin: 0 20px;
    }
    .information{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .productP{
        width: 400px;
        height: 50px;
        margin: 100px 0;
        background-color: #000;
        color: #fff;
        padding: 10px;
        font-size: 20px;
        border-radius: 5px;
    }
    .image{
        width: 200px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: 1px #000 solid;
        padding: 5px;
    }
    .image p{
        margin-top: 20px;
        width: 90px;
        text-align: center;
    }
    img{
        width: 150px;
        height: 200px;
        margin: 0 20px;
    }
    button{
        width: 150px;
        height: 20px;
        background-color: #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        margin: 50px
    }
`