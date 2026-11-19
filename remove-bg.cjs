const fs = require('fs');
const path = require('path');
const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/className="([^"]*)bg-bg([^"]*)"/g, (match, p1, p2) => {
    // Only remove bg-bg if it's the section/footer background, not the cards. 
    // Actually, maybe I should just replace 'bg-bg' with 'bg-transparent' for the main section, but cards can keep 'bg-bg' or 'bg-bg/50'.
    return className="bg-transparent";
  });
  
  // Wait, the cards in ProjectsPreview use bg-bg to hide the video edges. 
  // Maybe I should only change 'bg-bg' on <section> tags.
});
