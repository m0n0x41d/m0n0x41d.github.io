import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";


export const SocialWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;

    margin-top: 40px;

    h3 {
        color: ${Theme.textDefault};

        font-size: 20px;
        line-height: 20px;
        margin: 0 0 15px;
    }
`;

export const SocialIconsWrapper = styled.div`
    display: flex;
    align-items: flex-start;

    gap: 15px;

    a {
        display: block;
        width: 20px;
        height: 20px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`;
