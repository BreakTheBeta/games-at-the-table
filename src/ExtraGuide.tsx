import { useState } from "react";
import { Accordion, Button, Card, Chip, Link } from "@heroui/react";
import type { ReactNode } from "react";
import type { games } from "./catalog";
import { ShareCard } from "./ShareCard";

type Game = (typeof games)[number];
const clankRules =
  "https://www.direwolfdigital.com/clank/resources/cata_rules/";
const citadelsRules =
  "https://images-cdn.zmangames.com/us-east-1/filer_public/57/62/576229ab-7747-4cda-9946-cc4b6514dc32/wr02_citadels_rules.pdf";
const classicRules =
  "https://images-cdn.asmodee.us/filer_public/80/1f/801fe309-65ab-4d5c-b7fd-609d3d8a2015/wr01_citadels_classic_rulebook_web.pdf";

function Steps({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <Card className="panel turn-panel" aria-labelledby="turn-title">
      <Card.Header>
        <p className="eyebrow">Keep play moving</p>
        <h2 id="turn-title">On your turn</h2>
      </Card.Header>
      <Card.Content>
        <ol className="turn-list">
          {steps.map((step, i) => (
            <li className="turn" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <div className="muted step-body">{step.body}</div>
              </div>
            </li>
          ))}
        </ol>
      </Card.Content>
    </Card>
  );
}
function Expand({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Accordion className="round-accordion">
      <Accordion.Item id={title}>
        <Accordion.Heading>
          <Accordion.Trigger>
            {title}
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>{children}</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
function Clank() {
  return (
    <div className="guide-layout">
      <Steps
        steps={[
          {
            title: "Play your whole hand",
            body: "Play every card. Mix card plays and actions.",
          },
          {
            title: "Spend your resources",
            body: "Skill buys cards/devices; Swords fight; Boots move. Acquisitions go to discards; devices resolve immediately.",
          },
          {
            title: "Explore carefully",
            body: "Reveal tiles when leaving the map. Crystal Caves stop Boots movement. Noise goes to the Clank! area.",
          },
          {
            title: "End in order",
            body: "Discard → draw five → refill row to six → check new dragon symbols.",
          },
        ]}
      />
      <Card className="panel win-panel">
        <Card.Header>
          <p className="eyebrow">Get rich. Get out.</p>
          <h2>Survive the heist</h2>
        </Card.Header>
        <Card.Content>
          <div className="win-routes">
            <div>
              <b>1</b>
              <span>Artifact needed</span>
            </div>
            <div>
              <b>+20</b>
              <span>Escape bonus</span>
            </div>
          </div>
          <div className="inset">
            <strong>Escape at the Crypt with an artifact.</strong>
            <p>
              Knocked out in the Depths, or without an artifact? Score zero.
              Otherwise score artifact, tokens, gold, and cards. Most points
              wins; higher artifact breaks ties.
            </p>
          </div>
          <Expand title="Dragon attacks">
            <p>
              New dragon symbols trigger one attack. Bag Clank! cubes; draw rage
              amount plus Danger. Your colour hurts you; Ghosts hurt all
              adventurers, then return to the Clank! area.
            </p>
          </Expand>
          <Expand title="After someone finishes">
            <p>
              Finished players draw four cubes each turn (six with two players),
              ignoring rage/Danger. No countdown. End when everyone finishes.
            </p>
          </Expand>
        </Card.Content>
      </Card>
    </div>
  );
}
function Citadels() {
  const [original, setOriginal] = useState(false);
  return (
    <>
      <Card className="panel edition-panel">
        <Card.Header>
          <p className="eyebrow">Check your box</p>
          <h2>Choose your edition</h2>
          <p className="muted">
            Original eight characters · 4–7 players. Other casts and 2–3-player
            games use different rules.
          </p>
        </Card.Header>
        <div className="button-row" role="group" aria-label="Citadels edition">
          <Button
            variant={original ? "secondary" : "primary"}
            aria-pressed={!original}
            onPress={() => setOriginal(false)}
          >
            2016 / Classic reprint
          </Button>
          <Button
            variant={original ? "primary" : "secondary"}
            aria-pressed={original}
            onPress={() => setOriginal(true)}
          >
            Original 8-district game
          </Button>
        </div>
      </Card>
      <div className="guide-layout">
        <Steps
          steps={[
            {
              title: "Draft secretly",
              body: "Starting with the crown, choose one character and pass left. Set aside characters according to player count.",
            },
            {
              title: "Wait for your rank",
              body: "The crown calls ranks 1–8. Reveal only when called; a killed character loses its turn.",
            },
            {
              title: "Gather, then build",
              body: "Take two gold OR draw two districts and keep one. Then optionally pay to build one district; no duplicate names.",
            },
            {
              title: "Use your ability",
              body: "Once per turn, at its specified time; otherwise anytime on your turn. Some abilities change the building limit.",
            },
          ]}
        />
        <Card className="panel win-panel">
          <Card.Header>
            <p className="eyebrow">Build a city worth remembering</p>
            <h2>How to win</h2>
          </Card.Header>
          <Card.Content>
            <div className="win-routes">
              <div>
                <b>{original ? "8" : "7"}</b>
                <span>Districts finish a city</span>
              </div>
              <div>
                <b>+4</b>
                <span>First to complete</span>
              </div>
            </div>
            <div className="inset">
              <p>
                Finish the current round. Score district costs, +3 for all five
                types, +4 for first completion or +2 for later completion, plus
                district bonuses. Most points wins.
              </p>
            </div>
            <p className="rule-note">
              {original
                ? "Original rules: eight districts complete a city."
                : "2016 / Classic reprint: seven districts complete a city; the original variant uses eight."}
            </p>
            <Expand title="Draft reminders">
              <p>
                With 4 / 5 / 6–7 players, remove 2 / 1 / 0 cards faceup, plus
                one facedown. Never remove the King faceup. The seventh player
                also chooses from the initial facedown discard.
              </p>
            </Expand>
          </Card.Content>
        </Card>
      </div>
      <Card className="panel characters-panel">
        <Card.Header>
          <p className="eyebrow">Original cast · Call in this order</p>
          <h2>Know your character</h2>
        </Card.Header>
        <Card.Content>
          <div className="character-list">
            {[
              ["Assassin", "Name a character to skip its turn."],
              [
                "Thief",
                "Steal a named character’s gold when revealed; not Assassin or the killed character.",
              ],
              ["Magician", "Swap hands, or replace discarded hand cards."],
              ["King", "Take crown; gain gold for yellow districts."],
              [
                "Bishop",
                "Gain blue income; protect your city from Warlord unless killed.",
              ],
              ["Merchant", "Gain green income and one extra gold."],
              [
                "Architect",
                "Draw two extra cards; build up to three districts.",
              ],
              [
                "Warlord",
                "Gain red income; destroy one eligible district for cost minus one. Not a completed city.",
              ],
            ].map(([name, power], index) => (
              <div className="character" key={name}>
                <span className="step-number">{index + 1}</span>
                <div>
                  <h3>{name}</h3>
                  <p className="muted">{power}</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </>
  );
}
export function ExtraGuide({ game }: { game: Game }) {
  return (
    <>
      <header className="guide-header">
        <Link href="/" className="back-link">
          ← All games
        </Link>
        <div className="eyebrow">A pocket field guide · No. {game.number}</div>
        <h1>{game.name}</h1>
        <div className="chips">
          <Chip className="quiet-chip">{game.category}</Chip>
          <span className="edition">{game.edition} · Quick reference</span>
        </div>
      </header>
      {game.slug === "clank-catacombs" ? <Clank /> : <Citadels />}
      <ShareCard guide />
      <p className="source-note">
        Check special cases in the{" "}
        <Link
          href={game.slug === "clank-catacombs" ? clankRules : citadelsRules}
          target="_blank"
          rel="noopener noreferrer"
        >
          official rulebook ↗
        </Link>
        {game.slug === "citadels" && (
          <>
            {" "}
            ·{" "}
            <Link href={classicRules} target="_blank" rel="noopener noreferrer">
              Classic rulebook ↗
            </Link>
          </>
        )}
      </p>
    </>
  );
}
