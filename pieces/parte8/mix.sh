#!/usr/bin/env bash
# Final mix for Teil 8: the voice on top, the SFX right under it (barely ducked), the music well under both.
# Uses the score's stems (renders/stem-sfx.wav, renders/stem-music.wav) from tools/export.mjs, then remuxes the MP4s.
set -e
cd "$(dirname "$0")"
R=renders
ffmpeg -y -hide_banner -loglevel error -i voice/voice.wav -i $R/stem-sfx.wav -i $R/stem-music.wav -filter_complex "\
[0:a]aresample=48000,aformat=channel_layouts=stereo,volume=5dB,apad,asplit=3[v][k1][k2];\
[1:a]aresample=48000,aformat=channel_layouts=stereo,acompressor=threshold=0.02:ratio=4:attack=3:release=120:makeup=6,alimiter=limit=0.7,volume=-1dB[s];\
[2:a]aresample=48000,aformat=channel_layouts=stereo,volume=-3dB[m];\
[s][k1]sidechaincompress=threshold=0.08:ratio=2:attack=20:release=250[sd];\
[m][k2]sidechaincompress=threshold=0.03:ratio=3:attack=30:release=400[md];\
[v][sd][md]amix=inputs=3:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[o]" \
  -map "[o]" -ar 48000 -t 108.2 $R/mix.wav
for f in final share; do
  ffmpeg -y -hide_banner -loglevel error -i $R/$f.mp4 -i $R/mix.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart $R/$f-mix.mp4
  mv $R/$f-mix.mp4 $R/$f.mp4
done
echo "mixed -> $R/mix.wav, remuxed final.mp4 + share.mp4"
