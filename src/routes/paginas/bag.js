import { Container, Body, TopBar, BodyContent, Login, SeparationBar, Bag, TopSection, Title, DownArrow, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos } from '../paginainicial/styles';
import adidas from '../../assets/adidas.png';
import colcci from '../../assets/colcci.png';
import dataContext from '../../context/dataContext';
import dayjs from "dayjs";
import nike from '../../assets/nike.png';
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';


export default function ProductsBag() {
    const { data } = useContext(dataContext);
    const navigate = useNavigate();
    const [bagProducts, setBagProducts] = useState([]);
    const [changePage, setChangePage] = useState(true);

    const profileProducts = bagProducts.map(element => {
        if (data.email === element.email) {
            return element;
        }
    });

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
                        <DownArrow>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </DownArrow>
                        <Login>
                            {(array.length > 0) ? <Link to="/profile">{data.name}</Link> : <Link to={"/login"}>Entrar</Link>}
                        </Login>
                        <DownArrow>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </DownArrow>
                        <Bag>
                            <ion-icon name="bag-outline" onClick={() => { setChangePage(true) }}></ion-icon>
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
                        <main className={changePage ? "pageOne" : "hide"}>
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
                            {productsNumber === 0 ? <p className='productP'>Sacola Vazia!</p> : <button className='ProductButton' onClick={() => {
                                const requestion = axios.post("http://localhost:5000/profile", {
                                    email: data.email,
                                    data: profileProducts,
                                    total: total,
                                    date: dayjs().format("DD/MM/YYYY")
                                });

                                requestion.then(answer => {
                                    console.log(answer.data);
                                });

                                requestion.catch(err => {
                                    console.error(err.data);
                                });

                                setChangePage(false);
                            }}>
                                Finalizar Compras
                            </button>}
                            {productsNumber === 0 ? "" : <p className='productTotal'> valor das compras: {total.toFixed(2)}</p>}
                        </main>

                        <main className={changePage ? "hide" : "pageTwo"}>
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
                                    axios.post("http://localhost:5000/end", {
                                        name,
                                        cep,
                                        street,
                                        city,
                                        state
                                    }).then(answer => {
                                        console.log(answer.data);
                                        alert("enviado!")
                                        navigate("/");
                                    }).catch(err => {
                                        alert("Problema ao enviar, tente novamente mais tarde!", err.data);
                                        console.error(err.data);
                                        setLoadButton(true);
                                        navigate("/register");
                                    })

                                    axios.delete("http://localhost:5000/bag", profileProducts).then(answer => {
                                        console.log(answer.data);
                                    }).catch(err => {
                                        console.error(err.data);
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
                        </main>
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
justify-content: space-around;
align-items: center;
    .pageTwo{
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
    }
    .hide{
        display: none;
    }
    .product{
        width: 200px;
        height: 300px;
        background-color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 50px;
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
        justify-content: center;
        display: flex;
        align-items: center;
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
        width: 220px;
        height: 50px;
        background-color: #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        margin: 50px
    }
    .productTotal{
        font-size: 20px;
        color: #000;
    }
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

