import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const HeaderStyle = styled.div`
    display: block;
    grid-area: HE;
    
    color: white;
    background-color: #3f3f3f;
  
    display: flex;
    align-self: center;
    align-items: center;

    height: 100%;
`;

export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    margin-left: 50px;
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