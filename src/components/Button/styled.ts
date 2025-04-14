import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";

export const ButtonWrapper = styled.div<{
    $align?: "left" | "center" | "right";
}>`
    display: flex;
    justify-content: ${({ $align }) => $align || "flex-start"};
    margin-top: 20px;
`;

export const ButtonLink = styled.a<{
    $variant: "primary" | "secondary" | "tertiary";
}>`
    text-transform: uppercase;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;

    padding: 12px 40px;
    min-width: 150px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: 500;
    border-radius: 50px;

    ${({ $variant }) => $variant === "primary" && PrimaryVariant};
    ${({ $variant }) => $variant === "secondary" && SecondaryVariant};
    ${({ $variant }) => $variant === "tertiary" && TertiaryVariant};
`;

export const Button = ButtonLink.withComponent("button");

const PrimaryVariant = css`
    background: ${Theme.bgElementSecondary};
    border: 1.5px solid ${Theme.bgElementSecondary};
    color: ${Theme.textDefault};

    &:hover {
        background: ${Theme.textDefault};
        color: ${Theme.textSecondary};
    }
`;

const SecondaryVariant = css`
    border: 1.5px solid ${Theme.bgElementSecondary};
    background: ${Theme.bgElement};
    color: ${Theme.textSecondary};

    &:hover {
        background: ${Theme.bgElementSecondary};
        color: ${Theme.textDefault};
    }
`;

const TertiaryVariant = css`
    border: 1.5px solid ${Theme.tertiary};
    background: ${Theme.bgElement};
    color: ${Theme.tertiary};

    &:hover {
        background: ${Theme.tertiary};
        color: ${Theme.textDefault};
    }
`;
