import styled from "styled-components";

//TW - To Work
//Content User - CU
//Content Loan - CL
//Content Adress - CA



export const ContainerToWorkStyled = styled.div`
    grid-area: TW;

    display: grid;
    grid-template-columns: 50% 50%;

    grid-template-areas: 
        "TL TL"
        "C1 C2"
    ;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

/*
    TL - Title
    C1 - Content 1
    C2 - Content 2
    AI - About the idea
    IT - Idea Text
    */

export const ContainerStyled = styled.div`
    text-align: justify;
    width: 90%;
    margin: 5px 0;
    border: 1px solid red;
`;

export const ContainerLeftStyled = styled.div`
    grid-area: C1;
    display: ${props => props.display};
    flex-direction: column;
    align-items: center;
    padding: 0 15px;    
`;

export const ContainerRightStyled = styled.div`
    grid-area: C2;
    display: ${props => props.display};
    flex-direction: column;
    align-items: center;    
    padding: 0 15px;    
`;

export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    justify-content: center;
    text-align: start;
    font-size: 18px;
    margin: 20px 25px;
    grid-area: TL;
`;

export const WarningStyled = styled.span`
    color: var(--mention-detail);
    /* display: flex; */

    margin-top: 2px;
    margin-bottom: 10px;
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
    background-color: ${props => props.backgroundColor || "var(--secondary)"};

    border-radius: 10px; 
    margin: 10px;
`;

export const UlStyled = styled.ul`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    list-style-type: none;
`;

export const LiStyled = styled.li`
    margin: 10px 0;
`;