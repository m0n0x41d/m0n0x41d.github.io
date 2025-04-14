import * as S from "./styles";
import { Icon } from "@static/icons";

interface SocialProps {
    title?: string;
    className?: string;
}

/**
 * Social component links to social media
 */
export const Social = ({ title = "Social Media", ...rest }: SocialProps) => {
    return (
        <S.SocialWrapper {...rest}>
            <h3>{title}</h3>
            <S.SocialIconsWrapper>
                <a
                    href="https://github.com/m0n0x41d"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon iconData="github" alt="github link" />
                </a>
                <a
                    href="https://www.linkedin.com/in/ivan-zakutnii/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon iconData="linkedin" alt="linkedin link" />
                </a>
                <a
                    href="https://t.me/m0n0x41d"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon iconData="telegram" alt="telegram link" />
                </a>
            </S.SocialIconsWrapper>
        </S.SocialWrapper>
    );
};
