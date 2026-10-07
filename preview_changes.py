import re
import glob

files = glob.glob('*.html') + glob.glob('*.js')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    # 1. Footer
    content = content.replace("© 2026 Daksh Cleaning Service. All Rights Reserved. Adapted from cleanzon.co.in clone.", "© 2026 Daksh Cleaning Service. All Rights Reserved.")
    
    # 2. Buttons
    def btn_repl(m):
        t = m.group(0)
        # only replace exact class matches to avoid replacing bg-primary/10
        t = re.sub(r'\bbg-primary\b', 'bg-[#01b8fa]', t)
        t = re.sub(r'\bhover:bg-primary-dark\b', 'hover:bg-[#01a0db]', t)
        return t
    
    content = re.sub(r'<(a|button)\b[^>]*\bbg-primary\b[^>]*>', btn_repl, content)
    
    # 3. Prices
    # In html and js, prices are often associated with text-primary.
    # Let's find any text-primary that is near a price symbol (₹) or 'Custom quote'
    # We will look for text-primary, then up to 100 characters, then ₹ or Custom quote.
    def price_repl(m):
        t = m.group(0)
        return re.sub(r'\btext-primary\b', 'text-[#01b8fa]', t)
        
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>(?:(?:(?!</(?:span|div|p)>).)*?(?:₹|Custom quote))', price_repl, content, flags=re.DOTALL)
    
    if orig != content:
        print(f"--- Changes in {file} ---")
        # naive diff
        orig_lines = orig.splitlines()
        new_lines = content.splitlines()
        for i, (o, n) in enumerate(zip(orig_lines, new_lines)):
            if o != n:
                print(f"Line {i+1}:")
                print(f"- {o}")
                print(f"+ {n}")
