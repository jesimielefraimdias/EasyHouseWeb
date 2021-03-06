import styled from "styled-components";
import { Field } from "formik";
//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    justify-content: center;
    font-size: 20px;
    margin-top: 30px;
`;

export const CardProfileStyled = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    align-self: center;

    width: 600px;
    height: 90%;

    margin-top: 5%;
    margin-bottom: 5%;
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

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

    
    /* border: 1px solid black; */
    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;

`;

export const InputRadioGroupStyled = styled.div`
    margin-bottom: 20px;
    flex: flex;;
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

export const WarningStyled = styled.span`
    color: var(--mention-detail);
    /* display: flex; */

    margin-top: 2px;
    margin-bottom: 10px;
    
    /* justify-content: center;
    align-items: center;
    align-self: center; */


    /* width: 100%; */
    /* margin-top: 2px; */
    /* margin-bottom: 10px; */
/*     
    border-style: solid;
    border-width: 5px;
    border-width: 5;
    border-color: black; */

`;

export const ButtonStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;


    background-color: white;

    width: 350px;
    height: 40px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
    margin-top: 40px;
    margin-bottom: 15px;
`;

export const FieldStyled = styled(Field)`
    display: ${props => !!props.hidden ? "none" : "flex"};
    padding: 10px;
    height: 45px;
    width: 350px;
    font-size: 45;
    background-color: #ECECEC;
    border-style: solid;
    border-radius: 10px;
`;