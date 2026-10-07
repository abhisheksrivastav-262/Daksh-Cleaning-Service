import re
import glob

files = glob.glob('*.html') + glob.glob('*.js')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # We want to replace green utility classes, BUT we must NOT touch Call Now and WhatsApp.
    # Call Now uses: bg-[#00A651] hover:bg-green-700
    # WhatsApp in booking.html uses: bg-green-600 hover:bg-green-700
    # WhatsApp floating uses: bg-[#25D366] hover:bg-[#1ebe57]
    
    # First, let's protect Call Now and WhatsApp by temporarily hiding them.
    # To do this safely, we will just replace the specific lines or use targeted replacements.
    
    # 1. Verified badge (green-100 / green-800)
    content = content.replace('bg-green-100 text-green-800', 'bg-primary-light text-primary-dark')
    
    # 2. 15% OFF / 20% OFF tags (text-green-500 bg-green-100)
    content = content.replace('text-green-500 bg-green-100', 'text-primary bg-primary-light')
    
    # 3. CTA button in index.html (bg-green-600 hover:bg-green-700)
    # The CTA button is: <a href="booking.html" class="inline-flex ... bg-green-600 hover:bg-green-700
    # Only replace if it contains booking.html
    def cta_repl(m):
        t = m.group(0)
        t = t.replace('bg-green-600', 'bg-primary')
        t = t.replace('hover:bg-green-700', 'hover:bg-primary-dark')
        return t
    content = re.sub(r'<a\b[^>]*href=["\']booking\.html["\'][^>]*bg-green-600[^>]*>', cta_repl, content)

    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed remaining greens from {file}")

