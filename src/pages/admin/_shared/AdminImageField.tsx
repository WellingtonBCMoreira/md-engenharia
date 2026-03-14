import { useState, type ChangeEvent } from "react";
import styles from "./AdminPage.module.css";
import { IMAGE_OPTIONS } from "./imageOptions";
import { resolveAssetUrl, uploadImage } from "../../../services/api";

interface AdminImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdminImageField({
  label,
  value,
  onChange,
  placeholder = "/images/minha-imagem.jpg",
}: AdminImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const response = await uploadImage(file);
      onChange(response.imageUrl);
    } catch {
      setError("Nao foi possivel enviar a imagem.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div className={styles.imageField}>
        <select
          value={IMAGE_OPTIONS.includes(value) ? value : ""}
          onChange={event => {
            if (event.target.value) {
              onChange(event.target.value);
            }
          }}
        >
          <option value="">Selecionar imagem existente</option>
          {IMAGE_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
        />

        <label className={styles.uploadField}>
          <span>{uploading ? "Enviando imagem..." : "Enviar nova imagem"}</span>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      </div>

      <p className={styles.notice}>
        Escolha uma imagem em <code>/images</code>, informe o caminho manualmente ou envie um novo arquivo.
      </p>

      {error ? <p className={styles.error}>{error}</p> : null}

      {value ? (
        <div className={styles.imagePreview}>
          <img src={resolveAssetUrl(value)} alt={label} />
        </div>
      ) : null}
    </div>
  );
}
