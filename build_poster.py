"""
Family Jeju 6-Day Travel Itinerary Poster
Visual Philosophy: Cartographer's Diary
A4 portrait, 300dpi (2480 x 3508)
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont

random.seed(7)

# ─── Canvas ───
W, H = 2480, 3508
OUT = "/Users/lulu/AI Project/Travel/Jeju/family-itinerary-poster.png"

# ─── Palette (warm vintage cartography) ───
PAPER = (245, 236, 215)
PAPER_DEEP = (232, 218, 188)
PAPER_LAND = (250, 241, 220)
INK = (45, 38, 30)
INK_SOFT = (96, 82, 64)
INK_FAINT = (148, 132, 105)
ACCENT_GOLD = (172, 128, 60)
BORDER_FADE = (212, 196, 161)
SEA = (218, 224, 220)
SEA_HATCH = (196, 206, 200)

DAY_COLORS = [
    (74, 107, 140),   # D1 dusty navy
    (94, 125, 94),    # D2 moss
    (184, 112, 74),   # D3 terracotta
    (91, 138, 142),   # D4 jeju teal
    (77, 90, 140),    # D5 indigo
    (183, 143, 63),   # D6 mustard
]

# ─── Fonts ───
FONT_DIR = "/Users/lulu/.claude/skills/canvas-design/canvas-fonts"
PF = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/86ba2c91f017a3749571a82f2c6d890ac7ffb2fb.asset/AssetData/PingFang.ttc"
YT = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/4a418d1fa4860652a3241e8ee457806c8557fc64.asset/AssetData/Yuanti.ttc"

def font(name, size, index=0):
    return ImageFont.truetype(name, size, index=index)

F_TITLE_ZH    = font(YT, 200, index=1)
F_SUB_ZH      = font(PF, 46, index=2)
F_DAY_TITLE   = font(YT, 62, index=1)
F_DAY_LABEL   = font(PF, 36, index=2)
F_STOP        = font(PF, 32, index=2)
F_STOP_TIME   = font(PF, 28, index=2)
F_FOOTNOTE_ZH = font(PF, 30, index=2)
F_TINY_ZH     = font(PF, 24, index=2)
F_PIN_LABEL   = font(YT, 28, index=1)
F_LANDMARK    = font(PF, 22, index=2)

F_NUM_PIN     = font(f"{FONT_DIR}/Italiana-Regular.ttf", 70)
F_NUM_DAY     = font(f"{FONT_DIR}/Italiana-Regular.ttf", 180)
F_DATE_LATIN  = font(f"{FONT_DIR}/CrimsonPro-Italic.ttf", 42)
F_KICKER      = font(f"{FONT_DIR}/CrimsonPro-Italic.ttf", 32)
F_LATIN_LABEL = font(f"{FONT_DIR}/CrimsonPro-Regular.ttf", 30)
F_LATIN_TINY  = font(f"{FONT_DIR}/CrimsonPro-Regular.ttf", 22)


# ─── Helpers ───
def paper_grain(img):
    px = img.load()
    for _ in range(120000):
        x = random.randint(0, W - 1)
        y = random.randint(0, H - 1)
        n = random.randint(-5, 5)
        r, g, b, a = px[x, y]
        px[x, y] = (max(0, min(255, r + n)),
                    max(0, min(255, g + n)),
                    max(0, min(255, b + n)),
                    a)


def smooth_curve(pts, samples_per_seg=24):
    """Catmull-Rom spline through closed loop."""
    n = len(pts)
    out = []
    for i in range(n):
        p0 = pts[(i - 1) % n]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n]
        for j in range(samples_per_seg):
            t = j / samples_per_seg
            t2, t3 = t * t, t * t * t
            x = 0.5 * ((2 * p1[0]) +
                       (-p0[0] + p2[0]) * t +
                       (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                       (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)
            y = 0.5 * ((2 * p1[1]) +
                       (-p0[1] + p2[1]) * t +
                       (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                       (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
            out.append((x, y))
    return out


# ─── Jeju Outline ───
# Real Jeju: ~73km E-W × 31km N-S, oval but with distinct lobes.
# Bbox: lng 126.15–127.00, lat 33.18–33.57
MAP_BOX = (180, 720, 2300, 1620)
GEO_BOX = (126.13, 33.155, 127.02, 33.585)

def geo_to_px(lng, lat):
    x0, y0, x1, y1 = MAP_BOX
    lw, ls, le, ln = GEO_BOX
    px = x0 + (lng - lw) / (le - lw) * (x1 - x0)
    py = y1 - (lat - ls) / (ln - ls) * (y1 - y0)
    return px, py

# Hand-tuned coastline (clockwise from NW), more characterful than the actual oval.
# Real Jeju is wider east-west, with a small eastern hook (城山日出峰 area).
JEJU_COAST = [
    (126.155, 33.34),
    (126.18, 33.42),
    (126.22, 33.495),
    (126.28, 33.535),
    (126.34, 33.555),
    (126.42, 33.565),
    (126.50, 33.572),
    (126.58, 33.572),
    (126.66, 33.572),
    (126.72, 33.567),
    (126.78, 33.560),
    (126.83, 33.553),
    (126.88, 33.548),
    (126.93, 33.535),
    (126.96, 33.51),
    (126.985, 33.48),
    (127.005, 33.44),
    (126.995, 33.40),
    (126.97, 33.36),
    (126.94, 33.31),
    (126.90, 33.255),
    (126.83, 33.215),
    (126.74, 33.20),
    (126.66, 33.19),
    (126.58, 33.19),
    (126.50, 33.20),
    (126.42, 33.215),
    (126.34, 33.235),
    (126.27, 33.26),
    (126.22, 33.29),
    (126.185, 33.32),
]

# ─── Stops ───
DAY_PIN_LABELS = [
    "Air City\n飯店",
    "咸德海岸\n+ 朝天別墅",
    "海女博物館\n+ Jungane",
    "牛島\n環島之旅",
    "Aqua Planet\n+ 樂天免稅",
    "CJU 返航",
]
PIN_SPOTS_GEO = [
    (126.42, 33.50),
    (126.62, 33.55),
    (126.86, 33.555),
    (126.96, 33.53),
    (126.86, 33.42),
    (126.46, 33.42),
]


# ─── Begin drawing ───
img = Image.new("RGBA", (W, H), PAPER + (255,))
draw = ImageDraw.Draw(img)

paper_grain(img)

# vignette
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for i in range(60):
    a = int(22 * (i / 60))
    od.rectangle([i, i, W - i, H - i], outline=(60, 50, 30, a))
img.alpha_composite(overlay)


# ─── Outer frame ───
draw.rectangle([110, 110, W - 110, H - 110], outline=BORDER_FADE, width=3)
draw.rectangle([132, 132, W - 132, H - 132], outline=BORDER_FADE, width=1)
for cx, cy in [(110, 110), (W - 110, 110), (110, H - 110), (W - 110, H - 110)]:
    draw.ellipse([cx - 10, cy - 10, cx + 10, cy + 10], fill=ACCENT_GOLD)


# ─── HEADER ───
header_y = 220
draw.text((W // 2, header_y), "—— A FAMILY VOYAGE ——", font=F_KICKER, fill=INK_SOFT, anchor="mm")
draw.text((W // 2, header_y + 130), "家人濟州 6 日", font=F_TITLE_ZH, fill=INK, anchor="mm")
draw.text((W // 2, header_y + 265), "2026 · 07 · 06  —  07 · 11", font=F_DATE_LATIN, fill=ACCENT_GOLD, anchor="mm")
draw.text((W // 2, header_y + 325), "Jeju Island ‧ 高雄直飛 ‧ 全程自駕 ‧ 五天四夜",
          font=F_SUB_ZH, fill=INK_SOFT, anchor="mm")

divider_y = header_y + 390
draw.line([(W // 2 - 380, divider_y), (W // 2 - 30, divider_y)], fill=BORDER_FADE, width=2)
draw.line([(W // 2 + 30, divider_y), (W // 2 + 380, divider_y)], fill=BORDER_FADE, width=2)
draw.ellipse([W // 2 - 9, divider_y - 9, W // 2 + 9, divider_y + 9], outline=ACCENT_GOLD, width=2)


# ─── MAP AREA ───
mx0, my0, mx1, my1 = MAP_BOX
sea_pad_x = 50
sea_pad_top = 50
sea_pad_bot = 70
draw.rounded_rectangle([mx0 - sea_pad_x, my0 - sea_pad_top, mx1 + sea_pad_x, my1 + sea_pad_bot],
                       radius=28, fill=SEA, outline=BORDER_FADE, width=2)

# Sea texture: tiny wave dashes
for y in range(my0 - sea_pad_top + 30, my1 + sea_pad_bot - 20, 30):
    for x in range(mx0 - sea_pad_x + 28, mx1 + sea_pad_x - 28, 90):
        offset = ((y // 30) % 2) * 45
        draw.line([(x + offset, y), (x + offset + 20, y)], fill=SEA_HATCH, width=2)

# Map label (top-left of sea area)
draw.text((mx0 - 30, my0 - sea_pad_top + 18), "JEJU  ISLAND",
          font=F_LATIN_LABEL, fill=INK_SOFT)
draw.text((mx0 - 30, my0 - sea_pad_top + 56), "濟州島 ‧ 自駕路線圖",
          font=F_TINY_ZH, fill=INK_SOFT)

# Scale bar (bottom-left)
sb_x, sb_y = mx0 + 20, my1 + sea_pad_bot - 30
draw.line([(sb_x, sb_y), (sb_x + 200, sb_y)], fill=INK_SOFT, width=2)
for i, x_off in enumerate([0, 100, 200]):
    draw.line([(sb_x + x_off, sb_y - 6), (sb_x + x_off, sb_y + 6)], fill=INK_SOFT, width=2)
draw.text((sb_x, sb_y + 12), "0", font=F_LATIN_TINY, fill=INK_SOFT)
draw.text((sb_x + 100, sb_y + 12), "10", font=F_LATIN_TINY, fill=INK_SOFT, anchor="lt")
draw.text((sb_x + 200, sb_y + 12), "20 km", font=F_LATIN_TINY, fill=INK_SOFT, anchor="lt")

# Compass rose (top-right)
cr_x, cr_y = mx1 + sea_pad_x - 80, my0 - sea_pad_top + 90
draw.ellipse([cr_x - 50, cr_y - 50, cr_x + 50, cr_y + 50], outline=INK_SOFT, width=2)
draw.ellipse([cr_x - 26, cr_y - 26, cr_x + 26, cr_y + 26], outline=INK_SOFT, width=1)
draw.polygon([(cr_x, cr_y - 46), (cr_x - 9, cr_y - 6), (cr_x + 9, cr_y - 6)], fill=INK)
draw.polygon([(cr_x, cr_y + 46), (cr_x - 7, cr_y + 6), (cr_x + 7, cr_y + 6)], outline=INK_SOFT, width=1)
draw.text((cr_x, cr_y - 70), "N", font=F_LATIN_LABEL, fill=INK, anchor="mm")

# Jeju coastline
coast_pts = [geo_to_px(lng, lat) for lng, lat in JEJU_COAST]
smooth = smooth_curve(coast_pts, samples_per_seg=24)

# Drop shadow under island
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.polygon([(p[0] + 6, p[1] + 8) for p in smooth], fill=(60, 50, 30, 60))
shadow = shadow.filter(ImageFilter_blur := __import__('PIL.ImageFilter', fromlist=['ImageFilter']).GaussianBlur(8))
img.alpha_composite(shadow)

# Fill island
draw.polygon(smooth, fill=PAPER_LAND)

# Coastline with hand-feel jitter
for i in range(len(smooth)):
    p1 = (smooth[i][0] + random.uniform(-0.6, 0.6), smooth[i][1] + random.uniform(-0.6, 0.6))
    p2 = (smooth[(i + 1) % len(smooth)][0] + random.uniform(-0.6, 0.6),
          smooth[(i + 1) % len(smooth)][1] + random.uniform(-0.6, 0.6))
    draw.line([p1, p2], fill=INK, width=5)

# Subtle internal contour (1 inner line, parallel)
inner = [(p[0] * 0.97 + W * 0.5 * 0.03, p[1] * 0.97 + (my0 + my1) / 2 * 0.03) for p in smooth]
for i in range(0, len(inner), 3):
    p1 = inner[i]
    p2 = inner[(i + 1) % len(inner)]
    draw.line([p1, p2], fill=INK_FAINT, width=1)

# Halla mountain — bigger, more presence
hx, hy = geo_to_px(126.53, 33.36)
# triangle stack
draw.polygon([(hx - 95, hy + 55), (hx, hy - 95), (hx + 95, hy + 55)], outline=INK, width=3)
draw.polygon([(hx - 60, hy + 35), (hx, hy - 55), (hx + 60, hy + 35)], outline=INK_SOFT, width=2)
# snow cap (small dots near top)
draw.ellipse([hx - 14, hy - 80, hx - 4, hy - 72], fill=INK_SOFT)
draw.ellipse([hx + 4, hy - 80, hx + 14, hy - 72], fill=INK_SOFT)
# label
draw.text((hx, hy + 88), "漢拏山", font=F_LANDMARK, fill=INK, anchor="mm")
draw.text((hx, hy + 118), "Hallasan 1,950m", font=F_LATIN_TINY, fill=INK_SOFT, anchor="mm")

# Tangerine grove dots (sprinkled around Halla, suggesting orchards)
random.seed(11)
for _ in range(28):
    ang = random.uniform(0, math.tau)
    r = random.uniform(180, 380)
    ox = hx + math.cos(ang) * r
    oy = hy + math.sin(ang) * r * 0.55
    # confine to island bounds (rough)
    if my0 + 60 < oy < my1 - 60 and mx0 + 80 < ox < mx1 - 80:
        draw.ellipse([ox - 4, oy - 4, ox + 4, oy + 4], fill=(200, 140, 70))

# Udo island
ux, uy = geo_to_px(126.97, 33.503)
draw.ellipse([ux - 30, uy - 18, ux + 30, uy + 18], fill=PAPER_LAND, outline=INK, width=3)
draw.text((ux, uy + 32), "牛島 Udo", font=F_LATIN_TINY, fill=INK_SOFT, anchor="mm")


# ─── Route — visible dotted gold line through day waypoints ───
DAY_WAYPTS = [(126.46, 33.50), (126.55, 33.555), (126.86, 33.55), (126.96, 33.52), (126.86, 33.43), (126.46, 33.42)]
wpx = [geo_to_px(lng, lat) for lng, lat in DAY_WAYPTS]
# Draw smooth dotted line
route_smooth = smooth_curve([wpx[0]] + wpx + [wpx[-1]], samples_per_seg=40)
for i, (rx, ry) in enumerate(route_smooth):
    if i % 5 < 2:
        draw.ellipse([rx - 4, ry - 4, rx + 4, ry + 4], fill=ACCENT_GOLD)


# ─── Numbered cartouche pins ───
def draw_cartouche(x, y, day_idx, label):
    color = DAY_COLORS[day_idx]
    # paper halo
    draw.ellipse([x - 46, y - 46, x + 46, y + 46], fill=PAPER)
    # color disc
    draw.ellipse([x - 40, y - 40, x + 40, y + 40], fill=color)
    # inner stroke
    draw.ellipse([x - 36, y - 36, x + 36, y + 36], outline=PAPER, width=2)
    # number
    draw.text((x, y - 4), str(day_idx + 1), font=F_NUM_PIN, fill=PAPER, anchor="mm")
    # label
    for li, line in enumerate(label.split("\n")):
        ty = y + 56 + li * 32
        # stroke for legibility against map
        draw.text((x + 2, ty + 2), line, font=F_PIN_LABEL, fill=PAPER, anchor="mm",
                  stroke_width=6, stroke_fill=PAPER)
        draw.text((x, ty), line, font=F_PIN_LABEL, fill=INK, anchor="mm",
                  stroke_width=4, stroke_fill=PAPER)

for i, (g_lng, g_lat) in enumerate(PIN_SPOTS_GEO):
    px, py = geo_to_px(g_lng, g_lat)
    draw_cartouche(px, py, i, DAY_PIN_LABELS[i])


# ─── DAY CARDS ───
card_top = my1 + sea_pad_bot + 40
card_w = (W - 300) // 2 - 30
card_h = 425
gap_x = 60
gap_y = 22

DAY_DATA = [
    {"num": 1, "date": "7/6 (一)", "latin": "Day One — Arrival",   "title": "出發 ‧ 抵達",
     "stops": [("15:50", "高雄 KHH → 濟州 CJU"),
               ("18:50", "抵達濟州機場"),
               ("20:30", "入住 Air City 飯店")],
     "stay": "蓮洞市區｜Air City"},
    {"num": 2, "date": "7/7 (二)", "latin": "Day Two — Coastline", "title": "東部海邊漫步",
     "stops": [("09:00", "租車取車"),
               ("10:00", "東門市場 ‧ 買被被"),
               ("12:00", "黑豬肉一條街"),
               ("14:30", "咸德海水浴場"),
               ("17:00", "小朝天海景別墅")],
     "stay": "朝天邑｜海景泳池別墅"},
    {"num": 3, "date": "7/8 (三)", "latin": "Day Three — Reunion", "title": "貝果 ‧ 海女博物館",
     "stops": [("09:00", "London Bagel Museum"),
               ("11:00", "海女博物館（與我會合）"),
               ("16:00", "Jungane 泳池別墅")],
     "stay": "舊左邑｜Jungane Spa Villa"},
    {"num": 4, "date": "7/9 (四)", "latin": "Day Four — Udo",      "title": "牛島單車環島",
     "stops": [("09:30", "城山港搭船"),
               ("10:30", "牛島騎車 ‧ 花生冰淇淋"),
               ("15:00", "別墅玩水聚餐")],
     "stay": "舊左邑｜Jungane Spa Villa"},
    {"num": 5, "date": "7/10 (五)", "latin": "Day Five — Aquarium", "title": "水族館 ‧ 免稅血拼",
     "stops": [("10:00", "Aqua Planet 水族館"),
               ("14:00", "樂天免稅店"),
               ("18:00", "還車"),
               ("19:30", "Air City 飯店")],
     "stay": "蓮洞市區｜Air City"},
    {"num": 6, "date": "7/11 (六)", "latin": "Day Six — Homeward",  "title": "返航 ‧ 回到家",
     "stops": [("08:30", "抵達濟州機場"),
               ("10:50", "起飛 CJU → KHH"),
               ("12:15", "抵達高雄 ‧ 旅程圓滿")],
     "stay": "—"},
]


def draw_card(x, y, w, h, data, color):
    # main paper
    draw.rounded_rectangle([x, y, x + w, y + h], radius=16, fill=(252, 245, 226),
                            outline=(218, 202, 165), width=1)
    # left color rail
    rail = 16
    draw.rounded_rectangle([x, y, x + rail, y + h], radius=16, fill=color)

    pad_l = rail + 36
    pad_t = 24

    # Giant watermark day numeral on the right (subtle but visible)
    faded = tuple(int(c * 0.55 + 252 * 0.45) for c in color)
    draw.text((x + w - 38, y - 8), str(data["num"]), font=F_NUM_DAY, fill=faded, anchor="rt")

    # latin kicker
    draw.text((x + pad_l, y + pad_t), data["latin"], font=F_KICKER, fill=INK_SOFT)
    # date
    date_y = y + pad_t + 44
    draw.text((x + pad_l, date_y), data["date"], font=F_DAY_LABEL, fill=color)
    # title
    title_y = date_y + 50
    draw.text((x + pad_l, title_y), data["title"], font=F_DAY_TITLE, fill=INK)
    # divider
    sep_y = title_y + 74
    draw.line([(x + pad_l, sep_y), (x + w - 40, sep_y)], fill=BORDER_FADE, width=1)
    # stops
    stop_y = sep_y + 18
    for time, text in data["stops"]:
        draw.text((x + pad_l, stop_y), time, font=F_STOP_TIME, fill=color)
        draw.text((x + pad_l + 112, stop_y - 2), text, font=F_STOP, fill=INK)
        stop_y += 36
    # stay
    stay_y = y + h - 42
    draw.text((x + pad_l, stay_y), "今晚住宿  ·  " + data["stay"],
              font=F_TINY_ZH, fill=INK_SOFT)


for i, dat in enumerate(DAY_DATA):
    row = i // 2
    col = i % 2
    cx = 150 + col * (card_w + gap_x)
    cy = card_top + row * (card_h + gap_y)
    draw_card(cx, cy, card_w, card_h, dat, DAY_COLORS[i])


# ─── FOOTER ───
# Cards span = 3*card_h + 2*gap_y, ends at card_top + that
cards_bottom = card_top + 3 * card_h + 2 * gap_y
foot_y = cards_bottom + 45

draw.line([(180, foot_y), (W - 180, foot_y)], fill=BORDER_FADE, width=1)
draw.text((W // 2, foot_y + 34), "TRAVEL  REMINDERS  ‧  行前提醒",
          font=F_LATIN_LABEL, fill=ACCENT_GOLD, anchor="mm")

tips = [
    ("📜", "e-Arrival 電子入境卡", "行前 3 天線上填"),
    ("🚫", "EVE 止痛藥韓國列管", "別帶；普拿疼可"),
    ("🔋", "行動電源不能託運", "≤100Wh 隨身"),
    ("☀️", "7 月紫外線爆表", "防曬 SPF50+ 必備"),
    ("🌧️", "7/10 預報陣雨", "輕便雨傘"),
    ("🚗", "自駕需國際駕照", "韓國行駛靠右"),
]
tip_top = foot_y + 78
col_w = (W - 340) / 3
row_h = 78
for i, (icon, head, body) in enumerate(tips):
    col = i % 3
    row = i // 3
    tx = 180 + col * col_w
    ty = tip_top + row * row_h
    draw.ellipse([tx, ty, tx + 46, ty + 46], fill=PAPER_DEEP, outline=BORDER_FADE, width=1)
    draw.text((tx + 23, ty + 23), icon, font=F_TINY_ZH, fill=INK, anchor="mm")
    draw.text((tx + 64, ty + 2), head, font=F_FOOTNOTE_ZH, fill=INK)
    draw.text((tx + 64, ty + 38), body, font=F_TINY_ZH, fill=INK_SOFT)


# ─── Signature ───
sig_y = tip_top + 2 * row_h + 40
draw.line([(W // 2 - 320, sig_y), (W // 2 + 320, sig_y)], fill=BORDER_FADE, width=1)
draw.text((W // 2, sig_y + 32), "Made with love for the family",
          font=F_KICKER, fill=ACCENT_GOLD, anchor="mm")
draw.text((W // 2, sig_y + 70), "一家人的紀念  ‧  CARTOGRAPHER'S DIARY  ‧  EDITION 01",
          font=F_LATIN_LABEL, fill=INK_SOFT, anchor="mm")


# ─── Output ───
img.convert("RGB").save(OUT, "PNG", dpi=(300, 300))
print(f"Saved: {OUT}")
