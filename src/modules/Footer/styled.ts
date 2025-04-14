import styled from "@emotion/styled";
import { AboutWave } from "@modules/About/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const FooterStyled = styled.footer`
    position: relative;
    overflow: hidden;
    background: ${Theme.bgElementSecondary};
    min-height: 100vh;
    display: flex;
    align-items: center;

    padding: 250px 0 100px;

    ${MediaQuery.max("lg")} {
        padding: 300px 0 50px;
    }
`;

export const FooterWave = styled(AboutWave)`
    border-radius: 0 0 100% 100%;
`;

export const FooterBlob = styled.div`
    position: absolute;
    background: ${Theme.bgElement};
    border-radius: 50%;

    top: -50px;
    right: 90px;
    width: 200px;
    height: 200px;

    ${MediaQuery.max("md")} {
        top: -140px;
        right: 0;
        width: 100px;
        height: 100px;
    }
`;

export const FooterText = styled.div`
    width: 100%;
    position: relative;

    padding-bottom: 40px;
    border-bottom: 1px solid ${Theme.bgElement};

    h2 {
        position: relative;

        max-width: 600px;

        ${MediaQuery.max("lg")} {
            max-width: 500px;
        }

        img {
            position: absolute;
            transform: rotate(30deg);
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

export const FooterButtonsWrapper = styled.div`
    display: flex;
    align-items: center;

    margin-top: 40px;

    ${MediaQuery.max("md")} {
        flex-direction: column;
    }
`;

export const FooterButtonLinkLine = styled.div`
    background-color: ${Theme.bgElement};

    width: 200px;
    height: 1px;

    ${MediaQuery.max("md")} {
        height: 50px;
        width: 1px;
    }
`;

export const FooterButtonLink = styled.a`
    color: ${Theme.textDefault};
    text-decoration: none;
    font-weight: 700;
    transition: 0.3s;

    padding: 25px 40px;
    border-radius: 50px;
    border: 1px solid ${Theme.textDefault};
    font-size: 16px;
    line-height: 20px;

    &:hover {
        background-color: ${Theme.bgElement};
        color: ${Theme.textSecondary};
    }
`;
