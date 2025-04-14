import { Container } from "@components/Container";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

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
    height: 450px;

    ${MediaQuery.max("lg")} {
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-bottom: 0;
        max-width: 100%;
        height: 400px;
    }

    ${MediaQuery.max("sm")} { 
        height: 350px;
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
        word-break: keep-all;
        white-space: nowrap;
        position: relative;
        width: 100%;
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        
        ${MediaQuery.max("lg")} {
            font-size: 50px;
            margin-bottom: 15px;
            height: 140px;
        }

        ${MediaQuery.max("sm")} { 
            font-size: 40px;
            line-height: 1.2;
            margin-bottom: 10px;
            height: 120px;
            white-space: nowrap;
        }
        
        &.second-line {
            margin-top: 0;
        }
        
        .typing-effect {
            display: inline-block;
            min-width: 80px;
            white-space: nowrap;
            
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
        position: static !important;
        color: ${Theme.tertiary};
        white-space: nowrap;
        vertical-align: baseline !important;
        min-height: auto;
        min-width: auto;
        
        ${MediaQuery.max("sm")} {
            margin-left: -1.2em;
        }
        
        &::after {
            display: none;
        }
    }
    
    .caret {
        color: ${Theme.tertiary};
        font-weight: normal;
        animation: ${blink} 1s infinite;
    }
    
    .hero-title-ru {
        font-size: 70px;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 20px;
        width: 100%;
        height: 170px;
        max-width: 100%;
        position: relative;
        
        .black-text {
            color: #000 !important;
        }
        
        .line-one, .line-two {
            display: block;
            white-space: nowrap;
        }

        .line-two {
            ${MediaQuery.max("sm")} {
                margin-left: 0;
                text-align: center;
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 5px;
            }
        }
        
        .line-one {
            margin-bottom: 10px;
            display: flex; 
            position: relative;
            width: 100%;
            white-space: nowrap;
            
            ${MediaQuery.max("sm")} {
                margin-left: 1em;
                width: calc(100% - 2em);
                box-sizing: border-box;
                overflow: visible;
            }
            
            .typing-container {
                position: relative;
                display: inline-block;
                margin-left: 20px;
                color: ${Theme.tertiary};
                white-space: nowrap;
                
                ${MediaQuery.max("sm")} {
                    margin-left: 0px;
                    font-size: 40px;
                    vertical-align: baseline;
                }
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
            height: 130px;
            
            .line-one {
                margin-bottom: 5px;
            }
        }
        
        ${MediaQuery.max("sm")} { 
            font-size: 40px;
            line-height: 1.1;
            margin-bottom: 10px;
            height: 110px;
        }
    }

    .title-line {
        display: block;
        position: relative;
        padding-left: 0;
        line-height: 1.2;
        overflow: visible;
        width: 100%;
        white-space: nowrap;

        ${MediaQuery.max("sm")} {
            white-space: normal;
            margin-left: 10px;
            padding-top: 10px;
            margin-bottom: 10px;

        }
        
        .typing-container {
            position: relative;
            display: inline-block;
            margin-left: 10px;

            ${MediaQuery.max("sm")} {
                margin-left: 5px;
            }

            ${MediaQuery.max("lg")} {
                margin-left: 0px;
            }
            
            .typing-effect {
                position: relative;
                color: ${Theme.tertiary};

                ${MediaQuery.max("sm")} {
                    margin-left: -35px;
                }
            }
            
            .caret {
                color: ${Theme.tertiary};
                animation: blink 1s infinite;
                font-weight: normal;
                height: 100%;
            }
        }
        
        &:first-of-type {
            margin-bottom: 0;
            display: block;
            height: 100px;
            white-space: nowrap;
            
            ${MediaQuery.max("lg")} {
                height: 60px;
            }
            
            ${MediaQuery.max("sm")} {
                height: 50px;
            }
        }
        
        &:last-of-type {
            height: 100px;
            
            ${MediaQuery.max("lg")} {
                height: 60px;
            }
            
            ${MediaQuery.max("sm")} {
                height: 50px;
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
        padding: 0 25px;
    }

    ${MediaQuery.max("sm")} {
        padding: 0 30px;
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

export const DescriptionContainer = styled.div<{
    $lang?: 'en' | 'ru';
}>`
    max-width: 500px;
    width: 100%;
    margin-bottom: 20px;
    
    ${props => props.$lang === 'ru' && `
    `}
    
    ${props => props.$lang === 'en' && `
    `}
    
    ${MediaQuery.max("lg")} {
        max-width: 100%;
        text-align: center;
        padding: 0 15px;
        
        ${props => props.$lang === 'ru' && `
        `}
        
        ${props => props.$lang === 'en' && `
        `}
    }
    
    ${MediaQuery.max("sm")} {
        padding: 0 20px;
        max-width: 95%;
        margin: 0 auto 20px;
        
        ${props => props.$lang === 'ru' && `
            padding: 0 15px;
            max-width: 100%;
        `}
        
        ${props => props.$lang === 'en' && `
        `}
    }
    
    div {
        color: initial;
        font-size: 14px;
        line-height: 20px;
        
        /* Русская версия текста */
        ${props => props.$lang === 'ru' && `
            /* Стили для русского текста */
            font-size: 14px;
            line-height: 20px;
        `}
        
        ${props => props.$lang === 'en' && `
            /* Стили для английского текста */
            font-size: 14px;
            line-height: 20px;
        `}
        
        ${MediaQuery.max("sm")} {
            ${props => props.$lang === 'ru' && `
                font-size: 13px;
                line-height: 18px;
            `}
            
            ${props => props.$lang === 'en' && `
                font-size: 13px;
                line-height: 18px;
            `}
        }
    }
`;
