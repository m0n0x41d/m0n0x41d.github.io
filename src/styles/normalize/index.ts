import { css } from "@emotion/react";
import { Colors, Theme, ThemeVar } from "@styles/colors";
import { FontFace, Fonts } from "@styles/fonts";
import { MediaQuery } from "@styles/mediaQuery";

export const NormalizeCSS = css`
    ${FontFace};
    ${ThemeVar};

    :root {
        color-scheme: light only;
    }

    body,
    html {
        font-family: ${Fonts.primary};
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;

        -ms-overflow-style: none;
        scrollbar-width: none;
        ::-webkit-scrollbar {
            display: none;
        }
    }

    * {
        box-sizing: border-box;
    }

    html {
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
    }

    body {
        margin: 0;

        color: ${Theme.textDefault};
        background: ${Theme.primary};
    }

    main {
        display: block;
    }

    a {
        background-color: transparent;
    }

    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted;
    }

    img {
        border-style: none;
        object-fit: cover;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        line-height: 1.15; /* 1 */
        margin: 0; /* 2 */
    }

    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
        -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    button {
        padding: 0;
    }

    figure {
        margin: 0;
        line-height: 0;
    }

    strong {
        font-weight: 700;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h2 {
        font-size: 55px;
        line-height: 60px;

        ${MediaQuery.max("lg")} {
            font-size: 40px;
            line-height: 42px;
        }
    }

    h3 {
        font-size: 30px;
        line-height: 32px;

        ${MediaQuery.max("lg")} {
            font-size: 20px;
            line-height: 22px;
        }
    }

    h4 {
        font-size: 24px;
        line-height: 28px;

        ${MediaQuery.max("lg")} {
            font-size: 18px;
            line-height: 20px;
        }
    }

    [data-dark-section] {
        h1,
        h2,
        h3,
        h4,
        p,
        a,
        span,
        br,
        img {
            &::-moz-selection {
                background-color: ${Colors.white};
                color: ${Colors.codGray};
            }

            &::selection {
                background-color: ${Colors.white};
                color: ${Colors.codGray};
            }
        }
    }

    [data-light-section] {
        h1,
        h2,
        h3,
        h4,
        p,
        a,
        span,
        br,
        img {
            &::-moz-selection {
                background-color: ${Colors.codGray};
                color: ${Colors.white};
            }

            &::selection {
                background-color: ${Colors.codGray};
                color: ${Colors.white};
            }
        }
    }
`;
