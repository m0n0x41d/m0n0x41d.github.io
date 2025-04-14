import { Container } from "@components/Container";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const HeroStyled = styled.section`
    width: 100%;
    display: flex;
    background: ${Theme.bgElement};
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: relative;
    min-height: 80vh;

    padding: 100px 0;

    ${MediaQuery.max("lg")} {
        padding: 90px 0 0;
    }
`;

export const HeroText = styled.div<{
    $noImage?: boolean;
}>`
    display: flex;
    flex-direction: column;
    color: ${Theme.bgElementSecondary};
    padding-bottom: 10px;
    width: 100%;
    max-width: 500px;

    ${MediaQuery.max("lg")} {
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-bottom: 0;
        max-width: 100%;
    }

    ${(props) =>
        props.$noImage &&
        `
        text-align: center;
        justify-content: center;
        align-items: center;
    `}

    h1 {
        color: initial;
        font-size: 90px;
        line-height: 1.1;
        margin: 0 0 10px 0;
        word-break: break-word;
        position: relative;
        width: 100%;
        height: auto;
        min-height: 200px; /* Фиксированная минимальная высота */
        display: block; /* Гарантируем блочное отображение */
        
        ${MediaQuery.max("lg")} {
            font-size: 50px;
            margin-bottom: 15px;
            min-height: 120px; /* Меньшая высота для планшетов */
        }

        ${MediaQuery.max("sm")} { 
            font-size: 40px;
            line-height: 1.2;
            margin-bottom: 10px;
            min-height: 100px; /* Еще меньшая высота для мобильных */
        }
        
        &.second-line {
            margin-top: 0;
        }
        
        .typing-effect {
            display: inline-block;
            min-width: 80px;
            
            ${MediaQuery.max("lg")} {
                min-width: 60px;
            }
            
            ${MediaQuery.max("sm")} {
                min-width: 50px;
            }
        }
    }

    p {
        color: initial;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 20px;
        max-width: 500px;

        ${MediaQuery.max("lg")} {
            margin-bottom: 15px;
            max-width: 300px;

            br {
                display: none;
            }
        }
    }
    
    & > *:last-child {
         margin-bottom: 0;
    }

    .typing-effect {
        display: inline-block;
        position: static !important; /* Принудительно статическое позиционирование */
        color: ${Theme.tertiary};
        white-space: nowrap;
        vertical-align: baseline !important; /* Выравнивание по базовой линии */
        margin-left: 0.2em;
        min-height: auto;
        min-width: auto;
        
        /* Убираем фиксированную ширину для мобильной версии */
        ${MediaQuery.max("sm")} {
            display: inline-block;
            min-width: auto;
            width: auto;
            top: auto;
            left: auto;
            transform: none;
        }
        
        &::after {
            content: '|';
            position: absolute;
            right: -15px;
            bottom: 0;
            animation: blink 1s infinite;
            opacity: 1;
            font-weight: normal;
            height: 1em;
            line-height: 1;
            display: inline-block;
            position: static; 
            margin-left: 5px; 
        }
    }
    
    .hero-title-ru {
        font-size: 70px;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 20px;
        width: 100%;
        min-height: 170px;
        max-width: 100%;
        position: relative;
        
        .black-text {
            color: #000 !important;
        }
        
        .line-one, .line-two {
            display: block;
            white-space: nowrap;
        }
        
        .line-one {
            margin-bottom: 10px;
            display: flex; 
            position: relative;
            width: 100%;
            
            .typing-container {
                position: relative;
                display: inline-block;
                margin-left: 10px;
                color: ${Theme.tertiary};
            }
            
            span.typing-effect {
                display: inline;
                color: ${Theme.tertiary};
                white-space: nowrap;
                min-width: auto;
                width: auto;
                position: static;
                overflow: visible;
            }
            
            .caret {
                display: inline;
                color: ${Theme.tertiary};
                font-weight: normal;
                animation: blink 1s infinite;
                position: static;
                
                &.hidden {
                    opacity: 0;
                }
            }
        }
        
        span {
            color: ${Theme.tertiary};
            
            &.black-text {
                color: #000 !important;
            }
        }
        
        ${MediaQuery.max("lg")} {
            font-size: 50px;
            margin-bottom: 15px;
            min-height: 130px;
            
            .line-one {
                margin-bottom: 5px;
            }
        }
        
        ${MediaQuery.max("sm")} { 
            font-size: 40px;
            line-height: 1.1;
            margin-bottom: 10px;
            min-height: 110px;
        }
    }

    .title-line {
        display: block;
        position: relative;
        padding-left: 0;
        line-height: 1.2;
        overflow: visible;
        min-height: 100px; /* Фиксированная высота */
        width: 100%;
        
        /* Обновляем стили для первой строки */
        &:first-of-type {
            margin-bottom: 0;
            display: block; /* Блочное отображение вместо flex */
            min-height: 100px;
            
            ${MediaQuery.max("lg")} {
                min-height: 60px;
            }
            
            ${MediaQuery.max("sm")} {
                min-height: 50px;
            }
        }
        
        &:last-of-type {
            min-height: 100px;
            
            ${MediaQuery.max("lg")} {
                min-height: 60px;
            }
            
            ${MediaQuery.max("sm")} {
                min-height: 50px;
            }
        }
    }

    .hero-title-ru .typing-effect::after {
        display: none;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }

    span:not(.typing-effect) {
        color: ${Theme.tertiary};
        transition: color 0.3s ease;
    }

    /* Удаляем все конфликтующие стили */
    .typing-effect-visible::after {
        display: none;
    }

    .typing-effect-ru {
        display: none;
    }
`;

export const ContainerStyled = styled(Container)`
    justify-content: center;
`;

export const HeroGrid = styled.div<{
    $noImage?: boolean;
}>`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    gap: 100px;

    ${MediaQuery.max("lg")} {
        grid-template-columns: 1fr;
        gap: 10px;
        padding: 0 15px;
    }

    ${(props) =>
        props.$noImage &&
        `
        display: flex;
    `}

    figure {
        position: relative;
        width: 100%;
        margin: 0;

        img {
            width: 100%;
            max-width: 550px;
            height: auto;
            object-fit: contain;
            display: block;
            margin: 0 auto;
        }

        ${MediaQuery.max("lg")} {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: auto;
            padding-top: 10px;

            img {
                 max-width: 350px;
            }
        }
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 5px;
    
    ${MediaQuery.max("lg")} {
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }
`;
