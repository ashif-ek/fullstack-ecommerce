import os
from PIL import Image

# Paths
PUBLIC_DIR = r"d:\fullstack-ecommerce\frontend\public"
QUALITY = 80


def optimize_images():
    print(f"Scanning {PUBLIC_DIR}...")
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for file in files:
            if file.lower().endswith((".png", ".jpg", ".jpeg")):
                file_path = os.path.join(root, file)
                filename, ext = os.path.splitext(file)
                webp_path = os.path.join(root, filename + ".webp")

                print(f"Converting {file}...")

                try:
                    with Image.open(file_path) as img:
                        # Resize if too large (e.g., width > 1920)
                        if img.width > 1920:
                            ratio = 1920 / img.width
                            new_height = int(img.height * ratio)
                            img = img.resize(
                                (1920, new_height), Image.Resampling.LANCZOS
                            )

                        img.save(webp_path, "WEBP", quality=QUALITY)

                        # Compare sizes
                        original_size = os.path.getsize(file_path)
                        new_size = os.path.getsize(webp_path)
                        saved = original_size - new_size
                        print(
                            f"  Saved {saved / 1024:.2f} KB ({saved / original_size * 100:.1f}%)"
                        )

                except Exception as e:
                    print(f"  Error converting {file}: {e}")


if __name__ == "__main__":
    optimize_images()
