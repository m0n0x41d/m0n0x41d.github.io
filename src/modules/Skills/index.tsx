import * as S from "./styled";
import { useEffect, useRef } from "react";
import { AnimationsSkills } from "./animations";
import { Button } from "@components/Button";
import { type Language } from "@utils/language";

type SkillsProps = {
    data?: {
        title?: string;
        description?: string;
        button?: {
            text: string;
            link: string;
        };
        textItems?: {
            title: string;
            description: string;
            techStack: string;
        }[];
    };
    lang?: Language;
};

/**
 * Skills section
 * @param {SkillsProps} props - Component props
 * @param {SkillsProps['data']} props.data - data for skills section
 * @param {Language} props.lang - Current language
 */
export const Skills = ({ data = {}, lang = 'en' }: SkillsProps) => {
    // Translations for the Skills component
    const translations = {
        en: {
            title: "My <span>Skills</span> & Experience",
            description: "With over 7 years of experience, I've developed expertise in various areas of software engineering and architecture. My approach combines deep technical knowledge with a strong focus on practical solutions that deliver real business value.",
            button: {
                text: "Contact me",
                link: "/en/contact"
            },
            textItems: [
                {
                    title: "Platform Architecture",
                    description: "Designing scalable and robust platform architectures that support business growth and technological evolution. I focus on creating systems that balance immediate needs with long-term sustainability, ensuring that technical decisions align with strategic objectives.",
                    techStack: "Cloud Infrastructure (AWS, GCP, Azure), Microservices, API Design, System Integration, Kubernetes, Docker, Terraform, Event-Driven Architecture"
                },
                {
                    title: "AI Systems Integration",
                    description: "Implementing and integrating AI capabilities into existing systems to enhance functionality and user experience. I specialize in creating practical AI solutions that solve real business problems while maintaining system integrity and performance.",
                    techStack: "LLMs (GPT, Claude, Llama), Machine Learning, Natural Language Processing, Vector Databases, RAG Systems, AI Orchestration, Embeddings, Prompt Engineering"
                },
                {
                    title: "Systems Engineering",
                    description: "Building complex systems with a focus on reliability, performance, and maintainability. I excel at untangling technical complexity and creating elegant solutions that can evolve with changing requirements while maintaining operational excellence.",
                    techStack: "Distributed Systems, Database Design (SQL & NoSQL), Scalability, Fault Tolerance, Performance Optimization, Message Queues, Observability, Monitoring"
                }
            ]
        },
        ru: {
            title: "Мои <span>Навыки</span> и Опыт",
            description: "С более чем 7-летним опытом, я развил экспертизу в различных областях разработки программного обеспечения и архитектуры.",
            button: {
                text: "Напишите мне",
                link: "/ru/contact"
            },
            textItems: [
                {
                    title: "Архитектура Платформ",
                    description: "Проектирование масштабируемых и надежных архитектур платформ, поддерживающих рост бизнеса и технологическую эволюцию.",
                    techStack: "Облачная Инфраструктура, Микросервисы, Дизайн API, Системная Интеграция"
                },
                {
                    title: "Интеграция AI Систем",
                    description: "Внедрение и интеграция возможностей искусственного интеллекта в существующие системы для улучшения функциональности и пользовательского опыта.",
                    techStack: "LLMs, Машинное Обучение, Обработка Естественного Языка, Компьютерное Зрение"
                },
                {
                    title: "Системная Инженерия",
                    description: "Создание сложных систем с фокусом на надежность, производительность и удобство поддержки.",
                    techStack: "Распределенные Системы, Проектирование Баз Данных, Масштабируемость, Отказоустойчивость"
                }
            ]
        }
    };

    // Extract from data or use defaults from translations
    const title = data.title || translations[lang].title;
    const description = data.description || translations[lang].description;
    const button = data.button || translations[lang].button;
    const textItems = data.textItems || translations[lang].textItems;

    const skillsRef = useRef(null);
    const textRef = useRef(null);
    const skillsWrapperRef = useRef(null);
    const firstHalfRef = useRef(null);
    const secondHalfRef = useRef(null);

    useEffect(() => {
        AnimationsSkills({
            textRef,
            skillsWrapperRef,
            skillsRef,
            firstHalfRef,
            secondHalfRef,
        });
    }, []);

    return (
        <S.SkillsStyled ref={skillsRef} data-light-section>
            <S.SkillsMainWrapper>
                <S.SkillsContainer>
                    <S.SkillsWrapper ref={skillsWrapperRef}>
                        <h2 dangerouslySetInnerHTML={{ __html: title }} />
                        <div
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                        <Button link={button.link} variant="primary">
                            {button.text}
                        </Button>
                    </S.SkillsWrapper>
                    <S.SkillsTextWrapper ref={textRef}>
                        {textItems.map((item, index) => (
                            <S.SkillsWhatWeDoSingle key={index}>
                                <S.SkillsTitle>{item.title}</S.SkillsTitle>
                                <S.SkillsDesc>{item.description}</S.SkillsDesc>
                                <S.SkillsLang>
                                    <h3>{lang === 'en' ? 'Focus Areas / Tech Stack' : 'Области Фокуса / Технологии'}</h3>
                                    <p>{item.techStack}</p>
                                </S.SkillsLang>
                            </S.SkillsWhatWeDoSingle>
                        ))}
                    </S.SkillsTextWrapper>
                </S.SkillsContainer>
            </S.SkillsMainWrapper>
        </S.SkillsStyled>
    );
};
