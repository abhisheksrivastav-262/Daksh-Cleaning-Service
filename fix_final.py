import re
import glob

# 1. Prices to Sky Blue
files = glob.glob('*.html') + glob.glob('*.js')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # Prices regex: match any tag that has text-primary and contains ₹ or Custom quote immediately
    # We replaced text-[#01b8fa] with text-primary earlier. Now we need to change it back ONLY for prices.
    def price_repl(m):
        t = m.group(0)
        return t.replace('text-primary', 'text-[#01b8fa]')
        
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>\s*(?:₹|Custom quote)', price_repl, content, flags=re.DOTALL)
    # Also handle index.html where it might be `>₹2,699</span>`
    content = re.sub(r'<[^>]*\btext-primary\b[^>]*>(?:[^<]*?)(?:₹|Custom quote)', price_repl, content, flags=re.DOTALL)

    # 2. Tabs in JS
    if file == 'js/index.js':
        content = content.replace("otherBtn.classList.remove('bg-primary', 'text-white');", "otherBtn.classList.remove('bg-[#01b8fa]', 'text-white');")
        content = content.replace("btn.classList.add('bg-primary', 'text-white');", "btn.classList.add('bg-[#01b8fa]', 'text-white');")
        
    # Let's ensure tabs in index.html are correct
    if file == 'index.html':
        content = content.replace('bg-primary text-white transition-all shadow-sm" data-tab="all"', 'bg-[#01b8fa] text-white transition-all shadow-sm" data-tab="all"')

    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Applied changes to {file}")

