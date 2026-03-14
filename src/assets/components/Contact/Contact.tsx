import styles from "./Contact.module.css";
import { useState, type FormEvent } from "react";

interface ContactProps {
    whatsappNumber?: string;
}

export function Contact({ whatsappNumber = "5511999999999" }: ContactProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const whatsappMessage = [
            `Me chamo ${name}.`,
            `Meu e-mail e ${email}.`,
            `Meu telefone e ${phone}.`,
            `Mensagem: ${message}`,
        ].join(" ");

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
        );
    }

    return (
        <section className={styles.contact} id="formulario">
            <div className={styles.interface}>
                <h2 className={styles.title}>
                    FALE <span>CONOSCO.</span>
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="tel"
                        placeholder="Seu telefone"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Sua mensagem"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        required
                    />

                    <div className={styles.actions}>
                        <button type="submit">
                            ENVIAR
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
