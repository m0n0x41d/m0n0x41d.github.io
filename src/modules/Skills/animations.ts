import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

type SkillsAnimationsProps = {
    textRef: React.RefObject<HTMLDivElement>;
    skillsWrapperRef: React.RefObject<HTMLDivElement>;
    skillsRef: React.RefObject<HTMLDivElement>;
    firstHalfRef: React.RefObject<HTMLDivElement>;
    secondHalfRef: React.RefObject<HTMLDivElement>;
};

/**
 *  Skills page animations
 * Store all animations for skills page in one place
 * @param {SkillsAnimationsProps} props - Animation properties
 */
export const AnimationsSkills = ({
    textRef,
    skillsWrapperRef,
    skillsRef,
}: SkillsAnimationsProps) => {
    gsap.registerPlugin(ScrollTrigger);

    /**
     * fade in text on scroll
     * @fadeInText
     */

    gsap.to(skillsRef.current, {
        opacity: 1,
    });

    gsap.from([textRef.current, skillsWrapperRef.current], {
        scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
        },
        delay: 0.5,
        y: 350,
        opacity: 0,
        duration: 1,
    });
};
