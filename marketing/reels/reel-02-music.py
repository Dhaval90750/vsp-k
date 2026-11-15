"""
VSp!k Reel 02 soundtrack: original music, synthesized from scratch (royalty-free).

120 BPM (one beat = 0.5 s). Timeline matches reel-02.html:
  0.0-4.5  "boring" intro: clock ticks, muffled chords, vinyl hiss
  4.5-5.0  record scratch + riser
  5.0      DROP: crash, tiles slam on 8th notes (paper thuds)
  7.5/8.5/9.5  stamp hits (checklist)
  11.0-14.0    one service word per beat (16th hats)
  14.5     apple whoosh, 17.0/17.5/18.0 coin dings
  19.0     end hit, ring out to 21.5

Usage: python reel-02-music.py out.wav
"""
import sys
import wave
import numpy as np

SR = 44100
DUR = 21.5
N = int(SR * DUR)
rng = np.random.default_rng(7)
BEAT = 0.5

mix = np.zeros(N)


def t_arr(sec):
    return np.arange(int(SR * sec)) / SR


def add(sig, at, gain=1.0):
    i = int(at * SR)
    if i >= N:
        return
    j = min(N, i + len(sig))
    mix[i:j] += sig[: j - i] * gain


def lowpass(x, cutoff):
    # one-pole low-pass
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for k in range(len(x)):
        acc = (1 - a) * x[k] + a * acc
        y[k] = acc
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


# ---------------- drum sounds ----------------
def kick():
    t = t_arr(0.35)
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9) * 1.0 + np.sin(ph * 2) * np.exp(-t * 40) * 0.15


def clap():
    t = t_arr(0.25)
    n = rng.standard_normal(len(t))
    n = highpass(n, 900)
    env = np.exp(-t * 18)
    # three quick bursts like a real clap
    for d in (0.0, 0.012, 0.024):
        k = int(d * SR)
        env[k:k + 200] += 0.6
    return n * env * 0.5


def hat(open_=False):
    t = t_arr(0.18 if open_ else 0.05)
    n = highpass(rng.standard_normal(len(t)), 6000)
    return n * np.exp(-t * (14 if open_ else 70)) * 0.35


def crash():
    t = t_arr(2.2)
    n = highpass(rng.standard_normal(len(t)), 4000)
    return n * np.exp(-t * 2.2) * 0.35


def tick():
    t = t_arr(0.03)
    return np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 300) * 0.5


# ---------------- tonal sounds ----------------
def saw(freq, sec, detune=0.0):
    t = t_arr(sec)
    ph = (t * freq * (1 + detune)) % 1.0
    return 2 * ph - 1


def pad(notes, sec, cutoff=1800):
    t = t_arr(sec)
    s = np.zeros(len(t))
    for n in notes:
        f = midi(n)
        s += saw(f, sec, -0.004) + saw(f, sec, 0.004)
    s = lowpass(s / (2 * len(notes)), cutoff)
    env = np.minimum(1, t / 0.04) * np.exp(-t * 0.6)
    return s * env


def stab(notes, sec=0.22):
    t = t_arr(sec)
    s = np.zeros(len(t))
    for n in notes:
        s += saw(midi(n), sec, 0.003) + saw(midi(n), sec, -0.003)
    s = lowpass(s / (2 * len(notes)), 3200)
    return s * np.exp(-t * 14)


def bass(n, sec=0.24):
    t = t_arr(sec)
    f = midi(n)
    s = np.sign(np.sin(2 * np.pi * f * t)) * 0.5 + np.sin(2 * np.pi * f * t)
    s = lowpass(s, 700)
    return s * np.exp(-t * 6) * np.minimum(1, t / 0.005)


def pluck(n, sec=0.18):
    t = t_arr(sec)
    f = midi(n)
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)
    return s * np.exp(-t * 22)


# ---------------- sound effects ----------------
def thud():  # paper tile slamming down
    t = t_arr(0.3)
    body = np.sin(2 * np.pi * (90 + 120 * np.exp(-t * 30)) * t) * np.exp(-t * 16)
    paper = lowpass(rng.standard_normal(len(t)), 2500) * np.exp(-t * 35) * 0.8
    return body + paper


def whoosh(sec=0.45, up=True):
    t = t_arr(sec)
    n = rng.standard_normal(len(t))
    env = np.sin(np.pi * t / sec) ** 2
    cut = 400 + 5000 * (t / sec if up else 1 - t / sec)
    # time-varying low-pass, done in chunks
    out = np.zeros(len(t))
    step = 512
    for k in range(0, len(t), step):
        out[k:k + step] = lowpass(n[k:k + step], float(cut[k]))
    return out * env * 0.6


def stamp():
    t = t_arr(0.35)
    k = kick()[: len(t)] * 0.8
    n = lowpass(rng.standard_normal(len(t)), 3000) * np.exp(-t * 25) * 0.7
    return k + n


