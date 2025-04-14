import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const AboutStyled = styled.section<{
    $isAboutMorePage: boolean;
}>`
    background-color: ${Theme.bgElementSecondary};
    position: relative;
    overflow: hidden;
    min-height: 100vh;

    ${(props) =>
        !props.$isAboutMorePage
            ? css`
                  padding: 350px 0 150px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;

                  ${MediaQuery.max("lg")} {
                      padding: 200px 0;
                  }
              `
            : css`
                  padding: 100px 0 100px;

                  ${MediaQuery.max("lg")} {
                      padding: 100px 0 50px;
                  }
              `}
`;

export const AboutWave = styled.div`
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 0 0 50% 80%;
    background-color: ${Theme.bgElement};
    scale: 1.2;

    top: -50px;
    height: 150px;

    ${MediaQuery.max("xxl")} {
        top: -80px;
        height: 120px;
    }
`;

export const AboutHeadingStyled = styled.h2`
    color: ${Theme.textDefault};
    position: relative;

    margin: 20px 0;

    ${MediaQuery.max("lg")} {
        margin: 0;
    }

    &:after {
        content: "";
        display: block;

        background-color: ${Theme.bgElement};

        width: 100px;
        height: 2px;
        margin: 40px 0;
    }
`;

export const AboutTextStyled = styled.div`
    color: ${Theme.textDefault};
    position: relative;
    margin: 0 auto;
    font-size: 14px;
    line-height: 20px;
    max-width: 800px;

    ${MediaQuery.max("lg")} {
        margin-top: 20px;
        font-size: 16px;
        line-height: 25px;
    }

    img {
        width: 100%;
        margin: 40px 0;
    }

    span {
        color: ${Theme.tertiary};
    }
`;

export const AboutTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
`;

export const AboutBall = styled.span`
    display: block;
    width: 200px;
    height: 200px;
    left: 100px;
    background: ${Theme.bgElement};
    border-radius: 50%;

    opacity: 0;

    ${MediaQuery.min("xxl")} {
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
    }

    ${MediaQuery.max("xxl")} {
        margin-top: 50px;
        margin-left: 20px;
        width: 150px;
        height: 150px;
    }
`;

export const AboutLinkWrapper = styled.span`
    display: flex;
    justify-content: end;

    a {
        display: flex;
        text-align: right;

        margin-top: 14px;
        font-size: 16px;
        line-height: 16px;

        &:hover img {
            transform: translate(10px, 0) scale(1.5) rotate(80deg);
        }

        [data-icon] {
            transform: rotate(-135deg);
            transition: transform 0.3s;
            width: 20px;
            height: 20px;

            margin: 0 0 0 10px;
        }
    }
`;
