import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO


export const SideBarStyled = styled.ul`
    grid-area: SB;
    display: flex;

    height: 100%; 
    background-color: #4B4276;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 50px 0;
`;

export const TitleStyled = styled.div`
     color: #FFF;
    text-transform: uppercase;
    text-align:center;
    font-size: 20px;
    margin-bottom: 20px;
    /* margin-left: 50px; */
    list-style: none;
`;

export const SBRoutesStyled = styled.li`
    /* color: var(--white); */
    display: block;
    text-decoration: none;
    box-sizing: border-box;
    list-style: none;
    /* height: 100px; */
    color: white;
    padding: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    border-top: 1px solid rgba(225,225,225,0.05);
    /* background-color: #4B4276; */
`;

export const LogoutStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;


    width: 50px;
    height: 30px;
    font-size: 15px;
    /* background-color: var(--secondary); */
    background-color: transparent;
    color: white;

    border-radius: 10px;

    margin-left: auto;
    margin-right: 40px;
`;