import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { MediaQuery } from "@styles/mediaQuery";
import { type Language } from "@utils/language";

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

export const HeaderStyled = styled.header<{
    $lang?: Language;
}>`
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
    /* Защита от смещений */
    transform: none !important;
    margin: 0 !important;

    ${MediaQuery.min("md")} {
        padding: 0 40px;
    }
    
    /* Надежное позиционирование для всех языковых версий */
    ${MediaQuery.max("sm")} {
        padding: 0 15px 0 20px;
        overflow: visible;
        box-sizing: border-box;
        width: 100vw;
        
        /* Специальные стили только для русской версии */
        ${props => props.$lang === 'ru' && `
            width: calc(100% - 15px) !important; /* Добавляем отступ справа для русской версии */
            overflow: hidden !important; /* Предотвращаем выход контента за пределы */
        `}
    }
`;

export const HeaderControls = styled.div<{
    $lang?: Language;
}>`
    display: flex;
    align-items: center;
    gap: 1rem;
    position: fixed !important;
    z-index: 100 !important;
    right: 20px !important;
    top: 15px !important;
    transform: none !important;
    margin: 0 !important;
    
    /* Фиксированная ширина для контролов, чтобы предотвратить смещение */
    ${MediaQuery.max("sm")} {
        min-width: 120px;
        justify-content: flex-end;
        
        /* Стандартное положение для английской версии */
        right: 10px !important;
        
        /* Специальные стили только для русской версии */
        ${props => props.$lang === 'ru' && `
            right: 25px !important; /* Увеличенный отступ справа для русской версии */
        `}
    }
`;
