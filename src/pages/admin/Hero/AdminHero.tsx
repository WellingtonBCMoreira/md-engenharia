import { useEffect, useState } from "react";
import styles from "../_shared/AdminPage.module.css";
import { getHero, updateHero } from "../../../services/api";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { AdminImageField } from "../_shared/AdminImageField";

export function AdminHero() {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [initialLoading, setInitialLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getHero()
            .then(data => {
                setImageUrl(data.imageUrl || "");
                setTitle(data.title || "");
                setDescription(data.description || "");
            })
            .catch(() => setError("Erro ao carregar dados do hero."))
            .finally(() => setInitialLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);
        setError(null);

        try {
            await updateHero({ imageUrl, title, description });
            setSuccess(true);
        } catch {
            setError("Erro ao atualizar hero.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Editar Hero</h2>
                    <p className={styles.subtitle}>Atualize imagem e texto principal exibidos na capa do site.</p>

                    {initialLoading ? (
                        <p className={styles.notice}>Carregando dados...</p>
                    ) : (
                        <>
                            <AdminImageField label="Imagem do hero" value={imageUrl} onChange={setImageUrl} placeholder="/images/hero.jpg" />

                            <div className={styles.field}>
                                <label>Titulo</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <div className={styles.field}>
                                <label>Descricao</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                            </div>

                            <div className={styles.actions}>
                                <button type="button" onClick={handleSave} disabled={saving}>
                                    {saving ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </>
                    )}

                    {success && <p className={styles.success}>Alteracoes salvas com sucesso.</p>}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </AdminLayout>
    );
}
