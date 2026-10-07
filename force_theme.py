import re
import time

css_append = """
/* EXPLICIT THEME OVERRIDE - DARK SKY BLUE */
.bg-primary { background-color: #0082b3 !important; }
.text-primary { color: #0082b3 !important; }
.border-primary { border-color: #0082b3 !important; }
.bg-primary-light { background-color: #e6f6ff !important; }
.text-primary-dark { color: #006080 !important; }
.hover\:bg-primary-dark:hover { background-color: #006080 !important; }
.hover\:bg-primary:hover { background-color: #0082b3 !important; }
.hover\:text-primary:hover { color: #0082b3 !important; }
.hover\:text-primary-dark:hover { color: #006080 !important; }
.hover\:border-primary:hover { border-color: #0082b3 !important; }
.bg-primary\\/10 { background-color: rgba(0, 130, 179, 0.1) !important; }
.bg-primary\\/20 { background-color: rgba(0, 130, 179, 0.2) !important; }
.bg-primary\\/5 { background-color: rgba(0, 130, 179, 0.05) !important; }
.text-primary\\/40 { color: rgba(0, 130, 179, 0.4) !important; }
.border-primary\\/10 { border-color: rgba(0, 130, 179, 0.1) !important; }
.border-primary\\/20 { border-color: rgba(0, 130, 179, 0.2) !important; }
.border-primary\\/40 { border-color: rgba(0, 130, 179, 0.4) !important; }
.fill-primary { fill: #0082b3 !important; }
.ring-primary { --tw-ring-color: #0082b3 !important; }
.focus\:ring-primary:focus { --tw-ring-color: #0082b3 !important; }
.group:hover .group-hover\:text-primary { color: #0082b3 !important; }
"""

with open('css/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove previous overrides if they exist
css = re.sub(r'/\* EXPLICIT THEME OVERRIDE - DARK SKY BLUE \*/.*', '', css, flags=re.DOTALL)
css += css_append

with open('css/index.css', 'w', encoding='utf-8') as f:
    f.write(css)

timestamp = str(int(time.time()))

for file in ['index.html', 'booking.html', 'terms.html', 'privacy.html']:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = re.sub(r'href="css/index\.css(\?v=\d+)?"', f'href="css/index.css?v={timestamp}"', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated cache buster in {file}")
    except FileNotFoundError:
        pass

print("Theme successfully overridden.")
