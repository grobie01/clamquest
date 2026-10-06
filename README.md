# clam simulator

**Play: https://grobie01.github.io/clamquest/**

You are the last Giant Clam of Pixel Reef. Defeat the five Elder Creatures,
devour their magic, grow huge — then face the Giant Hand of the Clammer.

| Key | Action |
|---|---|
| WASD / arrows | swim |
| SPACE | chomp / bite (mash it if the Hand grabs you!) |
| J | fire shot |
| K | volt dash |
| L | lantern nova |
| Q | phantom force field |
| P / M | pause / mute |

Progression: light chomp → defeat the Saw Urchin for TEETH → Ember Crab (fire) →
Volt Jelly (dash) → Glow Angler (nova) → Phantom Squid (force field) → the Shallows boss arena.
Boss pattern: shoot the descending Hand to fill STAGGER → it crashes to the seabed →
attack while it's DOWN. Five cycles.

Art generated with fal.ai (FLUX.1 [schnell] sprites, Nano Banana 2 clam sprite sheets,
H3 Max Turbo title video, ~$0.44 total). Music and SFX are synthesized live with WebAudio.
Sprites are chroma-keyed in the browser from magenta plates — serve over HTTP (`python3 -m http.server`).

Checks: `node game-check.mjs`
