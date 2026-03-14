import styles from "./SolarCalculator.module.css";

export function SolarCalculator() {
    return (
        <section className={styles.calculator}>
            <div className={styles.frameWrapper}>
                <iframe
                    src="https://azume.com.br/simulador/65eb0456acb0c90015b5d61b"
                    title="Simulador solar"
                    width="100%"
                    height="800"
                    className={styles.frame}
                    scrolling="no"
                    loading="lazy"
                />
            </div>
        </section>
    );
}
