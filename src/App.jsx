import React, { useState, useEffect } from "react";

const CHOICES = ["rock", "paper", "scissors"];

export default function RockPaperScissors() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  useEffect(() => {
    const css = `
      .rps-root{font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;display:flex;flex-direction:column;align-items:center;gap:18px;padding:28px;min-height: 100vh;
  justify-content: center;}
      .card{background:#fff;border-radius:12px;padding:18px;box-shadow:0 6px 18px rgba(18,24,40,0.06);min-width:320px;text-align:center}
      h1{margin:0 0 6px;font-size:20px}
      .choices{display:flex;gap:10px;justify-content:center;margin-top:12px}
      .btn{padding:10px 14px;border-radius:8px;border:1px solid #ddd;cursor:pointer;background:#f7f7f8;min-width:88px}
      .btn:active{transform:translateY(1px)}
      .result{font-weight:700;margin-top:12px}
      .muted{color:#666;font-size:14px}
      .score{display:flex;gap:12px;justify-content:center;margin-top:12px}
      .score div{padding:8px 12px;border-radius:8px;background:#f4f6f8}
      .big{font-size:28px;margin:6px 0}
      .small{font-size:13px;color:#555}
      .play-again{margin-top:12px;padding:8px 12px;border-radius:8px;border:none;background:#2b6cb0;color:white;cursor:pointer}
      @media (max-width:420px){.card{min-width:260px;padding:14px}}
    `;
    const style = document.createElement("style");
    style.innerText = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  function play(choice) {
    const comp = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayer(choice);
    setComputer(comp);
    const r = decide(choice, comp);
    setResult(r.message);
    setScore((s) => ({
      player: s.player + (r.winner === "player" ? 1 : 0),
      computer: s.computer + (r.winner === "computer" ? 1 : 0),
      ties: s.ties + (r.winner === "tie" ? 1 : 0),
    }));
  }

  function decide(a, b) {
    if (a === b) return { winner: "tie", message: "It's a tie!" };
    if (
      (a === "rock" && b === "scissors") ||
      (a === "paper" && b === "rock") ||
      (a === "scissors" && b === "paper")
    ) {
      return { winner: "player", message: "You win!" };
    }
    return { winner: "computer", message: "Computer wins" };
  }

  function reset() {
    setPlayer(null);
    setComputer(null);
    setResult("");
  }

  return (
    <div className="rps-root">
      <div className="card">
        <h1>Rock · Paper · Scissors</h1>
        <div className="muted">Choose one and try to beat the computer</div>

        <div className="choices">
          {CHOICES.map((c) => (
            <button key={c} className="btn" onClick={() => play(c)}>
              {emojiFor(c)} {capitalize(c)}
            </button>
          ))}
        </div>

        <div className="result">
          {result || <span className="muted">No play yet</span>}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 12,
          }}
        >
          <div className="small">
            <div className="muted">You</div>
            <div className="big">
              {player ? emojiFor(player) + " " + capitalize(player) : "—"}
            </div>
          </div>

          <div className="small">
            <div className="muted">Computer</div>
            <div className="big">
              {computer ? emojiFor(computer) + " " + capitalize(computer) : "—"}
            </div>
          </div>
        </div>

        <div className="score" aria-live="polite">
          <div>Player: {score.player}</div>
          <div>Computer: {score.computer}</div>
          <div>Ties: {score.ties}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="play-again" onClick={reset}>
            Play again
          </button>
        </div>
      </div>

      <div className="muted">
        Tip: open devtools and customize the CSS injected in this file for quick
        styling tweaks.
      </div>
    </div>
  );
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}
function emojiFor(c) {
  if (c === "rock") return "✊";
  if (c === "paper") return "✋";
  return "✌️";
}
