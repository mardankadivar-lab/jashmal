#!/bin/bash
# Cierre de Shabat: menorá (imagen) al final. La música del video hace fade-out;
# la menorá entra en silencio. SIN voz (la voz solo va en la narración del video).
# Uso:  bash shabat_close.sh /ruta/al/video.mp4   ->  crea video_shabat.mp4
IN="$1"
CARD="/Users/mardan/Desktop/jashmal-videos/_shabat/SHABAT_card_mj.png"
OUT="${IN%.*}_shabat.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$IN")
FO=$(python3 -c "print(max(0,$DUR-0.6))")
ffmpeg -y -hide_banner -loglevel error -i "$IN" -loop 1 -t 3.0 -i "$CARD" \
 -f lavfi -t 3.0 -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]fade=t=out:st=${FO}:d=0.6[v0];[1:v]scale=1080:1920,fps=30,format=yuv420p,fade=t=in:st=0:d=0.6[v1];[v0][v1]concat=n=2:v=1:a=0[v];[0:a]afade=t=out:st=${FO}:d=0.6[a0];[a0][2:a]concat=n=2:v=0:a=1[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$OUT"
echo "Listo: $OUT"
