import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const ProjectAllSingle = styled.a`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;

    h2 {
        color: ${Theme.textSecondary};
        font-weight: 700;
        transition: color 0.3s ease;

        font-size: 24px;
        line-height: 30px;
        margin: 10px 0;

        ${MediaQuery.max("lg")} {
            font-size: 18px;
            line-height: 24px;
            margin: 10px 0;
        }
    }

    p {
        margin: 0 0 15px 0;
        font-size: 16px;
        line-height: 23px;
    }

    span {
        color: initial;
        &:after {
            content: "";
            display: block;
            width: 0;
            background-color: ${Theme.tertiary};
            transition: width 0.3s ease;
            height: 2px;
            margin-top: 2px;
        }
    }

    &:hover {
        img,
        video {
            transform: scale(1.1);
        }

        h2 {
            color: ${Theme.tertiary};
        }

        span:after {
            width: 100%;
        }
    }
`;

export const ProjectAllSingleFigure = styled.figure`
    display: block;
    width: 100%;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background-color: #fff;

    border-radius: 15px;

    img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s ease;
        transform: scale(1.05);
        aspect-ratio: 16 / 9;
    }
`;

export const ProjectAllSingleContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
`;
