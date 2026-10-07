import re
import glob

files = glob.glob('*.html') + glob.glob('*.js')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # 1. Revert prices from text-[#01b8fa] back to text-primary
    content = content.replace('text-[#01b8fa]', 'text-primary')
    
    # 2. Add hero section changes:
    # "All Over Mumbai Service Available"
    # "Same-Day Service Available"
    content = content.replace('class="text-primary font-semibold"', 'class="text-[#01b8fa] font-semibold"')
    # Let's verify exactly what class they have in index.html first before blinding replacing.
    
    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
