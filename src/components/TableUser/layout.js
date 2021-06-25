import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    justify-content: center;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const TableContainerStyled = styled.div`
    /* display: flex; */
    /* flex-direction: column; */

    /* justify-content: center;
    align-items: center;
    align-self: center; */
    
    width: 100%;
    height: 100%;

    /* margin-top: 5%;
    margin-bottom: 5%; */
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    /* border-radius: 10px; */
`;

export const PainelContainerStyled = styled.div`
    /* display: flex; */
    /* flex-direction: column; */

    /* justify-content: center;
    align-items: center;
    align-self: center; */
    width: 100%;
    height: 100%;

    /* margin-top: 5%;
    margin-bottom: 5%; */
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    /* border-radius: 10px; */
`;

export const RefreshStyled = styled.button`
    /* display: block; */
    width: 150px;
    height: 50px;
    color: black;
    font-size: 20px;
    padding: 10px;

    border-radius: 10px;
`;


export const LabelStyled = styled.label`
    display: none;
`;

export const LabelRadioStyled = styled.label`

    display: span;
`;

export const LabelOptionStyled = styled.label`
    display: block;
`;

export const InputGroupStyled = styled.div`
    margin-bottom: 20px;
    flex: flex;

    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const InputRadioGroupStyled = styled.div`
    margin-bottom: 20px;
    flex: flex;

    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const ErrorStyled = styled.div`
    color: var(--notification);
    text-align: center;
    margin-top: 2px;
    margin-bottom: 10px;
`;

export const WarningStyled = styled.div`
    color: var(--mention-detail);
    /* text-align: center; */
    display: flex;

    justify-content: center;
    align-items: center;
    align-self: center;


    width: 100%;
    margin-top: 2px;
    margin-bottom: 10px;
    
    border-style: solid;
    border-width: 5px;
    border-width: 5;
    border-color: black;

`;

export const ButtonStyled = styled.button`
`;