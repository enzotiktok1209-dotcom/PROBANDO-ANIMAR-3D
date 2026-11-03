#!/usr/bin/env bash
# Final mix + encode, after tools/export.mjs wrote frames/ and renders/stem-*.wav:
#   the voice on top (0 dB), the sound effects under it (lightly ducked), the bed low and ducked; -14 LUFS / -1.5 dBTP.
set -euo pipefail
cd "$(dirname "$0")/.."
R=renders; D=55.4
ffmpeg -y -hide_banner -loglevel error -i voice/vo.wav -i $R/stem-music.wav -i $R/stem-sfx.wav -filter_complex "
[0:a]aresample=48000,aformat=channel_layouts=stereo,apad,asplit=3[v][k1][k2];
[1:a]aresample=48000,volume=-9dB[m0];[m0][k1]sidechaincompress=threshold=0.03:ratio=5:attack=20:release=350[m];
[2:a]aresample=48000,volume=-1dB[s0];[s0][k2]sidechaincompress=threshold=0.06:ratio=2:attack=10:release=220[s];
[v][m][s]amix=inputs=3:normalize=0:duration=longest,atrim=0:$D,loudnorm=I=-14:TP=-1.5:LRA=11[o]" -map "[o]" -ar 48000 $R/final-mix.wav
ffmpeg -y -hide_banner -loglevel error -framerate 30 -i frames/f%04d.png -i $R/final-mix.wav -map 0:v -map 1:a \
  -c:v libx264 -preset medium -crf 17 -profile:v high -pix_fmt yuv420p -r 30 -frames:v 1662 \
  -c:a aac -b:a 256k -movflags +faststart $R/tire-pressure-en.mp4
ffprobe -v error -show_entries stream=codec_name,width,height:format=duration,size -of compact $R/tire-pressure-en.mp4
