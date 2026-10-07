import re
import glob

files = glob.glob('*.html') + glob.glob('*.js')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # We want to find any tag that contains 'tel:' or 'Call Now' and replace sky blue back to primary green.
    def revert_call(m):
        t = m.group(0)
        t = t.replace('bg-[#01b8fa]', 'bg-primary')
        t = t.replace('hover:bg-[#01a0db]', 'hover:bg-primary-dark')
        return t
        
    # Match any <a ...> that has href="tel:..."
    content = re.sub(r'<a\b[^>]*href=["\']tel:[^>]*>', revert_call, content)
    
    # Match any button or a with aria-label="Call Now"
    content = re.sub(r'<(?:a|button)\b[^>]*aria-label=["\']Call Now["\'][^>]*>', revert_call, content)
    
    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Reverted in {file}")

