import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { isMobile } from "react-device-detect";

type FooterAnimationsProps = {
    waveRef: React.RefObject<HTMLDivElement>;
    blobRef: React.RefObject<HTMLDivElement>;
    textRef: React.RefObject<HTMLDivElement>;
};

/**
 *  Footer animations
 * @FooterAnimations
 * @param waveRef - wave reference
 * @param blobRef - blob reference
 * @param textRef - text reference
 */
export const FooterAnimations = ({
    waveRef,
    blobRef,
    textRef,
}: FooterAnimationsProps) => {
    gsap.registerPlugin(ScrollTrigger);

    /*
     * make wave bigger on scroll
     * @makeWaveBigger
     */
    gsap.to(waveRef.current, {
        scrollTrigger: {
            trigger: waveRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
        },
        height: isMobile ? 200 : 250,
    });

    /**
     * on scroll blob animations
     * @moveTopBottom
     */
    gsap.to(blobRef.current, {
        scrollTrigger: {
            trigger: blobRef.current,
            start: "top 40%",
            end: "bottom 20%",
            scrub: 1,
        },
        y: isMobile ? 0 : 150,
        x: isMobile ? 0 : -150,
    });

    /**
     * fade in text on scroll
     * @fadeInText
     */
    gsap.from(textRef.current, {
        scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1,
    });
};
