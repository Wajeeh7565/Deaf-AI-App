# Interpreter media status

## New face-swapped clips active in v2.11

- LSQ 1
- LSQ 2
- LSQ 3.1
- LSQ 3.2.a
- LSQ 3.5
- LSQ 3.6
- LSQ 3.8
- LSQ 4.1
- LSQ 4.5
- LSQ 4.6
- LSQ 5.1
- LSQ 5.5
- LSQ 5.6

They are already mapped to the normal app filenames under `public/lsq/`.

## Still old/unprocessed where present

3.3, 3.4, 3.7, 4.2, 4.3, 4.4, 5.2, 5.3, 5.4.

Most are not used in the normal pilot flow. **5.4 is the important exception** because the gate-change demo can call it.

## Background

The app keeps the videos as supplied. Do not substitute the failed automatic blue-background versions. Once a clean white/transparent-background version is available, overwrite the matching MP4 in `public/lsq/`; no React code change is needed.
