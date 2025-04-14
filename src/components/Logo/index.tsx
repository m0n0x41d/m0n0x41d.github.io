import * as S from "./styled";
import type { FC } from "react";
import { Image } from "@static/images";
import { type Language } from "@utils/language";
/**
 * Logo is a text but if there is need to use img, add two img from <Image component
 * @import
 * @example
 * import { Image } from "@static/images";
 * <Image src="logo-light" alt="logo" data-theme-el="light" />
 * when is light
 * <Image src="logo-dark" alt="logo" data-theme-el="dark" />
 */
interface LogoProps {
    currentLang?: Language;
}

export const Logo: FC<LogoProps> = ({ currentLang = 'en' }) => {
    const homeUrl = currentLang === 'en' ? '/en' : '/ru';

    return (
        <S.LogoStyled>
            <a href={homeUrl}>
                <Image srcLocal="logo" alt="logo" />
            </a>
        </S.LogoStyled>
    );
};
