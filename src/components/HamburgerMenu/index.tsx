import { useEffect, useState } from "react";
import * as S from "./styled";
import { type Language } from "@utils/language";

interface HamburgerMenuProps {
    currentLang?: Language;
}

/**
 * Hamburger menu component
 */
export const HamburgerMenu = ({ currentLang = 'en' }: HamburgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Menu translations
    const menuItems = {
        en: {
            home: "Home",
            blog: "Blog",
            about: "About me",
            contact: "Contact",
            socialMedia: "Social Media"
        },
        ru: {
            home: "Главная",
            blog: "Блог",
            about: "Обо мне",
            contact: "Контакты",
            socialMedia: "Социальные сети"
        }
    };

    const items = menuItems[currentLang];

    // handle menu open/close
    const handleMenu = () => {
        setIsOpen(!isOpen);
    };

    // handle click outside menu
    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!target.closest("nav") && isOpen && target.tagName !== "BUTTON") {
            setIsOpen(false);
        }
    };

    /**
     * Add event listener for click outside menu
     * why remove event listener?
     * because we don't want to add multiple event listener
     */
    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <S.HamburgerMenuStyled $isOpen={isOpen} currentLang={currentLang}>
            <S.HamburgerMenuButton
                $isOpen={isOpen}
                onClick={handleMenu}
                aria-label="Menu"
                aria-expanded={isOpen}
                role="button"
                tabIndex={0}
                currentLang={currentLang}
            >
                <S.HamburgerMenuButtonLine $isOpen={isOpen} />
                <S.HamburgerMenuButtonLine $isOpen={isOpen} />
            </S.HamburgerMenuButton>
            <S.Navigation $isOpen={isOpen}>
                <ul>
                    <li>
                        <a href={`/${currentLang}`}>{items.home}</a>
                    </li>
                    <li>
                        <a href={`/${currentLang}/blog`}>{items.blog}</a>
                    </li>
                    {/* <li> */}
                    {/* <a href="/projects">Projects</a> */}
                    {/* </li> */}
                    <li>
                        <a href={`/${currentLang}/about`}>{items.about}</a>
                    </li>
                    <li>
                        <a href={`/${currentLang}/contact`}>{items.contact}</a>
                    </li>
                </ul>
                <S.SocialStyled title={items.socialMedia} />
            </S.Navigation>
        </S.HamburgerMenuStyled>
    );
};
