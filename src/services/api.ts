const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function resolveAssetUrl(url?: string | null) {
  if (!url) return "";
  if (/^(https?:|data:|blob:)/i.test(url)) return url;

  try {
    return new URL(url, API_URL).toString();
  } catch {
    return url;
  }
}

export async function uploadImage(file: File) {
  const fileContent = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Erro ao ler arquivo."));
    reader.readAsDataURL(file);
  });

  const response = await fetch(`${API_URL}/upload-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      mimeType: file.type,
      content: fileContent,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar imagem.");
  }

  return response.json() as Promise<{ imageUrl: string }>;
}

export async function getHero() {
  const response = await fetch(`${API_URL}/hero`);
  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }
  return response.json();
}

export async function updateHero(data: {
  imageUrl: string;
  title: string;
  description: string;
}) {
  const response = await fetch(`${API_URL}/hero`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update hero data");
  }
  return response.json();
}

export async function getAbout() {
  const response = await fetch(`${API_URL}/about`);
  if (!response.ok) {
    throw new Error("Failed to fetch about data");
  }
  return response.json();
}

export async function updateAbout(data: {
  imageUrl: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  social: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
  };
}) {
  const response = await fetch(`${API_URL}/about`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update about data");
  }
  return response.json();
}

export async function getSpecialties() {
  const response = await fetch(`${API_URL}/especialties`);
  if (!response.ok) throw new Error("Erro ao buscar especialidades");
  return response.json();
}

export async function updateSpecialties(data: {
  title: string;
  items: {
    id?: string;
    icon: string;
    title: string;
    description: string;
  }[];
}) {
  const response = await fetch(`${API_URL}/especialties`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar especialidades");
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error("Erro ao buscar projetos");
  return response.json();
}

export async function updateProjects(data: {
  title: string;
  items: {
    title: string;
    imageUrl: string;
    description: string;
  }[];
}) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar projetos");
  }

  return response.json();
}

export async function getContact() {
  const response = await fetch(`${API_URL}/contact`);
  if (!response.ok) throw new Error("Erro ao buscar dados de contato");
  return response.json();
}

export async function updateContact(data: {
  title: string;
  subtitle: string;
  whatsapp: string;
  email: string;
}) {
  const response = await fetch(`${API_URL}/contact`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar dados de contato");
  }
  return response.json();
}

export async function getFooter() {
  const response = await fetch(`${API_URL}/footer`);
  if (!response.ok) {
    throw new Error("Erro ao buscar footer");
  }
  return response.json();
}

export async function updateFooter(data: {
  logoUrl: string;
  companyName: string;
  email: string;
  phone: string;
  copyright: string;
}) {
  const response = await fetch(`${API_URL}/footer`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar footer");
  }

  return response.json();
}
