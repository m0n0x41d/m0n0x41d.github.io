import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

// Define the new animation for the logo
const LogoSlideInRotate = keyframes`
  from {
    transform: translateX(950px) rotate(500deg); // Increased rotation for faster spinning
    opacity: 0;
  }
  to {
    transform: translateX(0) rotate(0deg); // End in final position
    opacity: 1;
  }
`;

export const LogoStyled = styled.div`
    position: relative;
    z-index: 3;
    opacity: 1; // Default opacity to 1 (visible)

    /* Apply animation ONLY when body has .is-homepage class */
    body.is-homepage & {
        opacity: 0; // Start hidden on homepage
        animation: ${LogoSlideInRotate} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        animation-delay: 0.5s;
    }

    a {
        font-size: 35px;
        line-height: 30px;
        font-weight: 700;
        display: inline-flex;
        position: relative;
        border-radius: 100%;

        span {
            &:after {
                content: "";
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 25%;
                height: 3px;
                background-color: ${Theme.primary};
                z-index: 1;
                transition: width 0.2s linear;
            }
        }

        &:hover span:after {
            width: 100%;
        }

        img {
            width: 50px;
            height: 50px;
            object-fit: contain;

            ${MediaQuery.max("lg")} {
                width: 30px;
                height: 30px;
            }
        }
    }
`;
