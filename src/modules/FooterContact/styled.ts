import styled from "@emotion/styled";
import { AboutWave } from "@modules/About/styled";
import { Colors, Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const FooterContactStyled = styled.footer`
    position: relative;
    overflow: hidden;
    background: ${Theme.bgElementSecondary};
    min-height: 100vh;
    display: flex;
    align-items: center;

    padding: 100px 0 100px;

    ${MediaQuery.max("lg")} {
        padding: 200px 0 50px;
    }
`;

export const FooterContactBlob = styled.div`
    position: absolute;
    background: ${Theme.bgElement};
    border-radius: 50%;
    height: 200px;
    width: 200px;
    top: -50px;
    right: 90px;

    ${MediaQuery.max("lg")} {
        top: -90px;
        right: 0;
        width: 100px;
        height: 100px;
    }
`;

export const FooterContactText = styled.div`
    width: 100%;
    position: relative;

    border-bottom: 1px solid ${Colors.white};
    padding-bottom: 40px;

    h2 {
        position: relative;
        margin: 0 0 50px;
        max-width: 600px;

        ${MediaQuery.max("lg")} {
            max-width: 500px;
            margin-bottom: 50px;
        }

        img {
            position: absolute;
            transform: rotate(45deg);
            right: 70px;
            bottom: -50px;
            width: 40px;
            height: 40px;
        }
    }

    span {
        color: ${Theme.tertiary};
    }
`;

export const FooterContactButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 40px;

    ${MediaQuery.max("md")} {
        flex-direction: column;
    }
`;

export const FooterContactButtonLinkLine = styled.div`
    background-color: ${Theme.bgElement};

    width: 100px;
    height: 1px;

    ${MediaQuery.max("md")} {
        height: 20px;
        width: 1px;
    }
`;

export const FooterContactButtonLink = styled.a`
    color: ${Theme.textDefault};
    text-decoration: none;
    font-weight: 700;
    transition: 0.3s;
    width: 100%;
    padding: 15px 30px;
    border-radius: 50px;
    border: 1px solid ${Theme.textDefault};
    font-size: 16px;
    line-height: 20px;

    ${MediaQuery.max("lg")} {
        text-align: center;
    }

    &:hover {
        background-color: ${Theme.bgElement};
        color: ${Theme.textSecondary};
    }

    &:last-of-type {
        background-color: ${Theme.bgElement};
        color: ${Theme.textSecondary};

        &:hover {
            background-color: ${Theme.bgElementSecondary};
            color: ${Theme.textDefault};
        }
    }
`;
