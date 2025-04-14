import { Container } from "@components/Container";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const ProjectAllStyled = styled.div`
    position: relative;
    overflow: hidden;
    padding: 120px 0;

    h2,
    h3,
    h4,
    p,
    a {
        color: ${Theme.textSecondary};
    }

    span {
        color: ${Theme.tertiary};
    }
`;

export const ProjectAllText = styled.div`
    margin: 0 0 65px 0;

    h1 {
        color: initial;
        font-size: 65px;
        line-height: 65px;
        margin: 0;

        ${MediaQuery.max("lg")} {
            font-size: 40px;
            line-height: 40px;
        }
    }
`;

export const ContainerStyled = styled(Container)`
    flex-direction: column;
`;

export const ProjectAllWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 50px;

    ${MediaQuery.max("lg")} {
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }

    ${MediaQuery.max("md")} {
        grid-template-columns: 1fr;
    }
`;

export const ProjectsAllBanner = styled.div`
    position: relative;

    padding-left: 40px;
    margin: 50px 0;

    ${MediaQuery.min("md")} {
        max-width: 70%;
    }

    &:before {
        content: "";
        display: block;
        height: 100%;
        background-color: ${Theme.tertiary};
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;

        width: 5px;
    }

    h2 {
        ${MediaQuery.max("lg")} {
            font-size: 30px;
            line-height: 35px;
        }
    }
`;

export const ProjectAllWrapperButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProjectAllLink = styled.a`
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
        background: ${Theme.bgElementSecondary};
        color: ${Theme.textDefault};
    }
`;

export const ProjectAllLoading = styled.div<{ $isLoading: boolean }>`
    text-align: center;

    background: transparent;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
    height: 0;
    overflow: hidden;

    ${(props) =>
        props.$isLoading &&
        css`
            background: #fff;
            height: 100vh;
            width: 100%;
            z-index: 10;
        `}
`;
