import re

with open('css/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix appearance
css = css.replace('-webkit-appearance:none', 'appearance:none;-webkit-appearance:none')
css = css.replace('-webkit-appearance:button', 'appearance:button;-webkit-appearance:button')
css = css.replace('-webkit-appearance:textfield', 'appearance:textfield;-webkit-appearance:textfield')

# Fix vertical-align with block
css = css.replace('display:block;vertical-align:middle', 'display:block')

# Fix line-clamp
css = re.sub(r'-webkit-line-clamp:(\d+)', r'line-clamp:\1;-webkit-line-clamp:\1', css)

with open('css/index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Warnings fixed.")
