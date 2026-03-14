import styles from "./Hero.module.css";
import { resolveAssetUrl } from "../../../services/api";

interface HeroProps {
    imageUrl?: string;
    title: string;
    description: string;
}

export function Hero({ imageUrl, title, description }: HeroProps) {
    return (
        <section className={styles.hero} id="inicio">
            <div className={styles.container}>
                <div className={styles.text}>
                    <h1>
                        {title}
                        <span>.</span>
                    </h1>
                    <p>
                        {description}
                    </p>

                    <div className={styles.actions}>
                        <a href="#formulario" className={styles.contactButton}>
                            Entre em contato
                        </a>
                    </div>
                </div>

                <div className={styles.image}>
                    {imageUrl ? (
                        <img src={resolveAssetUrl(imageUrl)} alt={title} className={styles.heroImage} />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
