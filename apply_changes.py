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
        t = re.sub(r'\bhover:bg-primary-dark\b', 'hover:bg-[#01a0db]', t)
        t = re.sub(r'\bbg-primary\b', 'bg-[#01b8fa]', t)
        return t
    
    content = re.sub(r'<(a|button)\b[^>]*\bbg-primary\b[^>]*>', btn_repl, content)
    
    # 3. Prices
    # Replace text-primary with text-[#01b8fa] ONLY in tags that immediately enclose the price or Custom quote
    # A price tag starts with <span ... text-primary ...> and ends with </span>
    # And contains ₹ or Custom quote inside.
    # In JS files, the text might be across newlines.
    
    def price_repl(m):
        full_match = m.group(0)
        return re.sub(r'\btext-primary\b', 'text-[#01b8fa]', full_match)
        
    # Match tags containing text-primary, then only whitespace/newlines, then ₹ or Custom quote
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>\s*(?:₹|Custom quote)', price_repl, content, flags=re.DOTALL)
    
    # Also handle index.html where it might be `>₹2,699</span>`
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>(?:[^<]*?)(?:₹|Custom quote)', price_repl, content, flags=re.DOTALL)

    # Wait, the last regex is still greedy and could match across multiple tags if we aren't careful.
    # Let's use a non-greedy catch up to the NEXT tag close `>`
    # Actually, we can just replace text-primary on the line that has ₹ or Custom quote.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
