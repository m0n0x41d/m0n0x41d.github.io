import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { isMobile } from "react-device-detect";

type WorkAnimationsProps = {
    firstHalf: React.RefObject<HTMLDivElement>;
    secondHalf: React.RefObject<HTMLDivElement>;
};

export const WorkAnimations = ({
    firstHalf,
    secondHalf,
}: WorkAnimationsProps) => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(firstHalf.current, {
        scrollTrigger: {
            trigger: firstHalf.current,
            start: isMobile ? "top 70%" : "top 80%",
            end: "bottom top",
            scrub: 1,
        },
        x: isMobile ? 200 : 200,
    });
    gsap.to(secondHalf.current, {
        scrollTrigger: {
            trigger: secondHalf.current,
            start: isMobile ? "top 70%" : "top 80%",
            end: "bottom top",
            scrub: 1,
        },
        x: isMobile ? -200 : -200,
    });
};
