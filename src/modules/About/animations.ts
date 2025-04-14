import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { isMobile } from "react-device-detect";

type AnimationEl = React.RefObject<HTMLDivElement>;

type AboutAnimationsProps = {
    waveRef: AnimationEl;
    ballRef: AnimationEl;
};
/**
 * About page animations
 * Store all animations for about page in one place
 * @param {AboutAnimationsProps} props - Animation properties 
 */
export const AboutAnimations = ({ ballRef, waveRef }: AboutAnimationsProps) => {
    gsap.registerPlugin(ScrollTrigger);

    /*
     * make wave bigger on scroll
     * @makeWaveBigger
     */
    if (waveRef.current) {
        gsap.to(waveRef.current, {
            scrollTrigger: {
                trigger: waveRef.current,
                start: "top 80%",
                end: "bottom top",
                scrub: 1,
            },
            height: isMobile ? 200 : 250,
        });
    }

    /**
     * move ball on scroll and make it a little bit bigger
     * @moveBall
     */
    if (ballRef.current) {
        gsap.to(ballRef.current, {
            scrollTrigger: {
                trigger: ballRef.current,
                start: isMobile ? "top 10%" : "top 10%",
                end: "bottom top",
                scrub: 1,
            },
            scale: 3,
            y: isMobile ? 100 : 300,
        });

        gsap.to(ballRef.current, {
            scrollTrigger: {
                trigger: ballRef.current,
                start: isMobile ? "top 80%" : "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            opacity: 1,
        });
    }
};
