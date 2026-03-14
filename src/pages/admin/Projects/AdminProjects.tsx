import { useEffect, useState } from "react";
import { getProjects, updateProjects } from "../../../services/api";
import styles from "../_shared/AdminPage.module.css";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { AdminImageField } from "../_shared/AdminImageField";

interface ProjectItem {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
}

export function AdminProjects() {
    const [sectionTitle, setSectionTitle] = useState("");
    const [items, setItems] = useState<ProjectItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [itemTitle, setItemTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects()
            .then(data => {
                setSectionTitle(data.title || "");
                setItems(
                    (data.items || []).map((item: Omit<ProjectItem, "id">, index: number) => ({
                        id: `project-${index}`,
                        ...item,
                    }))
                );
            })
            .catch(() => setError("Erro ao carregar projetos."))
            .finally(() => setLoading(false));
    }, []);

    function resetForm() {
        setEditingId(null);
        setItemTitle("");
        setImageUrl("");
        setDescription("");
    }

    function startEdit(item: ProjectItem) {
        setEditingId(item.id);
        setItemTitle(item.title);
        setImageUrl(item.imageUrl);
        setDescription(item.description);
    }

    function addItem() {
        if (!itemTitle || !imageUrl || !description) return;

        setItems([
            ...items,
            {
                id: crypto.randomUUID(),
                title: itemTitle,
                imageUrl,
                description,
            },
        ]);
        resetForm();
    }

    function updateItem() {
        if (!editingId) return;

        setItems(
            items.map(item =>
                item.id === editingId
                    ? { ...item, title: itemTitle, imageUrl, description }
                    : item
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
            await updateProjects({
                title: sectionTitle,
                items: items.map(({ id, ...item }) => item),
            });
            setSuccess(true);
        } catch {
            setError("Erro ao salvar projetos.");
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
                            <h2 className={styles.title}>Editar Projetos</h2>
                            <p className={styles.subtitle}>Gerencie o titulo da secao e os cards exibidos em Nossos Projetos.</p>
                        </div>

                        {loading ? (
                            <p className={styles.notice}>Carregando dados...</p>
                        ) : (
                            <>
                                <div className={styles.field}>
                                    <label>Titulo da secao</label>
                                    <input value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} />
                                </div>

                                <div className={styles.field}>
                                    <label>Titulo do projeto</label>
                                    <input value={itemTitle} onChange={e => setItemTitle(e.target.value)} />
                                </div>

                                <AdminImageField label="Imagem do projeto" value={imageUrl} onChange={setImageUrl} placeholder="/images/projeto1.jpg" />

                                <div className={styles.field}>
                                    <label>Descricao</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                                </div>

                                <div className={styles.actions}>
                                    {!editingId ? (
                                        <button type="button" onClick={addItem}>Adicionar projeto</button>
                                    ) : (
                                        <button type="button" onClick={updateItem}>Atualizar projeto</button>
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
                                            <p className={styles.listItemText}>{item.imageUrl}</p>
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

                        {success && <p className={styles.success}>Projetos atualizados com sucesso.</p>}
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
