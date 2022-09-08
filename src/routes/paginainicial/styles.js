import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
  height: 100%;
	background-color: darkgray;
  position: absolute;
  top: 0;
  left: 0;
  a{
        text-decoration: none;
        color: #000;
  }	
`;

const Body = styled.div`
    width: 90%;
    height: 100%;
    overflow: scroll;
		bottom: 0;
		margin: auto;
		left: 0;
		right: 0;
    background-color: white;
`;

const TopBar = styled.div`
    position: fixed;
    width: 90%;
    height: 150px;
    background-color: white;
`;

const BodyContent = styled.div`
    width: 100%;
    margin-top: 150px;
`;

const SeparationBar = styled.div`
    width: 100%;
    height: 50px;
    background-color: #A58775;
    border: 1px solid black;
`;

const Ilustrations = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
		justify-content: center;
		align-items: center;
`;

const Inverno = styled.img`
    height: 400px;
    width: 100px;
`;

const IlustClothes = styled.img`
    height: 400px;
    width: 500px;
`;

const TopSection = styled.div`
    position: relative;
    height: 98px;
    width: 100%;
    border: 1px solid lightgrey; 
    display: flex;
`;

const Title = styled.div`
    line-height: 98px;
    margin-left: 50px;
    font-size: 35px;
    font-weight: bolder; 
`;

const Login = styled.div`
    font-size: 18px;
    line-height: 98px;
    text-align: center;
    margin-left: 200px;
    margin-right: 5px;
		position: absolute;
		top: 10px;
		right: 100px;
`;

const DownArrow = styled.div`
    height: 100px;
    line-height: 100px;
    font-size: 15px;
    margin-left: 3px;
    margin-top: 3px;
`;

const Bag = styled.div`
    font-size: 30px;
    line-height: 98px;
    text-align: center;
    margin-left: 50px;
    margin-top: 3px;
    cursor: pointer;
		position: absolute;
		right: 40px;
		top: 10px;
`;

const Categories = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
`;

const Category = styled.div`
    width: 100px;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    text-align: center; 
`;

const BrandTitle = styled.div`
    width: 90%;
    margin-left: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    text-decoration: underline;
`;

const BrandLogos = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-evenly;
`;

const BrandLogo = styled.img`
    height: 175px;
    width: 200px;
`;

const Infos = styled.div`
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    margin-left: 30px;
    color: gray; 
`;


export { Container, Body, TopBar, BodyContent, SeparationBar, Ilustrations, Inverno, IlustClothes, TopSection, Title, Login, DownArrow, Bag, Categories, Category, BrandTitle, BrandLogos, BrandLogo, Infos }