import { Social } from "@components/Social";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";
import { type Language } from "@utils/language";

export const HamburgerMenuStyled = styled.div<{
    $isOpen: boolean;
    currentLang?: Language;
}>`
    /* Селективная изоляция от влияния других стилей */
    position: static !important;
    z-index: 10000 !important;
    isolation: isolate !important;
    display: block;
    box-sizing: border-box;
    
    /* Предотвращаем влияние других элементов */
    transform: none !important;
    margin: 0 !important;
    padding: 0 !important;
    width: auto !important;
    max-width: none !important;
    
    /* Восстанавливаем шрифты */
    font-family: inherit;
    font-size: inherit;
    color: inherit;
`;

export const Navigation = styled.nav<{
    $isOpen: boolean;
}>`
    transform: translateX(100%);
    color: ${Theme.textDefault};
    background: ${Theme.bgElementSecondary};
    height: 100vh;
    transition: transform 0.3s ease-in-out;
    position: fixed;
    top: 0;
    right: 0;
    overflow: auto;
    padding: 200px 20px 50px;
    z-index: 49;
    /* Правильные шрифты для меню */
    font-family: inherit;
    font-size: inherit;

    ${MediaQuery.min("lg")} {
        width: 40vw;
    }

    ${MediaQuery.max("lg")} {
        padding-top: 100px;
        width: 100%;
    }

    ${({ $isOpen }) =>
        $isOpen &&
        css`
            transform: translateX(0);
        `}

    ul {
        padding: 0;
        margin: 0;

        li {
            list-style: none;
            font-family: inherit;
            font-weight: 700;
            cursor: pointer;

            margin-bottom: 20px;
            font-size: 30px;
            line-height: 30px;

            ${MediaQuery.max("lg")} {
                font-size: 16px;
                line-height: 18px;
            }

            a {
                font-family: inherit;
                transition: color 0.3s;
                text-decoration: none;
                color: inherit;
                &:hover {
                    color: ${Theme.tertiary};
                }
            }
        }

        li:last-of-type {
            margin-bottom: 0;
        }
    }
`;

export const HamburgerMenuButton = styled.button<{
    $isOpen: boolean;
    currentLang?: Language;
}>`
    box-sizing: border-box;
    cursor: pointer;
    
    /* Основные стили */
    background: ${Theme.bgElementSecondary};
    position: relative;
    z-index: 10001 !important;
    display: block;
    margin-left: 10px;

    color: ${Theme.textDefault};
    border-radius: 50%;
    transition: background 0.3s, border-color 0.3s, color 0.3s;

    border: 1px solid ${Theme.textDefault};
    width: 55px !important;
    height: 55px !important;
    
    /* Защита от внешних влияний */
    transform: none !important;
    
    /* Восстанавливаем шрифты */
    font-family: inherit;
    
    ${MediaQuery.max("sm")} {
        /* Базовые стили для обоих языков */
        margin-right: 0px;
        
        /* Специальные стили только для русской версии */
        ${props => props.currentLang === 'ru' && `
            // margin-right: 15px; /* Увеличиваем отступ для русской версии */
            margin-left: 0px;
        `}
    }
    
    ${({ $isOpen }) =>
        $isOpen &&
        css`
            border-color: transparent;
            background: ${Theme.primary};
            color: ${Theme.bgElementSecondary};
        `}
`;

export const HamburgerMenuButtonLine = styled.span<{
    $isOpen: boolean;
}>`
    background: ${Theme.bgElement};
    position: absolute;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    transition: transform 0.3s, background 0.3s, top 0.3s;
    pointer-events: none;

    width: 30px;
    height: 3px;

    ${MediaQuery.max("lg")} {
        width: 20px;
        height: 2px;
    }

    ${({ $isOpen }) =>
        $isOpen
            ? css`
                  background: ${Theme.bgElementSecondary};
                  transform: translate(-50%, -50%) rotate(45deg);
                  top: 50%;
              `
            : css`
                  top: calc(50% - 6px);
              `}

    &:not(:first-of-type) {
        ${({ $isOpen }) =>
        $isOpen
            ? css`
                      transform: translate(-49%, -50%) rotate(-45deg);
                      top: 50%;
                  `
            : css`
                      top: calc(50% + 6px);
                  `}
    }
`;

export const SocialStyled = styled(Social)`
    align-items: start;
`;
