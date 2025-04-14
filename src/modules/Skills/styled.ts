import { Container } from "@components/Container";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const SkillsStyled = styled.section`
    background: ${Theme.bgElement};

    position: relative;
    opacity: 0.001;

    padding-top: 90px;

    ${MediaQuery.max("lg")} {
        padding: 40px 0;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    span {
        color: ${Theme.textSecondary};
    }
`;

export const SkillsMainWrapper = styled.div`
    ${MediaQuery.min("lg")} {
        display: flex;
        justify-content: space-between;
    }
`;

export const SkillsContainer = styled(Container)`
    display: grid;
    grid-template-columns: 50% 1fr;
    align-items: flex-start;
    gap: 50px;

    ${MediaQuery.max("lg")} {
        grid-template-columns: 1fr;
        flex-direction: column;
    }
`;

export const SkillsTextWrapper = styled.div`
    ${MediaQuery.max("lg")} {
        width: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
`;

export const SkillsWrapper = styled.div`
    display: grid;

    margin: 0 auto;
    width: 100%;

    ${MediaQuery.min("lg")} {
        position: sticky;

        top: 100px;
    }

    h2 {
        margin: 0;
    }

    span {
        color: ${Theme.tertiary};
    }

    p {
        font-size: 14px;
        line-height: 20px;

        ${MediaQuery.min("lg")} {
            max-width: 450px;
        }
    }
`;

export const SkillsWhatWeDoSingle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${MediaQuery.max("lg")} {
        flex-direction: column;
    }

    &:not(:last-child) {
        margin-bottom: 30px;
        border-bottom: 2px solid ${Theme.tertiary};
    }
`;

export const SkillsTitle = styled.h3`
    color: ${Theme.textSecondary};
    margin: 0;

    font-size: 23px;
    line-height: 25px;
`;

export const SkillsDesc = styled.p`
    color: ${Theme.textSecondary};

    max-width: 700px;
`;

export const SkillsLang = styled.div`
    margin: 20px 0;

    h3 {
        margin: 0;

        font-size: 16px;
        line-height: 25px;
    }

    p {
        margin: 0;

        ${MediaQuery.max("lg")} {
            font-size: 14px;
            line-height: 18px;
        }
    }

    span {
        color: ${Theme.tertiary};
    }
`;
