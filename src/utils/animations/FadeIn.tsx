import React, { useEffect, useRef, type FC } from "react";
import * as S from "./styled";

type FadeInProps = {
    children: React.ReactNode | string | TrustedHTML;
    delay?: number | string;
    margin?: string;
};

export const FadeIn: FC<FadeInProps> = ({ children, delay, margin }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(
                            () => {
                                entry.target.classList.add("visible");
                            },
                            delay ? Number(delay) * 1000 : 0
                        );
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            {
                root: null,
                rootMargin: margin || "0px",
                threshold: 0.1,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <S.FadeInStyled ref={elementRef}>
            {children as React.ReactNode}
        </S.FadeInStyled>
    );
};
