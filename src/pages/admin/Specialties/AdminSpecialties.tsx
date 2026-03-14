import { useEffect, useState } from "react";
import { getSpecialties, updateSpecialties } from "../../../services/api";
import styles from "../_shared/AdminPage.module.css";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";

interface SpecialtyItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export function AdminSpecialties() {
    const [sectionTitle, setSectionTitle] = useState("");
    const [items, setItems] = useState<SpecialtyItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [icon, setIcon] = useState("");
    const [itemTitle, setItemTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getSpecialties()
            .then(data => {
                setSectionTitle(data.title || "");
                setItems(
                    (data.items || []).map((item: SpecialtyItem, index: number) => ({
                        ...item,
                        id: item.id || `specialty-${index}`,
                    }))
                );
            })
            .catch(() => setError("Erro ao carregar especialidades."))
            .finally(() => setLoading(false));
    }, []);

    function startEdit(item: SpecialtyItem) {
        setEditingId(item.id);
        setIcon(item.icon);
        setItemTitle(item.title);
        setDescription(item.description);
    }

    function resetForm() {
        setEditingId(null);
        setIcon("");
        setItemTitle("");
        setDescription("");
    }

    function addItem() {
        if (!icon || !itemTitle || !description) return;

        setItems([
            ...items,
            {
                id: crypto.randomUUID(),
                icon,
                title: itemTitle,
                description,
            },
        ]);
        resetForm();
    }

    function updateItem() {
        if (!editingId) return;

        setItems(
            items.map(item =>
                item.id === editingId ? { ...item, icon, title: itemTitle, description } : item
            )
        );
        resetForm();
    }

    function removeItem(id: string) {
        setItems(items.filter(item => item.id !== id));
        if (editingId === id) {
            resetForm();
        }
    }

    async function handleSaveAll() {
        setSaving(true);
        setSuccess(false);
        setError(null);

        try {
            await updateSpecialties({
                title: sectionTitle,
                items: items.map(({ id, ...item }) => item),
            });
            setSuccess(true);
        } catch {
            setError("Erro ao salvar especialidades.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.card}>
                    <div className={styles.stack}>
                        <div>
                            <h2 className={styles.title}>Editar Especialidades</h2>
                            <p className={styles.subtitle}>Gerencie o titulo da secao e os itens exibidos no site.</p>
                        </div>

                        {loading ? (
                            <p className={styles.notice}>Carregando dados...</p>
                        ) : (
                            <>
                                <div className={styles.field}>
                                    <label>Titulo da secao</label>
                                    <input value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} />
                                </div>

                                <div className={styles.grid}>
                                    <div className={styles.field}>
                                        <label>Icone (Bootstrap Icons)</label>
                                        <input placeholder="bi-sun" value={icon} onChange={e => setIcon(e.target.value)} />
                                    </div>

                                    <div className={styles.field}>
                                        <label>Titulo da especialidade</label>
                                        <input value={itemTitle} onChange={e => setItemTitle(e.target.value)} />
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label>Descricao</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                                </div>

                                <div className={styles.actions}>
                                    {!editingId ? (
                                        <button type="button" onClick={addItem}>Adicionar item</button>
                                    ) : (
                                        <button type="button" onClick={updateItem}>Atualizar item</button>
                                    )}

                                    {editingId && (
                                        <button type="button" className={styles.secondaryButton} onClick={resetForm}>
                                            Cancelar edicao
                                        </button>
                                    )}
                                </div>

                                <div className={styles.list}>
                                    {items.map(item => (
                                        <div key={item.id} className={styles.listItem}>
                                            <strong className={styles.listItemTitle}>{item.title}</strong>
                                            <p className={styles.listItemText}>{item.description}</p>
                                            <div className={styles.actions}>
                                                <button type="button" onClick={() => startEdit(item)}>Editar</button>
                                                <button type="button" className={styles.secondaryButton} onClick={() => removeItem(item.id)}>
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.actions}>
                                    <button type="button" onClick={handleSaveAll} disabled={saving}>
                                        {saving ? "Salvando..." : "Salvar todas as alteracoes"}
                                    </button>
                                </div>
                            </>
                        )}

                        {success && <p className={styles.success}>Especialidades atualizadas com sucesso.</p>}
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
