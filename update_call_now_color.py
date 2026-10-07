import re
import glob

files = ['index.html', 'booking.html', 'terms.html', 'privacy.html', 'fix_other.js', 'fix_call_btn.js']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    content = content.replace('bg-[#00A651]', 'bg-primary')
    content = content.replace('hover:bg-green-700', 'hover:bg-primary-dark')
    content = content.replace('text-[#00A651]', 'text-primary')
    
    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")

print("Call Now button color updated.")
