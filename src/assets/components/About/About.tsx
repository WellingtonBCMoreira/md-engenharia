import styles from "./About.module.css";
import { resolveAssetUrl } from "../../../services/api";

interface AboutProps {
    imageUrl: string;
    title: string;
    highlight: string;
    paragraphs: string[];
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
}

export function About({
    imageUrl,
    title,
    highlight,
    paragraphs,
    whatsapp,
    instagram,
    linkedin
}: AboutProps) {
    return (
        <section className={styles.sobre} id="sobre">
            <div className={styles.interface}>
                <div className={styles.flex}>
                    <div className={styles.imgSobre}>
                        <img src={resolveAssetUrl(imageUrl)} alt="Sobre" />
                    </div>

                    <div className={styles.txtSobre}>
                        <h2>
                            {title} <span>{highlight}</span>
                        </h2>

                        {paragraphs.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}

                        <div className={styles.btnSocial}>
                            {whatsapp && (
                                <a href={whatsapp} target="_blank">
                                    <button><i className="bi bi-whatsapp" /></button>
                                </a>
                            )}

                            {instagram && (
                                <a href={instagram} target="_blank">
                                    <button><i className="bi bi-instagram" /></button>
                                </a>
                            )}

                            {linkedin && (
                                <a href={linkedin} target="_blank">
                                    <button><i className="bi bi-linkedin" /></button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
