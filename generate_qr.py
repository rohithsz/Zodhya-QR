"""Generate a single QR code that opens Rohith's event landing page.

Edit LANDING_URL below to point to wherever rohith.html is hosted, then run:
    python generate_qr.py

Tip: for quick screen-based testing, just open test-qr.html in your browser —
it generates a QR live for any URL you paste in.
"""
import qrcode
from qrcode.constants import ERROR_CORRECT_M
from pathlib import Path

OUT = Path(__file__).parent

# Replace with the real URL once rohith.html is hosted (Netlify, GitHub Pages, etc.)
# Falling back to LinkedIn so the QR is still useful before hosting.
LANDING_URL = "https://www.linkedin.com/in/rohith-pallerla-13477b98/"

def make_qr(data: str, filename: str):
    qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_M, box_size=14, border=4)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0b1220", back_color="white").convert("RGB")
    path = OUT / filename
    img.save(path)
    print(f"  wrote {path.name}  ->  {data}")

print("Generating QR…")
make_qr(LANDING_URL, "rohith-qr.png")
print("Done.")
