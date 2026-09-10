import os
import shutil
from reportlab.pdfgen import canvas
from PIL import Image

def generate_combo_pdf():
    workspace = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(workspace, "assets", "images")
    output_pdf = os.path.join(workspace, "Happy_Enjoy_Crackers_Family_Combo_List.pdf")
    backup_pdf = os.path.join(workspace, "Happy_Enjoy_Crackers_Family_Combo_List.pdf.bak")

    # Backup original PDF if backup doesn't exist
    if os.path.exists(output_pdf) and not os.path.exists(backup_pdf):
        shutil.copy2(output_pdf, backup_pdf)
        print(f"Backed up original PDF to {backup_pdf}")

    # List of images in page order:
    # Page 1: Cover / Banner
    # Page 2: Kutty Chellam (4K)
    # Page 3: Golden Combo (6K)
    # Page 4: Sweet Mass Combo (4K)
    # Page 5: Gold Thala Deepavali (6K)
    # Page 6: Love Jodi Combo (12K)
    page_images = [
        os.path.join(assets_dir, "combo_banner.jpg"),
        os.path.join(assets_dir, "combo_page_1.png"),
        os.path.join(assets_dir, "combo_page_2.png"),
        os.path.join(assets_dir, "combo_page_3.png"),
        os.path.join(assets_dir, "combo_page_4.png"),
        os.path.join(assets_dir, "combo_page_5.png"),
    ]

    temp_output = os.path.join(workspace, "Happy_Enjoy_Crackers_Family_Combo_List_new.pdf")
    c = None
    standard_width = 540.0  # 7.5 inches standard page width in PDF points

    for idx, img_path in enumerate(page_images):
        if not os.path.exists(img_path):
            raise FileNotFoundError(f"Required page image not found: {img_path}")

        with Image.open(img_path) as img:
            w, h = img.size
            page_w = standard_width
            page_h = (float(h) / float(w)) * page_w

            if c is None:
                c = canvas.Canvas(temp_output, pagesize=(page_w, page_h))
            else:
                c.setPageSize((page_w, page_h))

            c.drawImage(img_path, 0, 0, width=page_w, height=page_h)
            c.showPage()
            print(f"Added Page {idx + 1}: {os.path.basename(img_path)} ({w}x{h}) -> {page_w:.1f}x{page_h:.1f} pt")

    c.save()

    # Atomically replace output PDF
    if os.path.exists(output_pdf):
        os.remove(output_pdf)
    os.rename(temp_output, output_pdf)
    print(f"Successfully generated {output_pdf} (Size: {os.path.getsize(output_pdf)} bytes)")

if __name__ == "__main__":
    generate_combo_pdf()
