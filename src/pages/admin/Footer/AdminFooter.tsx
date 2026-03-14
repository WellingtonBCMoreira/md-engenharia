import { useEffect, useState } from "react";
import { getFooter, updateFooter } from "../../../services/api";
import styles from "../_shared/AdminPage.module.css";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { AdminImageField } from "../_shared/AdminImageField";

export function AdminFooter() {
    const [logoUrl, setLogoUrl] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [copyright, setCopyright] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getFooter()
            .then(data => {
                setLogoUrl(data.logoUrl || "");
                setCompanyName(data.companyName || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setCopyright(data.copyright || "");
            })
            .catch(() => setError("Erro ao carregar footer"))
            .finally(() => setLoading(false));
    }, []);

    async function handleSave() {
        setSaving(true);
        setSuccess(false);
        setError(null);

        try {
            await updateFooter({ logoUrl, companyName, email, phone, copyright });
            setSuccess(true);
        } catch {
            setError("Erro ao salvar footer");
        } finally {
            setSaving(false);
        }
    }

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Editar Rodape</h2>
                    <p className={styles.subtitle}>Atualize logo e dados exibidos no rodape do site.</p>

                    {loading ? (
                        <p className={styles.notice}>Carregando dados...</p>
                    ) : (
                        <>
                            <AdminImageField label="Logo do site" value={logoUrl} onChange={setLogoUrl} placeholder="/images/logo.png" />

                            <div className={styles.field}>
                                <label>Nome da empresa</label>
                                <input value={companyName} onChange={e => setCompanyName(e.target.value)} />
                            </div>

                            <div className={styles.grid}>
                                <div className={styles.field}>
                                    <label>E-mail</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} />
                                </div>

                                <div className={styles.field}>
                                    <label>Telefone</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label>Copyright</label>
                                <textarea value={copyright} onChange={e => setCopyright(e.target.value)} disabled readOnly />                            </div>

                            <div className={styles.actions}>
                                <button onClick={handleSave} disabled={saving}>
                                    {saving ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </>
                    )}

                    {success && <p className={styles.success}>Footer atualizado com sucesso.</p>}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </AdminLayout>
    );
}
