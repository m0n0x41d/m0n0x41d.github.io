import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { MediaQuery } from "@styles/mediaQuery";

const HeaderFadeIn = keyframes`
    from {
        transform: translateY(-50px);
        opacity: 0.01;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    width: 100%;
    height: var(--header-height, 80px);
    padding: 0 20px;
    z-index: 30;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--bg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    ${MediaQuery.min("md")} {
        padding: 0 40px;
    }
    
    /* Надежное позиционирование для всех языковых версий */
    ${MediaQuery.max("sm")} {
        padding: 0 15px;
        overflow: visible;
    }
`;

export const HeaderControls = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 40;
    
    /* Фиксированная ширина для контролов, чтобы предотвратить смещение */
    ${MediaQuery.max("sm")} {
        min-width: 120px;
        justify-content: flex-end;
    }
`;
