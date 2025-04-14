import { Social } from "@components/Social";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const HamburgerMenuStyled = styled.div<{
    $isOpen: boolean;
}>`
    position: relative;
    display: flex;
    align-items: center;
    z-index: 50;
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
                transition: color 0.3s;
                &:hover {
                    color: ${Theme.tertiary};
                }
            }
        }

        li:last-of-type {
            margin-bottom: 0;
            a {
                /* Optional: different styling for the last item if needed */
            }
        }

        /* Add the Blog list item */
        <li><a href="/blog">Blog</a></li> 
    }
`;

export const HamburgerMenuButton = styled.button<{
    $isOpen: boolean;
}>`
    background: ${Theme.bgElementSecondary};
    position: relative;
    z-index: 50;

    color: ${Theme.textDefault};
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s, border-color 0.3s, color 0.3s;

    border: 1px solid ${Theme.textDefault};
    width: 70px;
    height: 70px;

    ${MediaQuery.max("lg")} {
        width: 50px;
        height: 50px;
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
