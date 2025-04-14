import { Logo } from "@components/Logo";
import * as S from "./styled";
import { HamburgerMenu } from "@components/HamburgerMenu";
import { LanguageSwitcher } from "@components/LanguageSwitcher";
import { useRef } from "react";
import { type Language } from "@utils/language";

interface HeaderProps {
    currentLang?: Language;
}

export const Header = ({ currentLang = 'en' }: HeaderProps) => {
    const headerRef = useRef(null);

    return (
        <S.HeaderStyled ref={headerRef} data-dark-section>
            <Logo currentLang={currentLang} />
            <S.HeaderControls>
                <LanguageSwitcher currentLang={currentLang} />
                <HamburgerMenu currentLang={currentLang} />
            </S.HeaderControls>
        </S.HeaderStyled>
    );
};
