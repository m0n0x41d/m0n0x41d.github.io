import styled from "@emotion/styled";

export const FadeInStyled = styled.div`
    // must be on 0.001 or 0.01 because if it's 0, performance LCP will be broken.
    opacity: 0.001;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
