const fs = require('fs');
const path = require('path');
const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/ESTí S/g, 'ESTÁS')
       .replace(/DECISIí“N/g, 'DECISIÓN')
       .replace(/MÍ‰TODO/g, 'MÉTODO')
       .replace(/Â¿/g, '¿')
       .replace(/CÍ“MO/g, 'CÓMO')
       .replace(/Reunií³n/g, 'Reunión')
       .replace(/DISEÍ±AMOS/g, 'DISEÑAMOS')
       .replace(/conversií³n/g, 'conversión')
       .replace(/í³/g, 'ó')
       .replace(/í­/g, 'í')
       .replace(/í©/g, 'é')
       .replace(/í±/g, 'ñ')
       .replace(/íº/g, 'ú')
       .replace(/Â¡/g, '¡');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed ' + f);
});
