// CLAMQUEST regression check — dependency-free (Node only).
// Run: node game-check.mjs
// Verifies: inline script compiles, RPG contract present, mechanical schematic gone, assets on disk.
import fs from 'node:fs';
import vm from 'node:vm';

let fails = 0;
const check = (name, ok, detail = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  ${detail}`); if (!ok) fails++; };

const html = fs.readFileSync('index.html', 'utf8');
check('title is clam simulator', html.includes('<title>clam simulator</title>'));

const m = html.match(/<script>([\s\S]*?)<\/script>/);
check('inline script found', !!m);
if (m) {
  try { new vm.Script(m[1]); check('inline script compiles', true); }
  catch (e) { check('inline script compiles', false, e.message); }
}

for (const s of ['Ember Crab', 'Saw Urchin', 'Volt Jelly', 'Glow Angler', 'Phantom Squid'])
  check(`elder present: ${s}`, html.includes(s));
for (const s of ['FIRE SHOT', 'SHELL TEETH', 'VOLT DASH', 'LANTERN NOVA', 'PHANTOM FORCE FIELD'])
  check(`ability present: ${s}`, html.includes(s));
check("final boss is the Clammer's Hand", html.includes("CLAMMER'S HAND") || html.includes('CLAMMER\\\'S HAND'));
check('boss grab shadow telegraph', html.includes('GRAB!'));
check('force field power (Phantom Squid)', html.includes('PHANTOM FORCE FIELD') && html.includes('FORCE FIELD UP'));
check('squid popup before all-five banner (delayed)', html.includes('3000'));
check('frame-based bite animation', html.includes('clamBite') && html.includes('clamClosed') && html.includes('biteAnimT'));
check('spam-friendly fire cooldown (<=0.12s)', html.includes('P.fireCd=0.12'));
check('boss arena in the shallows', html.includes('BOSS ARENA') && html.includes('GATE_X'));
check('two-step boss: stagger then downed damage', html.includes('STAGGER') && html.includes('downed') && html.includes('phaseDmg'));
check('grab mash escape', html.includes('MASH SPACE') && html.includes('grabTap'));
check('hand injuries grow as HP drops (boo-boos)', html.includes('drawBooBoos'));
check('menacing shallows music', html.includes('menace'));
check('consistent clam sprite sheet (nano-banana)', html.includes('clam-sheet') && html.includes('segmentSheet') && html.includes('clamClosedPlain'));
check('generated toothed clam replaces hand-drawn triangles', html.includes('clam-teeth-sheet') && html.includes('tClam') && !html.includes('tx-3*s'));
check('distinct gape vs chomp animations', html.includes('gapeT') && html.includes('clamClosedTeeth'));
check('teeth come first (Saw Urchin before Ember Crab)', html.indexOf("id:'urchin'") < html.indexOf("id:'ember'"));
check('elders must be defeated (HP + flee, no touch-eat)', html.includes('damageElder') && html.includes('hpCur') && html.includes('e.flee'));
check('predator variety beyond fish', html.includes('drawPred') && html.includes("'ray'") && html.includes("'octo'") && html.includes("'jelly'"));
check('arena transition snaps camera + fades', html.includes('G.camX=WORLD_W-960') && html.includes('fade'));
check('intense boss music (176bpm + heartbeat)', html.includes('bpm:176') && html.includes('heartbeat'));
check('bottom bar is compact (no long ability prose)', !html.includes('MAGICAL ABILITIES — eat Elder') && html.includes('POWERS'));
check('chiptune music sequencer', html.includes('THEME') && html.includes('startMusic'));
check('SFX present', html.includes('const SFX'));
check('mechanical schematic removed', !html.includes('TG-001') && !html.includes('Bill of Materials') && !html.includes('three'));
for (const f of ['bg-reef.png', 'clam.png', 'clam-sheet.png', 'clam-teeth-sheet.png', 'clam-bite.png', 'clam-closed.png', 'ember-crab.png', 'saw-urchin.png', 'volt-jelly.png', 'glow-angler.png', 'phantom-squid.png', 'clammer-hand.png', 'hand-open.png', 'hand-grab.png', 'hand-down.png', 'hand-hurt.png', 'intro-loop.mp4'])
  check(`asset exists: ${f}`, fs.existsSync(`assets/${f}`) && fs.statSync(`assets/${f}`).size > 10000);

console.log(fails ? `\n${fails} FAILURES` : '\nALL PASS');
process.exit(fails ? 1 : 0);
