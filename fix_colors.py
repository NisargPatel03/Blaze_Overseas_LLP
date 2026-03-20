import os
import re

comps = r"d:\Blaze_Overseas_LLP\components"

# -- Fix Packaging cards: bg-neutral-50 dark:bg-[#111] → bg-rustic-card
for fname in ["Packaging.tsx"]:
    fp = os.path.join(comps, fname)
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    content = re.sub(r"bg-neutral-50 dark:bg-\[#111\]", "bg-rustic-card", content)
    content = re.sub(r"bg-white dark:bg-\[#111\]", "bg-rustic-card", content)
    content = re.sub(r"dark:bg-\[#111\]", "bg-rustic-card", content)
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)

# -- Fix About image wrapper still using dark:bg-neutral-800
fp = os.path.join(comps, "About.tsx")
with open(fp, "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("bg-neutral-200 dark:bg-neutral-800", "bg-[#2B170C]")
# Fix paragraph that uses text-[var(--foreground)]
content = content.replace("text-[var(--foreground)] opacity-80", "text-[#E8DDD4]/80")
# Fix border-t on stats
content = content.replace("border-foreground/10", "border-[#E8DDD4]/10")
with open(fp, "w", encoding="utf-8") as f:
    f.write(content)

# -- Fix headings in Products, Mission, Certifications, Packaging, Contact, Strength, CtaBanner
# that have no explicit text color on h2/h3 (they'll fall back to CSS --foreground which may be dark)
patches = {
    "Products.tsx": [
        ('className="products-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance"',
         'className="products-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance text-[#F0E8DE]"'),
    ],
    "Packaging.tsx": [
        ('className="pack-header text-4xl md:text-5xl lg:text-6xl font-display font-medium max-w-4xl mx-auto text-balance mb-8"',
         'className="pack-header text-4xl md:text-5xl lg:text-6xl font-display font-medium max-w-4xl mx-auto text-balance mb-8 text-[#F0E8DE]"'),
        ('className="text-2xl font-display font-medium mb-4">Export',
         'className="text-2xl font-display font-medium mb-4 text-[#F0E8DE]">Export'),
        ('className="text-2xl font-display font-medium mb-4">Timely',
         'className="text-2xl font-display font-medium mb-4 text-[#F0E8DE]">Timely'),
        ('className="text-2xl font-display font-medium mb-4">Custom',
         'className="text-2xl font-display font-medium mb-4 text-[#F0E8DE]">Custom'),
    ],
    "Mission.tsx": [
        ('className="mission-title text-4xl md:text-5xl font-display font-medium max-w-3xl mx-auto text-balance"',
         'className="mission-title text-4xl md:text-5xl font-display font-medium max-w-3xl mx-auto text-balance text-[#F0E8DE]"'),
        ('className="text-2xl font-display font-medium mb-4">Our Mission',
         'className="text-2xl font-display font-medium mb-4 text-[#F0E8DE]">Our Mission'),
        ('className="text-2xl font-display font-medium mb-4">Our Vision',
         'className="text-2xl font-display font-medium mb-4 text-[#F0E8DE]">Our Vision'),
        ('className="text-2xl font-display font-medium mb-4">Our Values',
         'className="text-2xl font-display font-medium mb-4 text-[#F0E8DE]">Our Values'),
    ],
    "Certifications.tsx": [
        ('className="cert-header text-4xl md:text-5xl font-display font-medium mb-6 text-balance"',
         'className="cert-header text-4xl md:text-5xl font-display font-medium mb-6 text-balance text-[#F0E8DE]"'),
        ('className="text-3xl font-display font-bold">100%',
         'className="text-3xl font-display font-bold text-[#F0E8DE]">100%'),
        ('className="font-medium text-lg">{cert}',
         'className="font-medium text-lg text-[#F0E8DE]">{cert}'),
    ],
    "About.tsx": [
        ('className="about-text text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-balance"',
         'className="about-text text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-balance text-[#F0E8DE]"'),
    ],
    "Contact.tsx": [
        ('className="contact-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance"',
         'className="contact-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance text-[#F0E8DE]"'),
        ('className="text-xl font-display font-medium mb-2">Corporate',
         'className="text-xl font-display font-medium mb-2 text-[#F0E8DE]">Corporate'),
        ('className="text-xl font-display font-medium mb-2">Contact',
         'className="text-xl font-display font-medium mb-2 text-[#F0E8DE]">Contact'),
        ('className="text-xl font-display font-medium mb-2">Email',
         'className="text-xl font-display font-medium mb-2 text-[#F0E8DE]">Email'),
        ('className="text-sm font-medium uppercase tracking-widest opacity-70">First',
         'className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">First'),
        ('className="text-sm font-medium uppercase tracking-widest opacity-70">Last',
         'className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Last'),
        ('className="text-sm font-medium uppercase tracking-widest opacity-70">Email Address',
         'className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Email Address'),
        ('className="text-sm font-medium uppercase tracking-widest opacity-70">Product',
         'className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Product'),
        ('className="text-sm font-medium uppercase tracking-widest opacity-70">Message',
         'className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Message'),
        ('className="flex items-center justify-center gap-3 w-full py-4 mt-4 bg-foreground text-background',
         'className="flex items-center justify-center gap-3 w-full py-4 mt-4 bg-[#E8A33A] text-[#1A0A02]'),
    ],
    "Strength.tsx": [
        ('className="strength-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance mb-6"',
         'className="strength-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance mb-6 text-[#F0E8DE]"'),
    ],
    "Footer.tsx": [],
}

for fname, replacements in patches.items():
    fp = os.path.join(comps, fname)
    if not os.path.exists(fp):
        continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)

print("Font colors fixed.")
