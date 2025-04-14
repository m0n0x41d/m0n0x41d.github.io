import { Image } from "@static/images";
import * as S from "./styled";

export type ProjectSingleProps = {
    work: {
        link: string;
        image: string;
        title: string;
        description: string;
    };
};

export const ProjectSingle = ({ work }: ProjectSingleProps) => {
    return (
        <S.ProjectAllSingle
            href={work.link}
            target="_blank"
            className="works-load"
        >
            <S.ProjectAllSingleFigure>
                <Image src={work.image} alt={work.title} />
            </S.ProjectAllSingleFigure>
            <S.ProjectAllSingleContent>
                <h2>{work.title}</h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: work.description,
                    }}
                />
                <span className="link">view project</span>
            </S.ProjectAllSingleContent>
        </S.ProjectAllSingle>
    );
};
