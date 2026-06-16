import { Loader2, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src?: string;
  trackTitle: string;
  trackMeta: string;
  bandcampHref: string;
  cta: string; // "Full EP on Bandcamp"
}

/**
 * Custom audio player giving the imagined "studio console" feel.
 *
 * - Real <audio> playback when src is provided.
 * - Animated waveform bars (40 bars) that pulse only while playing.
 * - Loading spinner while buffering ("system status visibility").
 * - Demo mode when no src: a 45s simulated track so the visual
 *   feedback still works.
 */
export function AudioPlayer({ src, trackTitle, trackMeta, bandcampHref, cta }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(src ? 0 : 45);
  const demo = !src;

  useEffect(() => {
    if (demo) {
      if (!playing) return;
      const id = window.setInterval(() => {
        setTime((t) => {
          const next = t + 0.1;
          if (next >= duration) {
            setPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
      return () => window.clearInterval(id);
    }
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onDur = () => setDuration(a.duration || 0);
    const onWait = () => setLoading(true);
    const onPlay = () => {
      setLoading(false);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setTime(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onDur);
    a.addEventListener("waiting", onWait);
    a.addEventListener("playing", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onDur);
      a.removeEventListener("waiting", onWait);
      a.removeEventListener("playing", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
  }, [demo, playing, duration]);

  const toggle = async () => {
    if (demo) {
      setPlaying((p) => !p);
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      setLoading(true);
      try {
        await a.play();
      } catch {
        setLoading(false);
      }
    } else {
      a.pause();
    }
  };

  const pct = duration ? Math.min(100, (time / duration) * 100) : 0;
  const mmss = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="border-2 border-paper/20 bg-ink p-5 hard-shadow md:p-7">
      {src ? <audio ref={audioRef} src={src} preload="metadata" /> : null}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">// NOW PLAYING</p>
          <p className="mt-2 truncate font-display text-2xl uppercase text-paper md:text-3xl">{trackTitle}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-paper/60">{trackMeta}</p>
        </div>
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="group relative grid h-16 w-16 shrink-0 cursor-pointer place-items-center border-2 border-blood bg-blood text-paper transition-transform hover:-translate-y-0.5 hover:rotate-1 md:h-20 md:w-20"
        >
          <span className="absolute inset-0 -z-10 animate-pulse-glow bg-blood/40" />
          {loading ? (
            <Loader2 className="animate-spin" size={26} />
          ) : playing ? (
            <Pause size={26} fill="currentColor" />
          ) : (
            <Play size={26} fill="currentColor" />
          )}
        </button>
      </div>

      {/* Waveform */}
      <div className="mt-6 flex h-20 items-end gap-[3px]" aria-hidden>
        {Array.from({ length: 56 }).map((_, i) => {
          const reached = (i / 56) * 100 < pct;
          return (
            <span
              key={i}
              className={`waveform-bar block flex-1 ${reached ? "bg-blood" : "bg-paper/25"}`}
              style={{
                animationDelay: `${(i % 12) * 70}ms`,
                animationPlayState: playing ? "running" : "paused",
                ["--bar-h" as string]: `${20 + ((i * 37) % 75)}%`,
              }}
            />
          );
        })}
      </div>

      {/* Progress + time */}
      <div className="mt-4 flex items-center gap-4">
        <span className="font-mono text-xs text-paper/70">{mmss(time)}</span>
        <div className="relative h-[3px] flex-1 bg-paper/15">
          <span className="absolute inset-y-0 left-0 bg-blood transition-[width]" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-xs text-paper/70">{mmss(duration || 0)}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper/50">
          <Volume2 size={12} /> {demo ? "DEMO MODE · ADD MP3 IN site.ts" : "STEREO · 320 KBPS"}
        </div>
        <a
          href={bandcampHref}
          target="_blank"
          rel="noreferrer"
          className="border-b-2 border-blood pb-1 font-mono text-xs uppercase tracking-widest text-paper hover:text-blood"
        >
          {cta} →
        </a>
      </div>
    </div>
  );
}
