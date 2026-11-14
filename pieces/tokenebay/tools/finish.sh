#!/usr/bin/env bash
# Final mix + 1440p encode, after `tools/export.mjs . --no-mux` wrote frames/ and renders/stem-*.wav
#   voice on top (0 dB), sound effects under it (lightly ducked), music bed low and ducked by the voice,
#   loudness -14 LUFS / -1.5 dBTP; video H.264 High, 1440x2560, 30 fps, CRF 15.
set -euo pipefail
cd "$(dirname "$0")/.."
R=renders
ffmpeg -y -hide_banner -loglevel error -i voice/vo.wav -i $R/stem-music.wav -i $R/stem-sfx.wav -filter_complex "
[0:a]aresample=48000,aformat=channel_layouts=stereo,apad,asplit=3[v][k1][k2];
[1:a]aresample=48000,volume=-14dB[m0];[m0][k1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[m];
[2:a]aresample=48000,volume=-4dB[s0];[s0][k2]sidechaincompress=threshold=0.05:ratio=2:attack=10:release=200[s];
[v][m][s]amix=inputs=3:normalize=0:duration=longest,atrim=0:81.0,loudnorm=I=-14:TP=-1.5:LRA=11[o]" -map "[o]" -ar 48000 $R/final-mix.wav
ffmpeg -y -hide_banner -loglevel error -framerate 30 -i frames/f%04d.png -i $R/final-mix.wav -map 0:v -map 1:a \
  -vf "eq=saturation=1.18:contrast=1.04,unsharp=5:5:0.9:5:5:0.0" -c:v libx264 -preset slow -crf 15 -profile:v high -pix_fmt yuv420p -r 30 -frames:v 2430 \
  -c:a aac -b:a 256k -movflags +faststart $R/tokenebay-1440p.mp4
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate:format=duration,size,bit_rate -of compact $R/tokenebay-1440p.mp4
