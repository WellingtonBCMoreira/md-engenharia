import { useEffect, useState } from "react";
import { getContact, updateContact } from "../../../services/api";
import styles from "../_shared/AdminPage.module.css";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";

export function AdminContact() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getContact()
            .then(data => {
                setTitle(data.title || "");
                setSubtitle(data.subtitle || "");
                setWhatsapp(data.whatsapp || "");
                setEmail(data.email || "");
            })
            .catch(() => setError("Erro ao carregar dados de contato"))
            .finally(() => setLoading(false));
    }, []);

    async function handleSave() {
        setSaving(true);
        setSuccess(false);
        setError(null);

        try {
            await updateContact({ title, subtitle, whatsapp, email });
            setSuccess(true);
        } catch {
            setError("Erro ao salvar dados");
        } finally {
            setSaving(false);
        }
    }

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Editar Contato</h2>
                    <p className={styles.subtitle}>Defina os dados usados na secao Fale Conosco e no envio para WhatsApp.</p>

                    {loading ? (
                        <p className={styles.notice}>Carregando dados...</p>
                    ) : (
                        <>
                            <div className={styles.field}>
                                <label>Titulo</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <div className={styles.field}>
                                <label>Subtitulo</label>
                                <textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} />
                            </div>

                            <div className={styles.grid}>
                                <div className={styles.field}>
                                    <label>WhatsApp</label>
                                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="5575999999999" />
                                </div>

                                <div className={styles.field}>
                                    <label>E-mail</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button onClick={handleSave} disabled={saving}>
                                    {saving ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </>
                    )}

                    {success && <p className={styles.success}>Dados salvos com sucesso.</p>}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </AdminLayout>
    );
}
