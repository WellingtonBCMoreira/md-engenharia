import styles from "./Specialties.module.css";

interface SpecialtiesItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

interface SpecialtiesProps {
    title: string;
    items: SpecialtiesItem[];
}

export function Specialties({ title, items }: SpecialtiesProps) {
    return (
        <section className={styles.services} id="especialidades">
            <div className={styles.interface}>
                <h2 className={styles.title}>
                    {title.split(" ")[0]} <span>{title.split(" ")[1]}</span>
                </h2>

                <div className={styles.flex}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.box}>
                            <i className={`bi ${item.icon}`}></i>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}