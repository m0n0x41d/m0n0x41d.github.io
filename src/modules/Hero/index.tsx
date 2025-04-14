import { Image, type ImageProps } from "@static/images";
import * as S from "./styled";
import { Button } from "@components/Button";
import { FadeIn } from "@utils/animations/FadeIn";
import { useEffect, useState } from "react";
import { type Language } from "@utils/language";

type HeroProps = {
    lang?: Language;
    data?: {
        img?: ImageProps["srcLocal"];
    };
};

/**
 * Hero section
 * @param {HeroProps} props - Component props
 * @param {Language} props.lang - Current language
 * @param {HeroProps['data']} props.data - Additional hero data
 */
export const Hero = ({ lang = 'en', data = {} }: HeroProps) => {
    const [displayText, setDisplayText] = useState("");
    const words = lang === 'en' ? ["hack", "build"] : ["строить", "хакнем"];
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Находим самое длинное слово для каждого языка для предустановки размера
    const maxWordLengthRu = Math.max(...["строить", "хакнем"].map(word => word.length));
    const maxWordLengthEn = Math.max(...["hack", "build"].map(word => word.length));
    // Коэффициенты для разных языков (русский требует больше места)
    const ruMultiplier = 0.8; // em
    const enMultiplier = 0.75; // em

    // Translations for the Hero component
    const translations = {
        en: {
            introPrefix: "Let's",
            title: "our <span>future</span>",
            description: "Ivan Zakutnii — software and systems engineering expert creating tailored solutions that drive business evolution.",
            buttons: [
                {
                    text: "Get in touch",
                    link: "/en/contact",
                    variant: "secondary" as const
                },
                {
                    text: "Read my blog",
                    link: "/en/blog",
                    variant: "primary" as const
                }
            ],
            heroImage: "/hero-illustration.png" // Default hero image path
        },
        ru: {
            introPrefix: "Давайте",
            title: "наше <span>будущее</span>",
            description: "Иван Закутний — эксперт в области программной и системной инженерии, создающий индивидуальные решения, способствующие эволюционному росту бизнеса.",
            buttons: [
                {
                    text: "Связаться",
                    link: "/ru/contact",
                    variant: "secondary" as const
                },
                {
                    text: "Читать мой блог",
                    link: "/ru/blog",
                    variant: "primary" as const
                }
            ],
            heroImage: "/hero-illustration.png" // Default hero image path
        }
    };

    const content = translations[lang];
    const { img } = data;
    const hasImage = !!img;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const type = () => {
            const currentWord = words[wordIndex];
            const typingSpeed = 100;
            const deletingSpeed = 75;
            const pauseTime = 1500;

            if (isDeleting) {
                if (displayText.length === 0) {
                    // Полностью удалили текущее слово, переходим к следующему
                    const nextIndex = (wordIndex + 1) % words.length;
                    setWordIndex(nextIndex);

                    // Сразу печатаем первую букву следующего слова, 
                    // чтобы каретка позиционировалась правильно
                    const nextWord = words[nextIndex];
                    setDisplayText(nextWord.charAt(0));
                    setIsDeleting(false);

                    // Продолжаем печать со второй буквы
                    timer = setTimeout(type, typingSpeed);
                } else {
                    // Продолжаем удалять по одной букве
                    setDisplayText(displayText.slice(0, -1));
                    timer = setTimeout(type, deletingSpeed);
                }
            } else {
                if (displayText.length === currentWord.length) {
                    setIsComplete(true);
                    // Пауза перед началом удаления
                    timer = setTimeout(() => {
                        setIsComplete(false);
                        setIsDeleting(true);
                        timer = setTimeout(type, deletingSpeed);
                    }, pauseTime);
                } else {
                    // Продолжаем печатать по одной букве
                    setDisplayText(currentWord.slice(0, displayText.length + 1));
                    timer = setTimeout(type, typingSpeed);
                }
            }
        };

        // Запускаем эффект печати
        timer = setTimeout(type, 100);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, isComplete, wordIndex, words, lang]);

    // Generate animated title based on the current language
    const animatedTitle = lang === 'ru'
        ? `
        <div class="hero-title-ru">
            <div class="line-one">
                <span class="black-text">Давайте</span> 
                <span class="typing-container" style="min-width: ${maxWordLengthRu * ruMultiplier}em; display: inline-block;">
                    <span class="typing-effect">${displayText}</span><span class="caret ${isComplete ? 'hidden' : ''}">|</span>
                </span>
            </div>
            <div class="line-two"><span class="black-text">наше</span> <span>будущее</span></div>
        </div>
        `
        : `
        <h1>
            <div class="title-line">${content.introPrefix} 
                <span class="typing-container" style="min-width: ${maxWordLengthEn * enMultiplier}em; display: inline-block; position: relative;">
                    <span class="typing-effect">${displayText}</span><span class="caret ${isComplete ? 'hidden' : ''}">|</span>
                </span>
            </div>
            <div class="title-line">${content.title}</div>
        </h1>
        `;

    return (
        <S.HeroStyled data-light-section>
            <S.ContainerStyled>
                <S.HeroGrid $noImage={!hasImage}>
                    <FadeIn>
                        <S.HeroText $noImage={!hasImage}>
                            <div dangerouslySetInnerHTML={{ __html: animatedTitle }} />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.description,
                                }}
                            />
                            <S.ButtonsContainer>
                                {content.buttons.map((btn, index) => (
                                    <Button
                                        key={index}
                                        variant={btn.variant}
                                        link={btn.link}
                                    >
                                        {btn.text}
                                    </Button>
                                ))}
                            </S.ButtonsContainer>
                        </S.HeroText>
                    </FadeIn>
                    {img && (
                        <FadeIn delay={0.5}>
                            <figure>
                                <Image srcLocal={img} alt="hero illustration" />
                            </figure>
                        </FadeIn>
                    )}
                </S.HeroGrid>
            </S.ContainerStyled>
        </S.HeroStyled>
    );
};
