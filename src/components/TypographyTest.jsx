export default function TypographyTest() {
  return (
    <section className="w-full py-24 px-6 bg-bg border-t border-white/5 z-20 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm text-primary tracking-[0.1em] uppercase font-bold mb-4">TEST DE LABORATORIO</p>
          <h2 className="text-3xl font-bold tracking-tighter">OPCIONES TIPOGRíFICAS</h2>
          <p className="text-white/50 mt-4 text-sm max-w-lg mx-auto">
            Aquí probamos las 3 familias seleccionadas. Elige la que mejor transmita la identidad de Inception.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          
          {/* Opción 1: Space Grotesk */}
          <div className="p-8 border border-white/10 bg-white/5 rounded-lg text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-xs md:text-sm text-primary tracking-[0.1em] uppercase font-bold block mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full">Opción 1: Space Grotesk (Tech / Moderna)</span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">TU NEGOCIO ONLINE.</h3>
            <p className="text-white/60 font-light max-w-md mx-auto">
              Landing pages simples que generan clientes y automatizan reservas. Muy geométrica y tecnológica.
            </p>
          </div>

          {/* Opción 2: Chakra Petch */}
          <div className="p-8 border border-white/10 bg-white/5 rounded-lg text-center" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <span className="text-xs md:text-sm text-primary tracking-[0.1em] uppercase font-bold block mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full">Opción 2: Chakra Petch (Cyberpunk / Ingeniería)</span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">Tu negocio online.</h3>
            <p className="text-white/60 font-medium max-w-md mx-auto text-sm">
              Landing pages simples que generan clientes y automatizan reservas. Cortes angulares y un estilo profundamente digital.
            </p>
          </div>

          {/* Opción 3: Oswald */}
          <div className="p-8 border border-white/10 bg-white/5 rounded-lg text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <span className="text-xs md:text-sm text-primary tracking-[0.1em] uppercase font-bold block mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full">Opción 3: Oswald (Editorial / Impacto)</span>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 uppercase">Tu negocio online.</h3>
            <p className="text-white/60 font-normal max-w-md mx-auto text-lg">
              Landing pages simples que generan clientes y automatizan reservas. Muy vertical, densa y contundente, excelente para titulares grandes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
