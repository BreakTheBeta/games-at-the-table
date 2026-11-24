import { useEffect, useState } from "react";
import { Button, Card, Chip, Link } from "@heroui/react";
import QRCode from "qrcode";

export function ShareCard({ guide = false }: { guide?: boolean }) {
  const path = guide ? window.location.pathname.replace(/\/$/, "") + "/" : "/";
  const url = new URL(path, window.location.origin).href;
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState("");
  const [qrError, setQrError] = useState(false);
  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, {
      width: 800,
      margin: 4,
      errorCorrectionLevel: "M",
      color: { dark: "#101c18", light: "#ffffff" },
    })
      .then((data) => {
        if (active) setQr(data);
      })
      .catch(() => {
        if (active) setQrError(true);
      });
    return () => {
      active = false;
    };
  }, [url]);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied. Ready to share.");
    } catch {
      setStatus("Copy the link shown below to share this page.");
    }
  }
  return (
    <Card className="panel share-panel" aria-labelledby="share-title">
      <Card.Header>
        <p className="eyebrow">Bring everyone along</p>
        <h2 id="share-title">
          {guide ? "Pass the guide around." : "Invite the whole table."}
        </h2>
        <p className="muted">One scan. A field guide on every phone.</p>
      </Card.Header>
      <Card.Content className="share-content">
        <div className="qr-frame">
          {qr ? (
            <img
              src={qr}
              width="216"
              height="216"
              alt={`Scan to open ${url}`}
            />
          ) : (
            <p role="status">
              {qrError
                ? "QR unavailable. Use the link below."
                : "Preparing QR code…"}
            </p>
          )}
        </div>
        <div className="share-actions">
          <Chip className="quiet-chip">
            {guide ? "This game" : "All games"}
          </Chip>
          <p className="share-note">
            {guide
              ? "Keep the turn order and winning conditions close at hand."
              : "Share the menu, then let everyone choose their guide."}
          </p>
          <Link className="share-url" href={url}>
            {url.replace("https://", "")}
          </Link>
          <div className="button-row">
            <Button variant="primary" onPress={copyLink}>
              Copy link <span aria-hidden="true">↗</span>
            </Button>
            {qr && (
              <Link
                className="action-link"
                href={qr}
                download={
                  guide ? path.split("/")[1] + "-qr.png" : "games-qr.png"
                }
              >
                Download QR <span aria-hidden="true">↓</span>
              </Link>
            )}
          </div>
          <p className="status" role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}
