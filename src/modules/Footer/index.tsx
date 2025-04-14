import * as S from "./styled";
import { useRef, useEffect } from "react";
import { FooterAnimations } from "./animations";
import { Container } from "@components/Container";
import { Social } from "@components/Social";
import { Icon } from "@static/icons";
import { FadeIn } from "@utils/animations/FadeIn";
import { type Language } from "@utils/language";

interface FooterProps {
    showContact?: boolean;
    lang?: Language;
}

/**
 * Footer component
 * @param {FooterProps} props - Component props
 * @param {boolean} props.showContact - Whether to show contact information
 * @param {Language} props.lang - Current language
 */
export const Footer = ({ showContact = true, lang = 'en' }: FooterProps) => {
    // Translations for the Footer component
    const translations = {
        en: {
            heading: {
                part1: "Lets",
                part2: "start",
                part3: "working",
                part4: "together"
            },
            email: "contact@ivanzakutnii.com",
            moreOptions: "more options"
        },
        ru: {
            heading: {
                part1: "Давайте",
                part2: "начнем",
                part3: "работать",
                part4: "вместе"
            },
            email: "contact@ivanzakutnii.com",
            moreOptions: "больше вариантов"
        }
    };

    const content = translations[lang];

    const footerWaveRef = useRef<HTMLDivElement>(null);
    const blobRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        FooterAnimations({
            waveRef: footerWaveRef,
            blobRef: blobRef,
            textRef: textRef,
        });
    }, []);

    return (
        <S.FooterStyled data-dark-section>
            <S.FooterWave ref={footerWaveRef} />
            <Container>
                <S.FooterText ref={textRef}>
                    <S.FooterBlob ref={blobRef} />
                    <h2>
                        <span>{content.heading.part1}</span> {content.heading.part2} <br />
                        {content.heading.part3} <span>{content.heading.part4}</span>!
                        <Icon iconData="arrowDown" alt="arrow down" />
                    </h2>
                </S.FooterText>
                {showContact && (
                    <FadeIn>
                        <S.FooterButtonsWrapper>
                            <S.FooterButtonLink href="mailto:contact@ivanzakutnii.com">
                                {content.email}
                            </S.FooterButtonLink>
                            <S.FooterButtonLinkLine />
                            <S.FooterButtonLink href={`/${lang}/contact`}>
                                {content.moreOptions}
                            </S.FooterButtonLink>
                        </S.FooterButtonsWrapper>
                    </FadeIn>
                )}
                <FadeIn>
                    <Social />
                </FadeIn>
            </Container>
        </S.FooterStyled>
    );
};
