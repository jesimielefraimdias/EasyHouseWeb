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

export const CardCreateStyled = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    align-self: center;

    width: 100%;
    height: 95%;

    margin-top: 5%;
    margin-bottom: 5%;
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    border-radius: 10px;
`;

