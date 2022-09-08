import { Container, Body, TopBar, BodyContent, SeparationBar, TopSection, Title, Login, DownArrow, Bag, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos } from '../paginainicial/styles';
import adidas from '../../assets/adidas.png';
import colcci from '../../assets/colcci.png';
import nike from '../../assets/nike.png';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";
import dataContext from "../../context/dataContext";
import { useNavigate } from 'react-router-dom';


export default function SpecificCategory() {
    const navigate = useNavigate();
    const { idCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [select, setSelect] = useState('40')
    const { data } = useContext(dataContext);

    const token = data.token;
    const array = [];
    if (data.token) {
        array.push(data);
    }


    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const requestion = axios.get(`https://sapatin.onrender.com/produtos/${idCategory}`);

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
                            {(array.length > 0) ? <Link to="/profile">{data.name}</Link> : <Link to={"/login"}>Entrar</Link>}
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
                    <Products>
                        {products.map(element => {
                            return (
                                <div className="product">
                                    <img src={element.image} alt="produto" />
                                    <p>{element.name}</p>
                                    <p>Preço: {parseFloat(element.price).toFixed(2)}</p>
                                    <div className='size'>
                                        <p>Tamanho: </p>
                                        <select onChange={e => setSelect(e.target.value)}>
                                            <option value="40">40</option>
                                            <option value="39">39</option>
                                            <option value="38">38</option>
                                            <option value="37">37</option>
                                            <option value="36">36</option>
                                            <option value="35">35</option>
                                            <option value="34">34</option>
                                        </select>
                                    </div>
                                    <button onClick={() => {
                                        if (array.length > 0) {
                                            console.log({ name: element.name, size: select })
                                            const requestion = axios.post("https://sapatin.onrender.com/bag", { name: element.name, size: select }, config);
                                            requestion.then(answer => {
                                                console.log(answer.data);
                                                alert("Produto adicionado à sacola!")
                                            })
                                            requestion.catch(err => {
                                                console.error(err.data);
                                            })
                                        } else {
                                            navigate("/login");
                                            alert("Faça login para aproveitar o site!!!")
                                        }
                                    }}>Colocar na Sacola</button>
                                </div>
                            )
                        })}
                    </Products>
                    <SeparationBar />
                    <BrandTitle>GRANDES MARCAS, PEQUENOS PREÇOS</BrandTitle>
                    <BrandLogos>
                        <Link to={"/category/adidas"}>
                            <BrandLogo src={adidas} />
                        </Link>
                        <Link to={"/category/vans"}>
                            <BrandLogo src={colcci} />
                        </Link>
                        <Link to={"/category/nike"}>
                            <BrandLogo src={nike} />
                        </Link>
                    </BrandLogos>
                    <Infos>By Gleison Moura e Gabriel Hoelzle, Driven 2022</Infos>
                </BodyContent>
            </Body>
        </Container>
    )
}

const Products = styled.div`
display: grid;
grid-template-columns: 300px 300px;
justify-content: space-around;
margin: 50px 20%;
    .product{
        width: 200px;
        height: 350px;
        background-color: white;
        padding: 8px;
        flex-direction: column;
        margin: 50px;
        padding-bottom: 30px;
    };
    .product p{
        font-family: 'Roboto';
        font-size: 16px;
        color: #000;
    };
    .size{
        display: flex;
        margin: 20px 0;
    };
    .size p{
        margin-right: 20px;
    }
    img{
        width: 150px;
        height: 200px;
    };
    button{
        width: 150px;
        height: 20px;
        background-color: #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    };
`