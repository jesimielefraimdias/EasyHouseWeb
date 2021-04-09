import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const Layout = styled.div`
    display: grid;

    /* grid-template-columns: auto auto auto; */
    grid-template-rows: 90px auto 70px;

    grid-template-areas: 
        "HE"
        "CO"
        "FO"
    ;


    height: 100vh;
    
`;

export const ContentStyled = styled.div`
    grid-area: CO;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #C4B2D1;

    height: 100%;
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