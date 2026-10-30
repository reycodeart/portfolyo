# Repository Audit (Phase 1) and Content Architecture (Phase 2)

Audit date: **2026-10-30**. Every number on the site comes from this table. If a repo changes, update the
matching file in `content/` and this document.

## 1. Access

| Repository | Visibility | Accessed | How |
|---|---|---|---|
| RL-MultiAgent-Gym-CartPole | public | yes | clone |
| face_detection_system | public | yes | clone, tests run |
| muhendislikprojem | public | yes | clone, experiments re-run |
| Responsive-Mobil-Magaza | public | yes | clone |
| python, war-game, html5, C-Sharp, reynkes | public | python/war-game/reynkes read | clone (early exercises, profile README) |
| cursed-couriers | **private** | yes | clone, PR + CI API |
| tls-c2-detection | **private** | yes | clone, tests run |
| cerberion | **private** | yes | clone |
| virtualverse | **private** | yes | clone (left off the site, see §4) |
| 2 other private repos | **private** | **not reviewed** | outside the brief; nothing about them is on the site |

No private code, secrets or files were copied into this repository. The site only links to private
repositories and describes them.

## 2. Evidence table

Verification legend: **R** = re-run during this audit and matched · **CI** = read from a CI log ·
**F** = committed file, not re-run · **S** = stated in a README/PR, not independently checked.

### TLS 1.3 C2 Detection (private, ongoing)

| Claim on the site | Evidence | V |
|---|---|---|
| 11 of 14 phases complete; no real research data yet | `README.md` status + roadmap | S |
| PCAP validation, Zeek with Scapy fallback | `README.md` architecture, `src/tls_c2_detector/ingestion/` | F |
| 43 flow features | `docs/FEATURES.md` | F |
| Group-aware CV, both classes per test fold | `src/tls_c2_detector/datasets/splitting.py`, `tests/test_group_splitting.py` | F |
| Baseline / RF / CNN / LSTM infrastructure | `src/tls_c2_detector/models/` | F |
| CI: ruff, black, mypy, pytest on 3.11/3.12 | `.github/workflows/ci.yml` | F |
| 573 passed, 2 failed, 11 skipped | `pytest` in a Linux container, no TensorFlow | R |
| The 2 failures are environment-specific | `test_external_target` assumes a Windows `R:` path; `test_benign_collector` needs a dumpcap interface | R |
| Implementation is AI-assisted | last commit carries a `Co-Authored-By: Claude` trailer | F |

**Discrepancy to resolve (owner decision):** the README header says *Phase 11 of 14*, but the latest
commit is titled *Phase 18.5* and `docs/` contains later-phase reports on public datasets (TQH-C2,
CipherSpectrum: e.g. `PROFILE_D_CLASSICAL_BENCHMARK.md`, `CROSS_FRAMEWORK_TRANSFER_RESULTS.md`,
`BENIGN_OOD_SPECIFICITY_RESULTS.md`). The site follows the README and the owner's brief ("no real
research data yet") and shows **no** metrics from those reports. If those phases should be presented,
update the README first, then `content/projects/tls-c2-detection.json`.

### Cursed Couriers (private, ongoing)

| Claim | Evidence | V |
|---|---|---|
| 35 merged PRs, 9–15 Oct 2026 | PR list via GitHub API | F |
| Code authored by Claude Code | commit list: code commits by user `claude`, merge commits by `reycodeart` | F |
| PR #35: 39 test scenes, 1,817 checks, 0 failures | CI job 116203934068 log, summed per scene (`-- name: ok (N ok, 0 failed)`) | CI |
| wrong_door_test 32 checks, net_door_test 30 checks | same log | CI |
| Last 100 CI runs: 95 success, 3 failure, 2 cancelled | Actions run list (122 runs total) | CI |
| PR #34: net_curse_test 39 ok / 1 failed → fix 653b434 → green | runs 38658737911 (fail), 38660064542 (success) | CI |
| PR #1: flaky test 5/22 → 30/30, 218 checks | PR #1 description (written by Claude Code) | S |
| PR #30 followed a Windows playtest; van_audio_test 32 → 53 checks | PR #30 description | S |
| Rules: preserve gameplay, never claim untested passes, no push to main | `CLAUDE.md` | F |

### Keystroke Dynamics — `muhendislikprojem` (public, completed)

