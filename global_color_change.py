import re
import glob

# 1. Update css/index.css variables
with open('css/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace HSL hues from 145 (green) to 196 (sky blue), and slightly adjust lightness for DARK SKY-BLUE
css = css.replace('145 100% 33%', '196 100% 40%') # primary
css = css.replace('145 50% 93%', '196 50% 93%')   # primary-light
css = css.replace('145 100% 25%', '196 100% 30%') # primary-dark

# Remove the custom classes I added previously
css = re.sub(r'/\* Sky Blue Custom Classes \*/.*', '', css, flags=re.DOTALL)

with open('css/index.css', 'w', encoding='utf-8') as f:
    f.write(css.strip() + '\n')

# 2. Process all HTML and JS files
files = glob.glob('*.html') + glob.glob('*.js') + glob.glob('js/*.js')

def preserve_call_now(m):
    t = m.group(0)
    t = t.replace('bg-primary', 'bg-[#00A651]')
    t = t.replace('hover:bg-primary-dark', 'hover:bg-green-700')
    t = t.replace('text-primary', 'text-[#00A651]')
    return t

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # a. Revert all hardcoded sky-blue back to primary so they pick up the new global CSS variables
    content = content.replace('bg-[#01b8fa]', 'bg-primary')
    content = content.replace('hover:bg-[#01a0db]', 'hover:bg-primary-dark')
    content = content.replace('text-[#01b8fa]', 'text-primary')
    content = content.replace('hover:text-[#01a0db]', 'hover:text-primary-dark')
    
    # b. Ensure "Call Now" buttons stay green explicitly.
    # Match any <a ... href="tel:...">
    content = re.sub(r'<a\b[^>]*href=["\']tel:[^>]*>', preserve_call_now, content)
    # Match any button/a with aria-label="Call Now"
    content = re.sub(r'<(?:a|button)\b[^>]*aria-label=["\']Call Now["\'][^>]*>', preserve_call_now, content)
    
    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")

print("Global color replacement complete.")
