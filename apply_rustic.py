import os
import re

components_dir = r"d:\Blaze_Overseas_LLP\components"

# We map which component gets which rustic texture
color_map = {
    "Hero.tsx": "bg-rustic-hero",
    "About.tsx": "bg-rustic-section-1",
    "Products.tsx": "bg-rustic-section-2",
    "Strength.tsx": "bg-rustic-section-1",
    "Mission.tsx": "bg-rustic-section-2",
    "Certifications.tsx": "bg-rustic-section-1",
    "Packaging.tsx": "bg-rustic-section-2",
    "Contact.tsx": "bg-rustic-section-1",
    "Footer.tsx": "bg-rustic-section-2",
    "CtaBanner.tsx": "bg-rustic-section-1",
    "Preloader.tsx": "bg-rustic-section-2",
}

for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(".tsx"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            texture = color_map.get(file, "bg-rustic-section-1")

            # Replace darkbg variants with our explicit rustic colors
            content = re.sub(r"dark:bg-\[#0a0a0a\]", texture, content)
            content = re.sub(r"dark:bg-\[#1a1a1a\]", "bg-rustic-card", content)
            content = re.sub(r"bg-\[#(0a0a0a|050505|1a1a1a|000000|020202)\]", texture, content)
            
            # Special case for card borders if they use dark:border-white/5 -> border-[#382415]
            content = re.sub(r"dark:border-white/5", "border-[#382415]", content)
            
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

print("Applied rustic themes to components.")
