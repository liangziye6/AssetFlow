from pathlib import Path
import sys

from PIL import Image


def square_crop(image: Image.Image) -> Image.Image:
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    return image.crop((left, top, left + side, top + side))


def save_resized(source: Image.Image, target: Path, size: int) -> None:
    resized = source.resize((size, size), Image.Resampling.LANCZOS)
    target.parent.mkdir(parents=True, exist_ok=True)
    resized.save(target, format="PNG", optimize=True)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit(
            "Usage: generate-brand-assets.py <source-logo.png> <assets-directory>"
        )

    source_path = Path(sys.argv[1]).resolve()
    assets_directory = Path(sys.argv[2]).resolve()

    with Image.open(source_path) as original:
        logo = square_crop(original.convert("RGBA"))
        save_resized(logo, assets_directory / "logo.png", 512)
        for size in (16, 32, 48, 128):
            save_resized(logo, assets_directory / f"icon-{size}.png", size)

    print(f"Generated AssetFlow brand assets from {source_path}")


if __name__ == "__main__":
    main()
