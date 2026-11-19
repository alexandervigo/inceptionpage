const fs = require('fs');
const path = require('path');
const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const map = {
  'í\\x81': 'Á', 'í\\x9c': 'Ó', 'í ': 'Á', 'í“': 'Ó', 'í³': 'ó', 'í\\xad': 'í', 'í­': 'í', 
  'Â¡': '¡', 'Â¿': '¿', 'í±': 'ñ', 'í©': 'é', 'íº': 'ú', 'í‰': 'É', 'í ': 'Í', 'MÍ‰TODO': 'MÉTODO'
};

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
       .replace(/í/g, 'í') // just in case
       .replace(/Â¡/g, '¡');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed ' + f);
});
