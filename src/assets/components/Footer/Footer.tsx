import styles from "./Footer.module.css";
import { resolveAssetUrl } from "../../../services/api";

interface FooterProps {
    logoUrl?: string;
}

export function Footer({ logoUrl = "/images/logo.png" }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.interface}>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <a href="/admin/login" title="Acesso administrativo">
                            <img src={resolveAssetUrl(logoUrl)} alt="MD Engenharia" />
                        </a>
                    </div>

                    <div className={styles.social}>
                        <a href="https://wa.me/5511959364212">
                            <button><i className="bi bi-whatsapp"></i></button>
                        </a>
                        <a href="#">
                            <button><i className="bi bi-instagram"></i></button>
                        </a>
                        <a href="#">
                            <button><i className="bi bi-linkedin"></i></button>
                        </a>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>
                        <i className="bi bi-envelope"></i>
                        <a href="mailto:wellingtonbat@gmail.com">
                            contato@mdengenharia.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
