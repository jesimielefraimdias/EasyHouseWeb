import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const Layout = styled.div`
    display: grid;

    grid-template-columns: 200px auto;
    /* grid-template-rows: 80px auto 80px; */

    grid-template-areas: 
        "SB CO CO CO"
        "SB CO CO CO"
        "SB CO CO CO"
    ;


    height: 100vh;
    
`;

export const ContentStyled = styled.div`
    grid-area: CO;

    display: flex;


    /* flex-direction: row; */
    justify-content: center;
    align-items: center;
    align-self: center;

    height: 100%;
`;

export const Label = styled.label`
    display: none;
`;

export const TitleStyled = styled.div`
    color: white;
    font-size: 15px;
    margin-left: 50px;
`;
