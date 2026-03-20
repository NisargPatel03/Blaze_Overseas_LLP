import os
import re

components_dir = r"d:\Blaze_Overseas_LLP\components"

for root, _, files in os.walk(components_dir):
    for file in files:
        if not file.endswith(".tsx"):
            continue
        file_path = os.path.join(root, file)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Remove conflicting bg-white / bg-neutral-50 when rustic version follows
        content = re.sub(r"bg-white (bg-rustic-\S+)", r"\1", content)
        content = re.sub(r"bg-neutral-50 (bg-rustic-\S+)", r"\1", content)
        content = re.sub(r"bg-neutral-50 (bg-rustic-\S+)", r"\1", content)

        # Remove conflicting border-black/5 when rustic border follows
        content = re.sub(r"border-black/5 (border-\[#382415\])", r"\1", content)

        # Fix text colors that would be invisible on dark bg:
        # text-foreground -> text-[#E8DDD4]
        content = content.replace("text-foreground", "text-[#E8DDD4]")

        # Replace any leftover text-black / text-gray-900 / text-gray-800
        content = re.sub(r"text-black(?!\S)", "text-[#E8DDD4]", content)
        content = re.sub(r"text-gray-900(?!\S)", "text-[#E8DDD4]", content)
        content = re.sub(r"text-gray-800(?!\S)", "text-[#D0C5BA]", content)
        content = re.sub(r"text-gray-700(?!\S)", "text-[#B0A090]", content)
        content = re.sub(r"text-gray-600(?!\S)", "text-[#988070]", content)
        content = re.sub(r"text-gray-500(?!\S)", "text-[#806555]", content)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

# Also patch Strength.tsx and Certifications.tsx section backgrounds
for fname, bg_class in [
    ("Strength.tsx", "bg-rustic-section-1"),
    ("Certifications.tsx", "bg-rustic-section-1"),
    ("CtaBanner.tsx", "bg-rustic-section-1"),
    ("Mission.tsx", "bg-rustic-section-2"),
]:
    fp = os.path.join(components_dir, fname)
    if not os.path.exists(fp):
        continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    # Add rustic class to main section element if not already there
    content = re.sub(
        r'(className="py-24 md:py-32 px-6 md:px-12)(?! bg-rustic)',
        rf'\1 {bg_class}',
        content
    )
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)

print("Cleanup complete.")
