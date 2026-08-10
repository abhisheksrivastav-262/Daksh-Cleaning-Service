const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Empty Prices
html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">1 BHK Deep Cleaning<\/span>[\s\S]*?₹2,999/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">1 BHK Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹2,699');
html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">Empty Home Deep Cleaning<\/span>[\s\S]*?₹2,999/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">Empty Home Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹2,699');
html = html.replace(/<h3 class="text-xl font-bold text-foreground mb-2">1 BHK Deep Clean<\/h3>[\s\S]*?<span class="text-3xl font-bold text-primary">₹2,999<\/span>/, match => match.replace('₹2,999', '₹2,699'));

html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">2 BHK Deep Cleaning<\/span>[\s\S]*?₹3,999/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">2 BHK Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹3,499');
html = html.replace(/<h3 class="text-xl font-bold text-foreground mb-2">2 BHK Deep Clean<\/h3>[\s\S]*?<span class="text-3xl font-bold text-primary">₹3,999<\/span>/, match => match.replace('₹3,999', '₹3,499'));

html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">3 BHK Deep Cleaning<\/span>[\s\S]*?₹4,999/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">3 BHK Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹3,999');
html = html.replace(/<h3 class="text-xl font-bold text-foreground mb-2">3 BHK Deep Clean<\/h3>[\s\S]*?<span class="text-3xl font-bold text-primary">₹4,999<\/span>/, match => match.replace('₹4,999', '₹3,999'));

// 2. Furnished Prices
html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">1 BHK Furnished Home Deep Cleaning<\/span>[\s\S]*?₹4,000/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">1 BHK Furnished Home Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹3,499');
html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">Furnished Home Deep Cleaning<\/span>[\s\S]*?₹4,000/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">Furnished Home Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹3,499');
html = html.replace(/<h3 class="text-xl font-bold text-foreground mb-2">1 BHK Furnished Deep Clean<\/h3>[\s\S]*?<span class="text-3xl font-bold text-primary">₹4,000<\/span>/, match => match.replace('₹4,000', '₹3,499'));

html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">2 BHK Furnished Home Deep Cleaning<\/span>[\s\S]*?₹5,500/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">2 BHK Furnished Home Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹3,999');
html = html.replace(/<h3 class="text-xl font-bold text-foreground mb-2">2 BHK Furnished Deep Clean<\/h3>[\s\S]*?<span class="text-3xl font-bold text-primary">₹5,500<\/span>/, match => match.replace('₹5,500', '₹3,999'));

html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">3 BHK Furnished Home Deep Cleaning<\/span>[\s\S]*?₹7,000/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">3 BHK Furnished Home Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  ₹4,999');
html = html.replace(/<h3 class="text-xl font-bold text-foreground mb-2">3 BHK Furnished Deep Clean<\/h3>[\s\S]*?<span class="text-3xl font-bold text-primary">₹7,000<\/span>/, match => match.replace('₹7,000', '₹4,999'));

// 4. 4 BHK FURNISHED HOME DEEP CLEANING
html = html.replace(/<span class="text-sm font-medium text-foreground group-hover:text-primary">4 BHK Furnished Home Deep Cleaning<\/span>[\s\S]*?₹9,000/, 
  '<span class="text-sm font-medium text-foreground group-hover:text-primary">4 BHK Furnished Home Deep Cleaning</span>\n                <span class="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">\n                  Custom quote');

fs.writeFileSync('index.html', html);
