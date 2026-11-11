from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
REGULAR = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 17)
SMALL = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 14)
HEADING = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 24)

SECTION_SCENES = [
    ("Hero · nền cát", "hero"),
    ("Dịch vụ · nền cam", "services"),
    ("Xe · nền vàng cát", "vehicle"),
    ("Khu vực · nền xanh sage", "area"),
    ("Đặt xe · nền trắng xám", "steps"),
    ("Liên hệ · nền xanh đậm", "contact"),
]
COLOR_SCENES = [
    ("Cát", "hero"),
    ("Xanh biển", "sea"),
    ("Cam", "services"),
    ("Trắng vôi", "lime"),
]


def render_sheet(scenes, filename, heading):
    thumb_w, thumb_h = 600, 375
    pad, label_h, row_gap, top_h = 22, 27, 14, 70
    width = pad * 3 + thumb_w * 2
    height = top_h + len(scenes) * (label_h + thumb_h + row_gap) + pad
    sheet = Image.new("RGB", (width, height), "#f7f5ef")
    draw = ImageDraw.Draw(sheet)
    draw.text((pad, 19), heading, font=HEADING, fill="#18342d")
    draw.text((width - 245, 26), "TRƯỚC  /  SAU", font=SMALL, fill="#536158")
    y = top_h
    for label, key in scenes:
        draw.text((pad, y), label, font=REGULAR, fill="#263f37")
        y += label_h
        for column, variant in enumerate(("before", "after")):
            source = ROOT / variant / f"{key}.png"
            image = Image.open(source).convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            x = pad + column * (thumb_w + pad)
            sheet.paste(image, (x, y))
            draw.rectangle((x, y, x + thumb_w - 1, y + thumb_h - 1), outline="#c9c5ba", width=1)
        y += thumb_h + row_gap
    sheet.save(ROOT / filename, optimize=True)


render_sheet(SECTION_SCENES, "comparison-sections.png", "Đối chiếu xe theo từng section")
render_sheet(COLOR_SCENES, "comparison-four-colors.png", "Kiểm tra tương phản trên bốn màu nền")
