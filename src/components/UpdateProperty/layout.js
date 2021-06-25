import styled from "styled-components";
import { Form, Field as FormikField } from "formik";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    justify-content: center;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

export const CardCreateStyled = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    align-self: center;

    /* width: 600px;
    height: 90%; */

    /* margin-top: 5%;
    margin-bottom: 5%; */
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    border-radius: 10px;
`;

export const FormStyled = styled(Form)`
    display: grid;

    grid-template-columns: 50% 50%;
/* grid-template-rows: 80px auto 80px; */

    grid-template-areas: 
        "CA CA"
        "OP OP"
        "MP MP"
        "C1 C2"
        "BT BT"
    ;

    /* border: 2px solid black; */
    width: 100vh;
    height: 100%;
`;

export const LabelStyled = styled.label`
    display: none;
`;

export const LabelRadioStyled = styled.label`
    margin-left: 10px;
    margin-right: 10px;
    
    display: span;
`;

export const LabelOptionStyled = styled.label`
    display: block;
`;

export const ContainerGroupStyled = styled.div`
    /* width: auto; */  
    /* width:; */
    grid-area: ${props => props.gridArea};
    /* border: 1px solid red; */
`;

export const InputGroupStyled = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const InputRadioGroupStyled = styled.div`
    margin-bottom: 20px;
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
    
`;

export const Field = styled(FormikField)`
    display: flex;
    

    justify-content: center;
    align-items: center;
    align-self: center;
    margin: 10px 0px;
    padding: 10px;
    height: 45px;
    width: 90%;
    font-size: 45;
    background-color: #ECECEC;
    border-style: solid;
    border-radius: 5px;
`;

export const FilesStyled = styled.input`
    display: flex;
    

    justify-content: center;
    align-items: center;
    align-self: center;

    padding: 10px;
    height: 45px;
    width: 350px;
    font-size: 45;
    background-color: #ECECEC;
    border-style: solid;
    border-radius: 5px;
`;

export const ButtonStyled = styled.button`
    display: block;

    align-items: center;
    justify-content: center;
    align-items: center;
    align-self: center;


    background-color: white;

    width: 350px;
    height: 40px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
    margin: 10px auto;
`;