def ding(f=1760):
    t = t_arr(0.9)
    s = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.76 * t) + 0.25 * np.sin(2 * np.pi * f * 5.4 * t)
    return s * np.exp(-t * 6) * 0.35


def scratch():
    t = t_arr(0.5)
    wob = np.sin(2 * np.pi * 7 * t)
    f = 300 + 900 * (wob * 0.5 + 0.5)
    ph = 2 * np.pi * np.cumsum(f) / SR
    tone = np.sign(np.sin(ph)) * 0.3
    n = highpass(rng.standard_normal(len(t)), 1500) * 0.4
    return (tone + n) * np.minimum(1, t / 0.01) * np.exp(-t * 2)


def riser(sec=0.6):
    t = t_arr(sec)
    f = 200 * 2 ** (t / sec * 3)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * (t / sec) ** 2 * 0.25 + whoosh(sec, True) * 0.5


# ---------------- arrangement ----------------
AM, F, C, G = [57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]
ROOT = {id(AM): 45, id(F): 41, id(C): 36, id(G): 43}

# Intro 0-4.5: ticks, muffled chords, hiss ("nothing is happening")
for b in range(9):
    add(tick(), b * BEAT, 0.6)
add(lowpass(pad(AM, 2.2, 600), 500), 0.0, 0.9)
add(lowpass(pad(F, 2.6, 600), 500), 2.0, 0.9)
hiss = lowpass(rng.standard_normal(int(SR * 4.8)), 3000) * 0.025
add(hiss, 0.0)
add(scratch(), 4.45, 0.9)
add(riser(0.55), 4.45, 0.8)

# Drop 5.0-19.0 : Am F C G Am F C (one bar = 2 s each)
prog = [AM, F, C, G, AM, F, C]
for bar, ch in enumerate(prog):
    t0 = 5.0 + bar * 2.0
    add(pad(ch, 2.0, 2600), t0, 0.5)
    for beat in range(4):
        tb = t0 + beat * BEAT
        add(kick(), tb, 0.95)
        if beat in (1, 3):
            add(clap(), tb, 0.8)
        add(hat(), tb + BEAT / 2, 0.8)                  # offbeat hats
        add(stab(ch), tb + BEAT / 2, 0.22)              # offbeat chord stabs
        add(bass(ROOT[id(ch)]), tb, 0.55)
        add(bass(ROOT[id(ch)] + 12, 0.18), tb + BEAT / 2, 0.35)
        if 11.0 <= tb < 14.5:                           # extra energy in the word-flash section
            add(hat(), tb + BEAT / 4, 0.5)
            add(hat(), tb + 3 * BEAT / 4, 0.5)
        if tb >= 9.0:                                   # arp joins
            for s16 in range(4):
                n = ch[(beat * 4 + s16) % 3] + 12 + (12 if s16 == 3 else 0)
                add(pluck(n), tb + s16 * BEAT / 4, 0.12)

add(crash(), 5.0, 0.9)
add(crash(), 13.0, 0.5)

# SFX synced to visuals
for k, at in enumerate((5.0, 5.25, 5.5, 5.75, 6.0)):
    add(thud(), at, 0.9)
add(whoosh(0.4), 6.35, 0.5)
for at in (7.5, 8.5):
    add(stamp(), at, 0.7)
add(stamp(), 9.5, 1.0)
add(crash(), 9.5, 0.4)
for at in np.arange(11.0, 14.5, 0.5):
    add(whoosh(0.18), at - 0.06, 0.25)
add(whoosh(0.5, up=False), 14.4, 0.7)
add(thud(), 14.85, 0.7)
add(ding(1760), 17.0)
add(ding(2093), 17.5)
add(ding(2637), 18.0)

# End 19.0: big hit, ring out
add(kick(), 19.0, 1.1)
add(crash(), 19.0, 0.9)
add(pad(AM + [69], 2.5, 3000), 19.0, 0.7)
add(stab([45, 57, 64]), 19.0, 0.6)
for k, at in enumerate((19.0, 19.08, 19.16, 19.24, 19.32)):
    add(thud(), at, 0.35)

# ---------------- master ----------------
mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.95
mix = np.tanh(mix * 1.4) / np.tanh(1.4)               # gentle glue / soft clip
fade = int(SR * 1.2)
mix[-fade:] *= np.linspace(1, 0, fade) ** 2
mix[: int(SR * 0.01)] *= np.linspace(0, 1, int(SR * 0.01))
pcm = (mix * 0.92 * 32767).astype(np.int16)
stereo = np.repeat(pcm[:, None], 2, axis=1)

out = sys.argv[1] if len(sys.argv) > 1 else "reel-02-music.wav"
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(stereo.tobytes())
print("wrote", out, f"{DUR}s")
