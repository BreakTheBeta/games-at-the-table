import QRCode from "qrcode";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8");
for (const [slug, title] of [
  ["lovecraft-letter", "Lovecraft Letter"],
  ["clank-catacombs", "Clank! Catacombs"],
  ["citadels", "Citadels"],
]) {
  await mkdir(`dist/${slug}`, { recursive: true });
  await writeFile(
    `dist/${slug}/index.html`,
    html.replace(
      "Games at the table · Pocket field guides",
      `${title} · Pocket field guide`,
    ),
  );
}

// Optional static PNG endpoints for printed/download links. In-page sharing always
// uses the current browser origin, even when SITE_URL is not configured.
if (process.env.SITE_URL) {
  const base = new URL(process.env.SITE_URL);
  await mkdir("dist/qr", { recursive: true });
  for (const slug of [
    "games",
    "lovecraft-letter",
    "clank-catacombs",
    "citadels",
  ]) {
    const path = slug === "games" ? "/" : `/${slug}/`;
    await QRCode.toFile(`dist/qr/${slug}.png`, new URL(path, base).href, {
      width: 800,
      margin: 4,
      errorCorrectionLevel: "M",
      color: { dark: "#18181b", light: "#ffffff" },
    });
  }
}
