const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The floating button text
const floatingBtn = `    <a href="tel:+919137294815" class="fixed bottom-[5.5rem] right-6 z-50 bg-primary hover:bg-primary-dark text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] transform hover:scale-115 transition-all duration-300 flex items-center justify-center w-14 h-14" aria-label="Call Now">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>\n`;

// 1. Remove the floating button from the bottom
html = html.replace(floatingBtn, '');

// 2. Insert it next to the before-after image
const heroImageHtml = `                <div class="w-full lg:w-11/12 rounded-2xl overflow-hidden shadow-lg mb-4 aspect-video bg-muted border border-primary/20">
                  <img src="assets/before-after.png" alt="Daksh Cleaning Before After Results" class="w-full h-full object-cover" />
                </div>`;

const newHeroHtml = `                <div class="flex items-center gap-3 md:gap-4 mb-4">
                  <div class="flex-1 rounded-2xl overflow-hidden shadow-lg aspect-video bg-muted border border-primary/20">
                    <img src="assets/before-after.png" alt="Daksh Cleaning Before After Results" class="w-full h-full object-cover" />
                  </div>
                  <a href="tel:+919137294815" class="shrink-0 bg-primary hover:bg-primary-dark text-white p-3.5 rounded-full shadow-strong transform hover:scale-110 transition-all duration-300 flex items-center justify-center w-12 h-12 md:w-14 md:h-14" aria-label="Call Now">
                    <svg class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>`;

html = html.replace(heroImageHtml, newHeroHtml);

fs.writeFileSync('index.html', html);
