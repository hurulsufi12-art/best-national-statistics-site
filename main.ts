// KAVSTAT entry hand-in (Node 22, standard library only).
//
// The site lives in app/ as plain static files: index.html plus its own
// modules, stylesheet and data — nothing it loads comes over the network.
// This program hands it in: it copies app/ and screenshots/ next to this
// file into the output directory (MAKEFUN_OUTPUT_DIR, or /output in the
// grader) and writes output/dossier.json with the vendored make.fun
// library, so the dossier is byte for byte what the scorer's own copy
// of buildDossier writes from the same files.
//
// Usage outside the grader:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const entryDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyTree(join(entryDir, 'app'), join(outputDir, 'app'));
copyTree(join(entryDir, 'screenshots'), join(outputDir, 'screenshots'));

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