| Claim | Evidence | V |
|---|---|---|
| 51 users, DSL-StrongPassword | `cleaned_data.csv` (51 unique subjects) | R |
| SVM EER 0.1034 ± 0.0659 | `svm.py` re-run on `cleaned_data.csv` → 0.10345 / 0.06589 | R |
| Mahalanobis EER 0.1091 ± 0.0645 | `mahalanobis_detector.py` re-run → 0.10906 / 0.06451 | R |
| K-Means EER 0.1502 | re-run gave 0.1537 (no seed set) | F (≈R) |
| NN standard 0.1238, NN auto-assoc 0.1868 | `results.csv` | F |
| Raw CSV contains NaN; scripts expect `data/` | running against `DSL-StrongPasswordData.csv` fails with NaN error | R |
| Impostor sample count differs (10 vs 5) | `svm.py` `head(10)`, `mahalanobis_detector.py` `head(5)` | F |

### Face Detection System (public, completed)

| Claim | Evidence | V |
|---|---|---|
| 20 tests, 20/20 pass with OpenCV 4.10 | `pytest tests` with `opencv-python-headless==4.10.0.84` | R |
| 12 tests fail on OpenCV 5.x (`readNetFromCaffe` removed) | same suite with 5.0.0.93 | R |
| Haar 9.91 ms / 100.9 FPS; DNN 28.66 ms / 34.9 FPS | `results/summary.txt` (single session, hardware unknown, no ground truth) | F |
| README folder layout differs from code; 0-byte Haar XML; committed `__pycache__` | repo tree | F |

### RL Multi-Agent CartPole (public, prototype)

| Claim | Evidence | V |
|---|---|---|
| DQN 4→128→2, γ 0.99, ε 1.0→0.01 (×0.995), 200 episodes | `single_agent_dqn.py`, `models` | F |
| Two independent agents | `multi_agent_dqn.py` | F |
| Does not run as-is (`models` is a file, code imports `models.dqn_model`) | repo tree | F |
| No saved reward plots or results | repo tree (no `results/`) | F |

### Cerberion (private, prototype)

| Claim | Evidence | V |
|---|---|---|
| LDAP → Neo4j → Cypher analysis → FastAPI → React | `backend/app/*`, `frontend/src/App.tsx` | F |
| No tests; credentials in request body; name-based admin detection | code review | F |

### Responsive Mobil Mağaza (public, completed)

| Claim | Evidence | V |
|---|---|---|
| 17 of 18 commits by "Cursor Agent" | `git log` | F |
| Lighthouse Performance 94 | README | S |

## 3. Content architecture

**Project order** (by what an AI-agent hiring manager needs first):

1. TLS 1.3 C2 Detection — strongest ML/research engineering; clearly marked *Ongoing Research*.
2. Cursed Couriers — the main evidence for managing an AI coding agent with tests and CI.
3. Keystroke Dynamics — own code, results reproduced.
4. Face Detection System — own code, tests reproduced.
5. RL Multi-Agent CartPole — RL agent basics; used to contrast RL agents with LLM agents.
6. *Other:* Cerberion (prototype), Responsive Mobil Mağaza (second AI-assisted example).

**Skill categories:** *Without AI* (only skills backed by code written without an agent) and
*AI-Assisted Development* (process skills: requirements, rules, testing generated code, iteration,
version management).

**AI Engineering section:** three lists kept apart — Demonstrated / Transferable / Developing.

**Content system:** all text lives in `content/*.json` (bilingual `{ tr, en }`), validated by
`lib/schema.ts` at build time. See README → "Editing content".

## 4. Deliberately left out

| Item | Reason |
|---|---|
| virtualverse (Expo + Firebase avatar app) | small (~390 lines) and unrelated to the target role |
| python, war-game, html5, C-Sharp | early learning exercises; `python` is linked only as evidence for basic Python/SQL |
| Log analysis, network analysis as "without AI" skills | no repository evidence (internship work is not on GitHub) |
| Internship task details | not provided; the timeline shows titles and dates only |
| Cursed Couriers screenshots | they live in a private repo; add them only if you decide to publish them |

## 5. Items for the owner to confirm before publishing

1. **Authorship** of `face_detection_system`, `cerberion` and `RL-MultiAgent-Gym-CartPole` is shown as
   "my own code". Git history can't confirm this (single upload commits). Change `authorship.mode`
   to `ai-assisted` or `mixed` if that is more accurate.
2. **Who did the Windows playtests** in Cursed Couriers — the site attributes them to you.
3. **TLS phase status** (see the discrepancy above).
4. **CV file:** `site.cvPath` is `null`, so the CV button points to LinkedIn. Put the PDF in
   `public/cv/` and set the path to enable the download button.
5. **Internship details:** add `points` in `content/experience.json` if you want task descriptions.
