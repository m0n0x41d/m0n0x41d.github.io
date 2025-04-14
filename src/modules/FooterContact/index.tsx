import * as S from "./styled";
import { Container } from "@components/Container";
import { Social } from "@components/Social";
import { Icon } from "@static/icons";
import { FadeIn } from "@utils/animations/FadeIn";
import { type Language } from "@utils/language";

interface FooterContactProps {
    lang?: Language;
}

/**
 * FooterContact component
 * @param {FooterContactProps} props - Component props
 * @param {Language} props.lang - Current language
 */
export const FooterContact = ({ lang = 'en' }: FooterContactProps) => {
    // Translations for the FooterContact component
    const translations = {
        en: {
            heading: {
                part1: "Lets",
                part2: "start",
                part3: "working",
                part4: "together"
            },
            contactLabel: "E-mail",
            telegramLabel: "Telegram",
            linkedinLabel: "LinkedIn"
        },
        ru: {
            heading: {
                part1: "Давайте",
                part2: "начнем",
                part3: "работать",
                part4: "вместе"
            },
            contactLabel: "Эл. почта",
            telegramLabel: "Телеграм",
            linkedinLabel: "ЛинкедИн"
        }
    };

    const content = translations[lang];

    const ContactOptions = [
        {
            title: content.contactLabel,
            link: "mailto:contact@ivanzakutnii.com",
            secondText: "contact@ivanzakutnii.com",
        },
        {
            title: content.telegramLabel,
            link: "https://t.me/m0n0x41d",
            secondText: "@m0n0x41d",
        },
        {
            title: content.linkedinLabel,
            link: "https://www.linkedin.com/in/ivan-zakutnii/",
            secondText: "ivanzakutnii",
        },
    ];

    return (
        <S.FooterContactStyled data-dark-section>
            <Container>
                <FadeIn>
                    <S.FooterContactText>
                        <S.FooterContactBlob />

                        <h2>
                            <span>{content.heading.part1}</span> {content.heading.part2} <br />
                            {content.heading.part3} <span>{content.heading.part4}</span>!
                            <Icon iconData="arrowDown" alt="arrow down" />
                        </h2>
                    </S.FooterContactText>
                </FadeIn>
                {ContactOptions.map((option, index) => (
                    <FadeIn delay={0.5} key={index}>
                        <S.FooterContactButtonsWrapper>
                            <S.FooterContactButtonLink
                                href={option.link}
                                target="_blank"
                            >
                                {option.title}
                            </S.FooterContactButtonLink>
                            <S.FooterContactButtonLinkLine />
                            <S.FooterContactButtonLink
                                href={option.link}
                                target="_blank"
                            >
                                {option.secondText}
                            </S.FooterContactButtonLink>
                        </S.FooterContactButtonsWrapper>
                    </FadeIn>
                ))}
                <FadeIn delay={1}>
                    <Social />
                </FadeIn>
            </Container>
        </S.FooterContactStyled>
    );
};
