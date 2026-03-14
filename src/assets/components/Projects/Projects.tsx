import styles from "./Projects.module.css";
import { resolveAssetUrl } from "../../../services/api";

interface ProjectItem {
    title: string;
    imageUrl: string;
    description: string;
}

interface ProjectsProps {
    title: string;
    items: ProjectItem[];
}

export function Projects({ title, items }: ProjectsProps) {
    const [firstWord, ...restTitle] = title.split(" ");

    return (
        <section className={styles.projects} id="projetos">
            <div className={styles.interface}>
                <h2 className={styles.title}>
                    {firstWord} <span>{restTitle.join(" ")}</span>
                </h2>

                <div className={styles.flex}>
                    {items.map((project, index) => (
                        <div
                            key={index}
                            className={styles.project}
                            style={{ backgroundImage: `url(${resolveAssetUrl(project.imageUrl)})` }}
                        >
                            <div className={styles.overlay}>
                                <div className={styles.content}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>
                                        {project.description || "Descricao em atualizacao."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
