import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO


export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    justify-content: center;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 60px;
`;

export const CardForgotPasswordStyled = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 400px;
    height: 70%;
    padding: 10px;
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    border-radius: 10px;
`;

export const LabelStyled = styled.label`
    display: none;
`;

export const InputGroupStyled = styled.div`
    margin-bottom: 15px;
`;

export const ErrorStyled = styled.div`
    color: red;
    text-align: center;
    margin-top: 2px;
    margin-bottom: 10px;
`;

export const ButtonStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;

    width: 350px;
    height: 40px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
    margin-top: 40px;
    margin-bottom: 15px;
`;

export const LoginStyled = styled.div`
    
    display: block;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;

`;