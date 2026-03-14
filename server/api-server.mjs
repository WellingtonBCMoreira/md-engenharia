import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { cwd } from "node:process";
import { App } from "@tinyhttp/app";
import { cors } from "@tinyhttp/cors";
import { json } from "milliparsec";
import sirv from "sirv";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Service, isItem } from "json-server/lib/service.js";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "localhost";
const db = new Low(new JSONFile("db.json"), {});
await db.read();
db.data ||= {};

const service = new Service(db);
const app = new App();

app.use(sirv("public", { dev: true }));
app.use((req, res, next) => {
  return cors({
    allowedHeaders: req.headers["access-control-request-headers"]
      ?.split(",")
      .map(header => header.trim()),
  })(req, res, next);
});
app.options("*", cors());
// @ts-expect-error parser middleware typing
app.use(json());

function sanitizeFileName(fileName = "imagem") {
  return fileName
    .normalize("NFD")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function extractExtension(fileName, mimeType) {
  const fromName = extname(fileName || "").toLowerCase();
  if (fromName) return fromName;

  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  if (mimeType === "image/gif") return ".gif";
  return ".jpg";
}

app.post("/upload-image", async (req, res) => {
  const { fileName, content, mimeType } = req.body || {};

  if (!fileName || !content || typeof content !== "string") {
    return res.status(400).json({ message: "Arquivo invalido." });
  }

  const matches = content.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    return res.status(400).json({ message: "Conteudo da imagem invalido." });
  }

  const safeBaseName = sanitizeFileName(fileName).replace(/\.[^.]+$/, "") || `imagem-${Date.now()}`;
  const extension = extractExtension(fileName, mimeType || matches[1]);
  const finalName = `${safeBaseName}-${Date.now()}${extension}`;
  const imagesDir = join(cwd(), "public", "images");
  const finalPath = join(imagesDir, finalName);
  const buffer = Buffer.from(matches[2], "base64");

  await mkdir(imagesDir, { recursive: true });
  await writeFile(finalPath, buffer);

  return res.status(201).json({ imageUrl: `/images/${finalName}` });
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", endpoints: Object.keys(db.data || {}) });
});

app.get("/:name", (req, res, next) => {
  const { name = "" } = req.params;
  const query = Object.fromEntries(
    Object.entries(req.query)
      .map(([key, value]) => {
        if (["_start", "_end", "_limit", "_page", "_per_page"].includes(key) && typeof value === "string") {
          return [key, parseInt(value, 10)];
        }
        return [key, value];
      })
      .filter(([, value]) => !Number.isNaN(value))
  );
  res.locals["data"] = service.find(name, query);
  next?.();
});

app.get("/:name/:id", (req, res, next) => {
  const { name = "", id = "" } = req.params;
  res.locals["data"] = service.findById(name, id, req.query);
  next?.();
});

app.post("/:name", async (req, res, next) => {
  const { name = "" } = req.params;
  if (isItem(req.body)) {
    res.locals["data"] = await service.create(name, req.body);
  }
  next?.();
});

app.put("/:name", async (req, res, next) => {
  const { name = "" } = req.params;
  if (isItem(req.body)) {
    res.locals["data"] = await service.update(name, req.body);
  }
  next?.();
});

app.put("/:name/:id", async (req, res, next) => {
  const { name = "", id = "" } = req.params;
  if (isItem(req.body)) {
    res.locals["data"] = await service.updateById(name, id, req.body);
  }
  next?.();
});

app.patch("/:name", async (req, res, next) => {
  const { name = "" } = req.params;
  if (isItem(req.body)) {
    res.locals["data"] = await service.patch(name, req.body);
  }
  next?.();
});

app.patch("/:name/:id", async (req, res, next) => {
  const { name = "", id = "" } = req.params;
  if (isItem(req.body)) {
    res.locals["data"] = await service.patchById(name, id, req.body);
  }
  next?.();
});

app.delete("/:name/:id", async (req, res, next) => {
  const { name = "", id = "" } = req.params;
  res.locals["data"] = await service.destroyById(name, id, req.query["_dependent"]);
  next?.();
});

app.use("/:name", (req, res) => {
  const { data } = res.locals;
  if (data === undefined) {
    res.sendStatus(404);
  } else {
    if (req.method === "POST") res.status(201);
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`API com upload rodando em http://${host}:${port}`);
});
