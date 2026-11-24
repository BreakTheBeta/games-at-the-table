import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Accordion, Card, Chip, Link } from "@heroui/react";
import { ShareCard } from "./ShareCard";
import { ExtraGuide } from "./ExtraGuide";
import { games } from "./catalog";
import "./theme.css";

const currentGame = games.find(
  (game) => window.location.pathname.replace(/\/$/, "") === "/" + game.slug,
);
const isGuide = !!currentGame;
const isKnownPage = isGuide || window.location.pathname === "/";
const rulebook =
  "https://paperzz.com/doc/7164266/lovecraft-letter-rulebook---alderac-entertainment-group";
const repository = "https://github.com/BreakTheBeta/games-at-the-table";

function Masthead() {
  return (
    <nav className="masthead" aria-label="Main navigation">
      <Link className="brand" href="/">
        <span className="brand-mark" aria-hidden="true">
          ✧
        </span>
        <span>
          At the table<span className="brand-sub">POCKET FIELD GUIDES</span>
        </span>
      </Link>
      <Link className="nav-link" href={isGuide ? "#share-title" : "#games"}>
        {isGuide ? "Share guide ↗" : "Choose a game ↓"}
      </Link>
    </nav>
  );
}

function Menu() {
  return (
    <>
      <header className="hero">
        <div className="eyebrow">
          <span className="tiny-line" /> Good company. Less rulebook.
        </div>
        <h1>
          More playing.
          <br />
          <em>Less page turning.</em>
        </h1>
        <p>
          Little guides for the games we love. Pull up a chair, pick your game,
          and keep the night moving.
        </p>
        <div className="hero-bottom">
          <span>Made for the middle of game night</span>
          <span aria-hidden="true">✧</span>
        </div>
      </header>
      <section id="games" aria-labelledby="games-title">
        <div className="section-heading">
          <h2 id="games-title">On the table</h2>
          <span className="count">03 field guides</span>
        </div>
        <div className="game-list">
          {games.map((game) => (
            <Card key={game.slug} className="panel game-card">
              <Card.Content className="game-layout">
                <div className={"game-art art-" + game.slug} aria-hidden="true">
                  <div className="art-orbit" />
                  <span className="art-star">{game.mark}</span>
                  <span className="art-label">{game.label}</span>
                  <span className="art-number">{game.numeral}</span>
                </div>
                <div className="game-info">
                  <div className="chips">
                    <Chip className="quiet-chip">{game.category}</Chip>
                    <span className="edition">{game.edition}</span>
                  </div>
                  <h3>{game.name}</h3>
                  <p className="muted">{game.description}</p>
                  <div className="game-meta">
                    {game.topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                  <Link
                    className="action-link primary-link"
                    href={"/" + game.slug + "/"}
                  >
                    Open field guide <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>
      <ShareCard />
    </>
  );
}

const turns = [
  {
    title: "Check your sanity",
    body: <>No Insanity cards in your discard pile? Skip this.</>,
    extra: (
      <div className="inset">
        Otherwise, reveal <strong>1 deck card per Insanity card</strong> in your
        discard pile, one at a time.
        <p>
          <strong>Reveal any Insanity card → you’re out.</strong>
        </p>
        <p>
          Pass? Discard the revealed cards without effects. If the deck runs out
          before you can finish, the round ends.
        </p>
      </div>
    ),
  },
  { title: "Draw 1 card", body: <>You now have two cards in hand.</> },
  {
    title: "Play 1. Resolve it.",
    body: (
      <>
        Discard one face up and apply its effect—even if it hurts you. Keep the
        other card secret.
      </>
    ),
  },
  {
    title: "Pass to the left",
    body: <>Keep your discards visible and in order.</>,
  },
];
function Guide() {
  return (
    <>
      <header className="guide-header">
        <Link href="/" className="back-link">
          ← All games
        </Link>
        <div className="eyebrow">A pocket field guide · No. 01</div>
        <h1>
          Lovecraft
          <br className="mobile-break" /> <em>Letter</em>
        </h1>
        <div className="chips">
          <Chip className="quiet-chip">Classic edition</Chip>
          <span className="edition">2016 · Quick reference</span>
        </div>
        <p className="muted">
          A little certainty in a world of cosmic uncertainty.
        </p>
      </header>
      <div className="guide-layout">
        <Card className="panel turn-panel" aria-labelledby="turn-title">
          <Card.Header>
            <p className="eyebrow">The rhythm of a round</p>
            <h2 id="turn-title">On your turn</h2>
          </Card.Header>
          <Card.Content>
            <ol className="turn-list">
              {turns.map((turn, i) => (
                <li className="turn" key={turn.title}>
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h3>{turn.title}</h3>
                    <p className="muted">{turn.body}</p>
                    {turn.extra}
                  </div>
                </li>
              ))}
            </ol>
            <div className="rule-note">
              <span aria-hidden="true">✧</span>
              <p>
                <strong>When can I use an Insane effect?</strong>
                <br />
                Only if you were already Insane before playing that card. Choose
                its Sane or Insane effect, never both. Your first Insanity card
                makes you Insane <em>after</em> its effect resolves.
              </p>
            </div>
          </Card.Content>
        </Card>
        <Card className="panel win-panel" aria-labelledby="win-title">
          <Card.Header>
            <p className="eyebrow">The paths to victory</p>
            <h2 id="win-title">How to win</h2>
            <p className="muted">
              Win rounds. Collect tokens matching your sanity when you win.
              Reach either target:
            </p>
          </Card.Header>
          <Card.Content>
            <div className="win-routes">
              <div>
                <b>2</b>
                <span>Sane wins</span>
              </div>
              <div>
                <b>3</b>
                <span>Insane wins</span>
              </div>
            </div>
            <div className="or">
              <span />
              or awaken Cthulhu
              <span />
            </div>
            <div className="inset cthulhu">
              <p className="eyebrow">Win the whole game</p>
              <p>
                Play Cthulhu’s Insane effect on your turn with{" "}
                <strong>2+ Insanity cards already in your discard pile.</strong>{" "}
                Cthulhu itself doesn’t count.
              </p>
            </div>
            <Accordion
              defaultExpandedKeys={["round"]}
              className="round-accordion"
            >
              <Accordion.Item id="round">
                <Accordion.Heading>
                  <Accordion.Trigger>
                    How do I win a round?
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>
                    <p>
                      Be the last player remaining, or hold the highest
                      remaining number when the deck empties at turn’s end. At
                      that reveal, players with matching numbers are eliminated
                      first.
                    </p>
                    <p>
                      Card effects can also award a round win. If nobody
                      remains, nobody earns a token.
                    </p>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Card.Content>
        </Card>
      </div>
      <ShareCard guide />
      <p className="source-note">
        For the original game:{" "}
        <Link href={rulebook} target="_blank" rel="noopener noreferrer">
          Classic 2016 rulebook ↗
        </Link>
      </p>
    </>
  );
}

function App() {
  useEffect(() => {
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = window.location.origin + window.location.pathname;
    document.head.append(canonical);
    return () => canonical.remove();
  }, []);

  useEffect(() => {
    document.title = currentGame
      ? currentGame.name + " · Pocket field guide"
      : "Games at the table · Pocket field guides";
  }, []);
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main">
        {isKnownPage ? (
          currentGame ? (
            currentGame.slug === "lovecraft-letter" ? (
              <Guide />
            ) : (
              <ExtraGuide game={currentGame} />
            )
          ) : (
            <Menu />
          )
        ) : (
          <header className="hero">
            <h1>That guide isn’t here.</h1>
            <Link href="/">Return to all games →</Link>
          </header>
        )}
      </main>
      <footer>
        <p>
          <span aria-hidden="true">✧</span> Made for good nights around the
          table.
        </p>
        <div>
          <span>Unofficial play aids</span>
          <Link href={repository}>GitHub ↗</Link>
          <Link href="https://islinuxdown.com/">Is Linux Down ↗</Link>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
