import styled from "styled-components";

//Header - HE
//Side Bar- SB
//Content - CO
//Footer - FO

export const Layout = styled.div`
    display: grid;

    /* grid-template-columns: auto auto auto; */
    grid-template-rows: 100px auto 100px;

    grid-template-areas: 
        "HE"
        "CO"
        "FO"
    ;


    height: 100vh;
    
`;

export const HeaderStyle = styled.div`
    grid-area: HE;

    display: flex;
    justify-content: center;
    align-self: center;
`;

export const ContentStyle = styled.div`
    grid-area: CO;

    display: flex;


    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-style: solid;
    border-width: 5px;
    border-width: 5;
    border-color: black;

    height: 100%;
`;

export const CardLoginStyle = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    width: 500px;
    height: 300px;
    padding: 10px;

    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    border-color: black;
`;

export const Label = styled.label`
    display: none;
`;

export const FooterStyle = styled.div`
    grid-area: FO;

    background-color: #3f3f3f;
    
    display: flex;
    align-self: center;
    align-items: center;

    height: 100%;

`;

export const TitleStyled = styled.div`
    color: white;
    font-size: 15px;
    margin-left: 50px;
`;
