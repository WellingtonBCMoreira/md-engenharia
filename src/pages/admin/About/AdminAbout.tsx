import { useEffect, useState } from "react";
import styles from "../_shared/AdminPage.module.css";
import { getAbout, updateAbout } from "../../../services/api";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { AdminImageField } from "../_shared/AdminImageField";

export function AdminAbout() {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [highlight, setHighlight] = useState("");
    const [paragraphOne, setParagraphOne] = useState("");
    const [paragraphTwo, setParagraphTwo] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAbout()
            .then(data => {
                setImageUrl(data.imageUrl || "");
                setTitle(data.title || "");
                setHighlight(data.highlight || "");
                setParagraphOne(data.paragraphs?.[0] || "");
                setParagraphTwo(data.paragraphs?.[1] || "");
                setWhatsapp(data.social?.whatsapp || "");
                setInstagram(data.social?.instagram || "");
                setLinkedin(data.social?.linkedin || "");
            })
            .catch(() => setError("Erro ao carregar dados do sobre."))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);
        setError(null);

        try {
            await updateAbout({
                imageUrl,
                title,
                highlight,
                paragraphs: [paragraphOne, paragraphTwo],
                social: {
                    whatsapp,
                    instagram,
                    linkedin,
                },
            });
            setSuccess(true);
        } catch {
            setError("Erro ao salvar alteracoes.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Editar Sobre</h2>
                    <p className={styles.subtitle}>Ajuste imagem, textos e links sociais da secao Sobre.</p>

                    {loading ? (
                        <p className={styles.notice}>Carregando dados...</p>
                    ) : (
                        <>
                            <AdminImageField label="Imagem da secao" value={imageUrl} onChange={setImageUrl} placeholder="/images/about.jpg" />

                            <div className={styles.grid}>
                                <div className={styles.field}>
                                    <label>Titulo</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} />
                                </div>

                                <div className={styles.field}>
                                    <label>Destaque</label>
                                    <input value={highlight} onChange={e => setHighlight(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label>Primeiro paragrafo</label>
                                <textarea value={paragraphOne} onChange={e => setParagraphOne(e.target.value)} />
                            </div>

                            <div className={styles.field}>
                                <label>Segundo paragrafo</label>
                                <textarea value={paragraphTwo} onChange={e => setParagraphTwo(e.target.value)} />
                            </div>

                            <div className={styles.grid}>
                                <div className={styles.field}>
                                    <label>WhatsApp</label>
                                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                                </div>

                                <div className={styles.field}>
                                    <label>Instagram</label>
                                    <input value={instagram} onChange={e => setInstagram(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label>LinkedIn</label>
                                <input value={linkedin} onChange={e => setLinkedin(e.target.value)} />
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
