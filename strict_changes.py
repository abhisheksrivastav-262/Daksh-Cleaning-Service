import re
import glob

files = glob.glob('*.html') + glob.glob('*.js')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # 1. Prices to Sky Blue
    # In dropdowns (text-primary):
    def price_repl(m):
        t = m.group(0)
        return t.replace('text-primary', 'text-[#01b8fa]')
        
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>\s*(?:₹|Custom quote|Starts at)', price_repl, content, flags=re.DOTALL)
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>(?:[^<]*?)(?:₹|Custom quote|Starts at)', price_repl, content, flags=re.DOTALL)

    # In package cards (text-foreground text-3xl):
    def price_repl2(m):
        t = m.group(0)
        return t.replace('text-foreground', 'text-[#01b8fa]')
    content = re.sub(r'<span[^>]*\btext-3xl\b[^>]*\btext-foreground\b[^>]*>(?:[^<]*?)(?:₹|Custom quote|Starts at)', price_repl2, content, flags=re.DOTALL)
    
    # Also handle specific prices if they were missed
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹2,699', '<span class="text-3xl font-bold text-[#01b8fa]">₹2,699')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹3,499', '<span class="text-3xl font-bold text-[#01b8fa]">₹3,499')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹3,999', '<span class="text-3xl font-bold text-[#01b8fa]">₹3,999')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹4,999', '<span class="text-3xl font-bold text-[#01b8fa]">₹4,999')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹5,500', '<span class="text-3xl font-bold text-[#01b8fa]">₹5,500')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹7,000', '<span class="text-3xl font-bold text-[#01b8fa]">₹7,000')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹9,000', '<span class="text-3xl font-bold text-[#01b8fa]">₹9,000')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹199', '<span class="text-3xl font-bold text-[#01b8fa]">₹199')
    content = content.replace('<span class="text-3xl font-bold text-foreground">₹3,500', '<span class="text-3xl font-bold text-[#01b8fa]">₹3,500')
    content = content.replace('<span class="text-3xl font-bold text-foreground">Custom quote', '<span class="text-3xl font-bold text-[#01b8fa]">Custom quote')

    # 2. Tabs to Sky Blue
    if file == 'js/index.js':
        content = content.replace("otherBtn.classList.remove('bg-primary', 'text-white');", "otherBtn.classList.remove('bg-[#01b8fa]', 'text-white');")
        content = content.replace("btn.classList.add('bg-primary', 'text-white');", "btn.classList.add('bg-[#01b8fa]', 'text-white');")
        # Ensure that if it was already updated, it's correct
        
    if file == 'index.html':
        content = content.replace('bg-primary text-white transition-all shadow-sm" data-tab="all"', 'bg-[#01b8fa] text-white transition-all shadow-sm" data-tab="all"')

    # 3. Book Service buttons to Sky Blue
    # They should already have bg-[#01b8fa] from my script earlier. Just check.
    # What about the submit buttons?
    def btn_repl(m):
        t = m.group(0)
        t = re.sub(r'\bbg-primary\b', 'bg-[#01b8fa]', t)
        t = re.sub(r'\bhover:bg-primary-dark\b', 'hover:bg-[#01a0db]', t)
        return t
    
    # We will ONLY apply this to 'Book' or 'Submit' or 'Continue' buttons
    content = re.sub(r'<(?:a|button)\b[^>]*\bbg-primary\b[^>]*>(?:[^<]*?)(?:Book|Submit|Continue)', btn_repl, content, flags=re.DOTALL)
    
    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Applied strict changes to {file}")

