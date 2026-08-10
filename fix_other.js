const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 3. What's Included
html = html.replace('<li>• Machine-scrubbing of tiled/marble floorings.</li>', '<li>• Floor Mopping: A shiny finish for all flooring and tiled areas.</li>');
html = html.replace('<li>• Deep scrubbing of the floor area.</li>', '<li>• Floor Mopping: A shiny finish for all flooring and tiled areas.</li>');

// 5. Header Call Button
const headerCallBtn = `        <a href="tel:+919137294815" class="inline-flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold shadow-sm transition-all duration-300">
          <svg class="h-4 w-4 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>\n`;
html = html.replace(headerCallBtn, '');

const floatingCallBtn = `    <a href="tel:+919137294815" class="fixed bottom-[5.5rem] right-6 z-50 bg-primary hover:bg-primary-dark text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] transform hover:scale-115 transition-all duration-300 flex items-center justify-center w-14 h-14" aria-label="Call Now">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>\n`;

html = html.replace(/(<a href="https:\/\/wa.me\/919137294815)/, floatingCallBtn + '$1');

// 6. Hero Section Text
const heroTags = `              <div class="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                <span class="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm border border-primary/20">All Over Mumbai Service Available</span>
                <span class="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm border border-primary/20">Same-Day Service Available</span>
              </div>\n`;
html = html.replace(/(<h1 class="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">)/, heroTags + '$1');
html = html.replace("Kalyan East's Trusted Cleaning Experts!", "Mumbai's Trusted Cleaning Experts!");

// 7. Youtube Video
const youtubeRegex = /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/o59plN25t6I[^>]*><\/iframe>/;
html = html.replace(youtubeRegex, '<img src="assets/before-after.png" alt="Daksh Cleaning Before After Results" class="w-full h-full object-cover" />');

fs.writeFileSync('index.html', html);
