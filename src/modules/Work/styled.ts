import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const WorkStyled = styled.div`
    position: relative;
    overflow: hidden;
    padding: 100px 0;
`;

export const WorkWrapper = styled.div`
    max-width: 900px;
    margin-left: -500px;
`;

export const WorkColumn = styled.div`
    display: flex;
    gap: 50px;

    ${MediaQuery.max("lg")} {
        gap: 10px;
    }

    &:not(:last-child) {
        margin-bottom: 50px;
    }

    &:last-child {
        margin-left: 300px;
    }
`;

export const WorkSingleFigure = styled.figure`
    display: block;
    background: white;

    padding: 50px 25px;
    border-radius: 10px;

    ${MediaQuery.max("lg")} {
        padding: 15px;
        border-radius: 5px;
    }

    img,
    video {
        object-fit: cover;

        ${MediaQuery.min("lg")} {
            width: 400px;
            min-height: 250px;
        }

        ${MediaQuery.max("lg")} {
            width: 100%;
            height: 40vw;
            max-height: 200px;
            min-width: 230px;
        }
    }
`;

export const WorkLinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 45px;
`;

export const WorkLink = styled.a`
    color: ${Theme.textSecondary};
    text-transform: uppercase;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;

    padding: 15px 30px;
    min-width: 150px;
    border: 2px solid ${Theme.textSecondary};
    font-size: 12px;
    line-height: 16px;
    border-radius: 50px;
    margin-top: 50px;

    &:hover {
        background: ${Theme.textSecondary};
        color: ${Theme.textDefault};
    }
`;
