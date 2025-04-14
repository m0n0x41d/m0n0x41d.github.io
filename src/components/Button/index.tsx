import * as S from "./styled";
import type { FC } from "react";

type ButtonProps = {
    children: any;
    link?: string;
    variant?: "primary" | "secondary" | "tertiary";
    target?: "_blank" | "_self" | "_parent";
    align?: "left" | "center" | "right";
    asButton?: boolean;
    type?: "button" | "submit" | "reset";
};

/**
 * Button component
 * @param {string} link - link to the page
 * @param {string} variant - button style variant: primary, secondary, or tertiary
 * @example
 * <Button link="#" variant="tertiary">text</Button>
 */
export const Button: FC<ButtonProps> = ({
    link,
    target,
    children,
    align,
    variant = "primary",
    asButton,
    type,
    ...rest
}) => {
    // render button as normal button, otherwise as link
    const ButtonComponent = asButton ? S.Button : S.ButtonLink;

    return (
        <S.ButtonWrapper $align={align}>
            <ButtonComponent
                href={link}
                target={target}
                {...rest}
                $variant={variant}
            >
                {children}
            </ButtonComponent>
        </S.ButtonWrapper>
    );
};
