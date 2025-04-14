import * as S from "./styled";
import { ProjectSingle, type ProjectSingleProps } from "./ProjectSingle";
import { FadeIn } from "@utils/animations/FadeIn";
import { type Language } from "@utils/language";

type ProjectAllProps = {
    data?: ProjectSingleProps["work"][];
    lang?: Language;
};

export const ProjectsAll = ({ data, lang = 'en' }: ProjectAllProps) => {
    // Sample project data that will be used if no data is provided
    const sampleData = [
        {
            title: "Project 1",
            description: lang === 'en'
                ? "Sample project description in English."
                : "Описание примерного проекта на русском.",
            image: "https://picsum.photos/id/40/450/300",
            link: "#",
        },
        {
            title: "Project 2",
            description: lang === 'en'
                ? "Another sample project in English."
                : "Еще один примерный проект на русском.",
            image: "https://picsum.photos/id/41/450/300",
            link: "#",
        },
        {
            title: "Project 3",
            description: lang === 'en'
                ? "Third sample project in English."
                : "Третий примерный проект на русском.",
            image: "https://picsum.photos/id/42/450/300",
            link: "#",
        },
    ];

    // Use provided data or fallback to sample data
    const projectData = data || sampleData;

    // Translations for the component
    const translations = {
        en: {
            title: "My <span>Works</span>",
            banner: "I would love to work with you and add more projects here.",
            contactButton: "get in touch"
        },
        ru: {
            title: "Мои <span>Работы</span>",
            banner: "Я буду рад сотрудничеству с вами и добавлению новых проектов.",
            contactButton: "связаться"
        }
    };

    const content = translations[lang];

    // get first 6 works
    const worksOnly6 = projectData.slice(0, 6);
    // get rest of works
    const workRest = projectData.slice(6, projectData.length);

    return (
        <S.ProjectAllStyled data-light-section>
            <S.ContainerStyled>
                <FadeIn>
                    <S.ProjectAllText>
                        <h1 dangerouslySetInnerHTML={{ __html: content.title }} />
                    </S.ProjectAllText>
                </FadeIn>

                <S.ProjectAllWrapper>
                    {worksOnly6.map((work, index) => (
                        <FadeIn delay={0.1 * index} key={index}>
                            <ProjectSingle work={work} />
                        </FadeIn>
                    ))}
                </S.ProjectAllWrapper>
                <FadeIn>
                    <S.ProjectsAllBanner>
                        <h2>{content.banner}</h2>
                    </S.ProjectsAllBanner>
                </FadeIn>

                <S.ProjectAllWrapper>
                    {workRest.map((work, index) => (
                        <FadeIn delay={0.1 * index} key={index}>
                            <ProjectSingle key={index} work={work} />
                        </FadeIn>
                    ))}
                </S.ProjectAllWrapper>
                <S.ProjectAllWrapperButton>
                    <FadeIn>
                        <S.ProjectAllLink href={`/${lang}/contact`}>
                            {content.contactButton}
                        </S.ProjectAllLink>
                    </FadeIn>
                </S.ProjectAllWrapperButton>
            </S.ContainerStyled>
        </S.ProjectAllStyled>
    );
};
