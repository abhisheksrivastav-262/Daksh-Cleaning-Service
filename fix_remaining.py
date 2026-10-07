import os
import glob

# 1. Append custom colors to index.css
with open('css/index.css', 'a', encoding='utf-8') as f:
    f.write("\n/* Sky Blue Custom Classes */\n")
    f.write(".bg-\\[\\#01b8fa\\] { background-color: #01b8fa !important; }\n")
    f.write(".hover\\:bg-\\[\\#01a0db\\]:hover { background-color: #01a0db !important; }\n")
    f.write(".text-\\[\\#01b8fa\\] { color: #01b8fa !important; }\n")
    f.write(".hover\\:text-\\[\\#01a0db\\]:hover { color: #01a0db !important; }\n")

# 2. Fix hero text and footer in html and js
files = glob.glob('*.html') + glob.glob('*.js')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # Replace footer
    content = content.replace("&copy; 2026 Daksh Cleaning Service. All Rights Reserved. Adapted from cleanzon.co.in clone.", "&copy; 2026 Daksh Cleaning Service. All Rights Reserved.")
    
    # 3. Replace hero strings in index.html
    if file == 'index.html':
        # "All Over Mumbai Service Available"
        content = content.replace('text-primary font-bold px-3 py-1 rounded-full text-sm border border-primary/20">All Over Mumbai Service Available', 'text-[#01b8fa] font-bold px-3 py-1 rounded-full text-sm border border-primary/20">All Over Mumbai Service Available')
        # "Same-Day Service Available"
        content = content.replace('text-primary font-bold px-3 py-1 rounded-full text-sm border border-primary/20">Same-Day Service Available', 'text-[#01b8fa] font-bold px-3 py-1 rounded-full text-sm border border-primary/20">Same-Day Service Available')
        
    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
