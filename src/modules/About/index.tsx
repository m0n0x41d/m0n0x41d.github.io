import { Container } from "@components/Container";
import * as S from "./styled";
import { useRef, useEffect } from "react";
import { AboutAnimations } from "./animations";
import { Icon } from "@static/icons";
import { FadeIn } from "@utils/animations/FadeIn";
import { type Language } from "@utils/language";

type AboutProps = {
    data?: {
        title?: string;
        showWave?: boolean;
        showBlob?: boolean;
        isAboutMorePage?: boolean;
        text?: string;
        imgSrc?: string;
        showMoreButton?: {
            text: string;
            link: string;
        };
    };
    lang?: Language;
};

/**
 *  About section
 * @param {AboutProps} props - Component props
 * @param {AboutProps['data']} props.data - data for about section
 * @param {Language} props.lang - Current language
 */
export const About = ({ data = {}, lang = 'en' }: AboutProps) => {
    // Translations for the About component
    const translations = {
        en: {
            title: "About me",
            defaultText: `<p>With over seven years of experience in software engineering, I've developed deep expertise in designing and implementing robust and scalable software systems.</p>
            <p>My technical foundation spans from databases, cloud infrastructure, distributed systems, to following both <span>never-dying</span> and <span>SoTA</span> engineering principles.</p>
            <p>I specialize in Platform Architecture and AI Systems integration.</p> 
            <p>But everything starts with <span>Systems Engineering.</span></p>`,


            fullText: `<p>With over seven years of experience in software engineering, I've developed deep expertise in designing and implementing scalable software systems.</p>
            <p>My technical foundation spans from databases, cloud infrastructure, distributed systems, to following both <span>never-dying</span> and <span>SoTA</span> engineering principles.</p>
            <p>I specialize in Platform Architecture and AI Systems integration.</p> 
            <p>But everything starts with <span>Systems Engineering.</span></p>
            <p>I am always trying to approach every specific domain cautiously, gathering as many metrics about the situation and business goals as possible, instead of rushing into slapping in "modern architecture patterns".</p>
            <p>Why is the logo of my site an Axe and what is this <i>"hacking in"</i> thing about? Because I do believe that "keep hacking in" is the right way to really "get it".</p>
            <h3>The Consulting Approach</h3>
            <p>My consulting philosophy centers on the belief that technology should serve business goals, not the other way around. When I engage with clients, I follow a structured process:</p>
            <ol>
              <li><strong>Discovery</strong>: Understanding the core business challenges beyond the technical symptoms and <span>subjective</span> ideas</li>
              <li><strong>Strategy Development</strong>: Linking technology solutions to business outcomes with <span>clear metrics</span>, developing useful and approachable <span>ontology</span> comfortable for all stakeholders</li>
              <li><strong>Implementation Planning</strong>: Creating pragmatic roadmaps, following which we will be able to double-check every hypothesis and re-iterate before we implement "tech-debt" instead of a long-living and robust system</li>
              <li><strong>Execution & Knowledge Transfer</strong>: Delivering solutions while ensuring client teams can maintain and extend them, meaning that the ontology, methods and applied solutions will <span>thrive</span> further without me</li>
            </ol>
            <h3>Beyond Just Technical</h3>
            <p>What distinguishes my approach is the sober recognition that technical systems exist within human systems. The most elegant architecture fails if it doesn't account for the people who build, maintain, and use it. Any architecture fails if it is not oriented to deliver changes in reality without bottlenecks.</p>
            <h3>Current Focus Areas</h3>
            <p>As technology continues to evolve, I'm particularly focused on:</p>
            <ul>
              <li>Integrating generative AI capabilities into enterprise workflows</li>
              <li>Designing systems that balance automation with meaningful human oversight</li>
              <li>Creating architectures that support sustainable business growth</li>
              <li>Mentoring engineering teams on technical excellence and first-principle engineering practices</li>
            </ul>
            <h3>Don't Hesitate to Connect</h3>
            <p>Whether you're facing specific technical challenges or seeking strategic guidance on your system roadmap, I welcome the opportunity to discuss how my experience might benefit your organization. I take on select consulting engagements based on mutual fit and impact potential.</p>
            <p>My approach is collaborative, transparent, and always focused on delivering measurable value. Let's explore how we might work together to turn <span>any of your challenges</span> into opportunities for growth.</p>
            <p>My contact information is provided below.</p>`,
            moreButton: {
                text: "Read more",
                link: "/en/about"
            }
        },
        ru: {
            title: "Обо мне",
            defaultText: `<p>За более чем семь лет в разработке программного обеспечения я приобрел глубокую экспертизу в создании масштабируемых и эффективных систем.</p>
            <p>Мой опыт включает работу с базами данных, облачной инфраструктурой и распределенными системами. Я следую как проверенным временем, так и новым (<span>SoTA</span>) инженерным принципам, постоянно отаачивая свое мастерство в работе над сложными системами.</p>
            <p>Моя специализация — архитектура платформ и интеграция систем на базе генеративного искусственного интеллекта, что позволяет создавать по-настоящему инновационные решения для бизнеса.</p>
            <p>Но все начинается с <span>системной инженерии.</span></p>`,

            fullText: `<p> Я уже семь лет разрабатываю програмные системы – сложные и простые.</p>
            <p>Благодаря разностороннему опыту я построил техническую экспертизу, которая охватывает базы данных, облачные инфраструктуры, распределенные (и монолитные) системы, а также привычку cледовать как классическим, так и <span>SoTA</span> инженерным принципам.</p>
            <p>Я специализируюсь на архитектуре платформ, разработке и интеграции систем на базе <span>генеративного ИИ</span>. Но все самое главное начинается с <span>системной инженерии.</span></p>
            <p>Я всегда стараюсь подходить к каждой конкретной области внимательно и осторожно, собирая как можно больше метрик о ситуации и бизнес-целях, вместо того чтобы сломя голову нестись внедрять "<i>современные архитектурные паттерны</i>" потому что "<i>так делают все</i>".</p>
            <p>Почему логотип моего сайта - топор и к чему все это <i>"хакание"</i>? Потому что я верю, что дотошно "врубаться" - это правильный путь, чтобы понять что происходит на самом деле.</p>
            <h3>Консультационный подход</h3>
            <p>Моя консультационная методика основана на убеждении, что бизнес это такая же сложная система, как и любая программная, они взаимосвязаны и поэтому надо разбираться с ними вместе.</p>
            <p>Технологии должны служить людям и бизнес-целям, а не наоборот.</p>
            <p>Когда я работаю с клиентами, я следую такому структурированному процессу:</p>
            <ol>
              <li><strong>Исследование и нащупывание реальности</strong>: Мы ищем совместное понимание основных бизнес-задач за пределами технических "симптомов" и <span>субъективных</span> идей – что бизнес производит на самом деле? Как повысить эффективность этого производства?</li>
              <li><strong>Разработка стратегии</strong>: Устанавливаем более освязаемую связь между конкретными технологическими решеними и бизнес-результатами, путем разработки и внедрения доступной <span>онтологии</span>, понятной для всех заинтересованных сторон и заземленной на то что мы узнали в первом пункте.</li>
              <li><strong>Планирование реализации</strong>: Создание прагматичных дорожных карт, следуя которым мы сможем перепроверить каждую гипотезу и повторить итерацию до того, как реализуем "технический долг" вместо долгоживущей и надежной системы</li>
              <li><strong>Разработка и передача знаний</strong>: Предоставление решений с гарантией того, что команды клиентов смогут поддерживать и расширять их. Это означает, что онтология, методы и внедренные решения будут <span>процветать</span> дальше без меня</li>
            </ol>
            <h3>Больше, чем просто техническая сторона</h3>
            <p>Что отличает мой подход? Трезвое признание того, что технические системы существуют "внутри" человеческих систем. Самая элегантная архитектура терпит неудачу, если она не учитывает людей, которые ее создают, поддерживают и используют. <span>Любая</span> архитектура терпит крах, если она не ориентирована на внесение изменений в реальность без узких мест и жестких зависимостей на непостоянные факторы.</p>
            <h3>Текущие области фокуса</h3>
            <p>Отвечая на скорость и вектор развития технологий я особенно сосредоточен на:</p>
            <ul>
              <li>Интеграции возможностей генеративного ИИ в корпоративные рабочие процессы, и в бизнес-процессы</li>
              <li>Проектировании систем, которые балансируют автоматизацию с осмысленным человеческим контролем</li>
              <li>Создании архитектур, поддерживающих устойчивый рост бизнеса</li>
              <li>Наставничестве инженерных команд по вопросам технического совершенства и инженерных практик, основанных на первых принципах</li>
            </ul>
            <h3>Не стесняйтесь связаться со мной</h3>
            
            <p>Независимо от того, сталкиваетесь ли вы с конкретными техническими проблемами или ищете стратегическую поддержку по разработке надежной дорожной карты вашей системы, я приветствую возможность найти применение моему опыту в ваших интересах.</p>
            
            <p>Я беру на себя консультационные проекты на основе взаимного соответствия и потенциала воздействия.</p>

            <p>Мой подход основан на сотрудничестве, прозрачности и всегда ориентирован на достижение измеримых результатов. Давайте исследуем, как мы могли бы работать вместе, чтобы превратить <span>любые ваши затруднения</span> в возможности для эволюционного роста.</p>
            
            <p>Моя контактная информация представлена ниже.</p>`,

            moreButton: {
                text: "Узнать больше обо мне",
                link: "/ru/about"
            }
        }
    };

    const {
        title = translations[lang].title,
        showWave = true,
        isAboutMorePage = false,
        text,
        showMoreButton,
        showBlob = true
    } = data;

    // Use provided text or fallback to translation
    // If it's the about page, use full text, otherwise use the shorter version
    const displayText = text || (isAboutMorePage ? translations[lang].fullText : translations[lang].defaultText);

    // Use provided button or fallback to translation
    const buttonData = showMoreButton || translations[lang].moreButton;

    /**
     * Init refs for animations
     */
    const waveRef = useRef(null);
    const ballRef = useRef(null);

    /**
     * Run animations on component mount
     * this have to be in useEffect because of GSP registerPlugin
     */
    useEffect(() => {
        AboutAnimations({
            waveRef: waveRef,
            ballRef: ballRef,
        });
    }, []);

    return (
        <S.AboutStyled $isAboutMorePage={isAboutMorePage} data-dark-section>
            {showWave && <S.AboutWave ref={waveRef} />}
            <Container>
                <FadeIn margin="-15%">
                    <S.AboutTextWrapper>
                        <S.AboutTextStyled>
                            <S.AboutHeadingStyled>{title}</S.AboutHeadingStyled>

                            <div dangerouslySetInnerHTML={{ __html: displayText }} />

                            {!isAboutMorePage && (
                                <S.AboutLinkWrapper>
                                    <a href={buttonData.link}>
                                        {buttonData.text}
                                        <Icon
                                            iconData="arrowDown"
                                            alt="image down"
                                        />
                                    </a>
                                </S.AboutLinkWrapper>
                            )}
                        </S.AboutTextStyled>
                    </S.AboutTextWrapper>
                </FadeIn>
            </Container>
            {showBlob && <S.AboutBall ref={ballRef} />}
        </S.AboutStyled>
    );
};
