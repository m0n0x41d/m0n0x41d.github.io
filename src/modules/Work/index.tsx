import * as S from "./styled";
import { useEffect, useRef } from "react";
import { WorkAnimations } from "./animations";
import { Button } from "@components/Button";
import { FadeIn } from "@utils/animations/FadeIn";
import { type Language } from "@utils/language";

type WorkProps = {
    worksArray?: {
        src: string;
        alt: string;
    }[];
    button?: {
        text: string;
        link: string;
    };
    lang?: Language;
};

/**
 * Work section
 * @param {WorkProps} props - Component props
 * @param {WorkProps['worksArray']} props.worksArray - Array of work images
 * @param {WorkProps['button']} props.button - Button data
 * @param {Language} props.lang - Current language
 */
export const Work = ({ worksArray, button, lang = 'en' }: WorkProps) => {
    // Translations for the Work component
    const translations = {
        en: {
            button: {
                text: "View all projects",
                link: "/en/projects"
            },
            defaultWorks: [
                {
                    src: "https://picsum.photos/id/237/404/260",
                    alt: "Project 1"
                },
                {
                    src: "https://picsum.photos/id/238/404/260",
                    alt: "Project 2"
                },
                {
                    src: "https://picsum.photos/id/239/404/260",
                    alt: "Project 3"
                },
                {
                    src: "https://picsum.photos/id/240/404/260",
                    alt: "Project 4"
                }
            ]
        },
        ru: {
            button: {
                text: "Посмотреть все проекты",
                link: "/ru/projects"
            },
            defaultWorks: [
                {
                    src: "https://picsum.photos/id/237/404/260",
                    alt: "Проект 1"
                },
                {
                    src: "https://picsum.photos/id/238/404/260",
                    alt: "Проект 2"
                },
                {
                    src: "https://picsum.photos/id/239/404/260",
                    alt: "Проект 3"
                },
                {
                    src: "https://picsum.photos/id/240/404/260",
                    alt: "Проект 4"
                }
            ]
        }
    };

    // Use provided data or fallback to translations
    const works = worksArray || translations[lang].defaultWorks;
    const buttonData = button || translations[lang].button;

    // takes worksArray and split it into two arrays
    const worksHalf = Math.ceil(works.length / 2);
    const firstWorksHalf = works.slice(0, worksHalf);
    const secondWorksHalf = works.slice(worksHalf, works.length);

    const firstHalf = useRef(null);
    const secondHalf = useRef(null);

    useEffect(() => {
        WorkAnimations({
            firstHalf,
            secondHalf,
        });
    }, []);

    return (
        <S.WorkStyled data-light-section>
            <FadeIn>
                <S.WorkWrapper>
                    <S.WorkColumn ref={firstHalf}>
                        {firstWorksHalf.map((work, index) => (
                            <S.WorkSingleFigure key={index}>
                                <img
                                    src={work.src}
                                    alt={work.alt}
                                    width={404}
                                    height={260}
                                    loading="lazy"
                                />
                            </S.WorkSingleFigure>
                        ))}
                    </S.WorkColumn>
                    <S.WorkColumn ref={secondHalf}>
                        {secondWorksHalf.map((work, index) => (
                            <S.WorkSingleFigure key={index}>
                                <img
                                    src={work.src}
                                    alt={work.alt}
                                    width={404}
                                    height={260}
                                    loading="lazy"
                                />
                            </S.WorkSingleFigure>
                        ))}
                    </S.WorkColumn>
                </S.WorkWrapper>
            </FadeIn>
            <FadeIn>
                <S.WorkLinkWrapper>
                    <Button variant="primary" link={buttonData.link}>
                        {buttonData.text}
                    </Button>
                </S.WorkLinkWrapper>
            </FadeIn>
        </S.WorkStyled>
    );
};
