import { useEffect, useRef, useState } from 'react';

const projectsData = [
  {
    title: "SIS Mobiliario",
    category: "Catálogos",
    tag: "Catálogo Digital B2B",
    desc: "Catálogo digital enfocado en diseño, materialidad y captación de presupuestos corporativos.",
    image: "/media/projects/WebSIS.webp",
    miniVideo: "/media/projects/SISMini.mp4",
    context: "Empresa de mobiliario que necesitaba modernizar su presencia online y exhibir proyectos de alta gama.",
    challenge: "Organizar un catálogo extenso sin perder sobriedad visual y facilitar la solicitud de presupuestos.",
    solution: "Catálogo dinámico con filtros interactivos y derivación directa a leads B2B.",
    link: "https://sismobiliario.com"
  },
  {
    title: "Pedidos de Comida",
    category: "Sistemas",
    tag: "Plataforma & Delivery",
    desc: "Sistema integral de viandas con impresión de remitos, cobros semanales y operación ágil en móvil.",
    image: "/media/projects/PedidosComida.webp",
    miniVideo: "/media/projects/PedidosComida.mp4",
    context: "Plataforma gastronómica diseñada para automatizar pedidos de viandas, liquidaciones y control de entregas.",
    challenge: "Simplificar el pedido semanal del cliente y agilizar remitos y cobranzas desde el celular.",
    solution: "Web app mobile-first con carga de menús, módulo de cobranzas semanales e impresión directa de remitos.",
    link: ""
  },
  {
    title: "Estudio Jurídico",
    category: "Webs & Landing",
    tag: "Sitio Corporativo",
    desc: "Presencia digital sobria y canal de consulta ágil para firma legal.",
    image: "/media/projects/EstudioJuridico.webp",
    miniVideo: "/media/projects/EstudioJuridico.mp4",
    context: "Firma jurídica enfocada en modernizar el acceso a sus servicios y transmitir solidez y confidencialidad.",
    challenge: "Estructurar áreas de práctica de forma clara y habilitar consultas directas sin fricción.",
    solution: "Diseño institucional sobrio con jerarquía tipográfica y derivación directa de consultas.",
    link: ""
  },
  {
    title: "Gestión de Inventario",
    category: "Sistemas",
    tag: "Sistema Web",
    desc: "Plataforma de ventas y control de stock sincronizado con roles diferenciados.",
    image: "/media/projects/WebGestion.webp",
    miniVideo: "",
    context: "Sistema integral para control y optimización de inventarios en operación diaria.",
    challenge: "Unificar accesos centralizados con roles diferenciados para vendedores y propietarios.",
    solution: "Panel interactivo para registrar ventas, dar alta de productos, generar tickets y sincronizar stock.",
    link: ""
  },
  {
    title: "Plan48HS",
    category: "Webs & Landing",
    tag: "Landing de Conversión",
    desc: "Landing page enfocada en productividad, foco mental y registro directo.",
    image: "/media/projects/WebPlan48.webp",
    miniVideo: "/media/parallax/3.mp4",
    context: "Plataforma de formación intensiva enfocada en organización y hábitos de estudio.",
    challenge: "Transmitir urgencia y valor manteniendo una estética limpia orientada al registro.",
    solution: "Diseño de alto contraste con funnel de registro optimizado para reducir fricción.",
    link: ""
  },
  {
    title: "Alexander Vigo",
    category: "Webs & Landing",
    tag: "Portfolio Creativo",
    desc: "Muestra visual de trabajos, experiencia y trayectoria de un creativo.",
    image: "",
    miniVideo: "/media/projects/WebAlexanderMINI.mp4",
    context: "Digitalización de trayectoria profesional en un portfolio minimalista.",
    challenge: "Crear una experiencia visual donde cada pieza destaque sin sobrecarga de texto.",
    solution: "Galería interactiva limpia y rápida con navegación directa a cada caso.",
    link: "https://alexandervigo.com"
  },
  {
    title: "Unlimited Dreams",
    category: "Webs & Landing",
    tag: "Comunidad & Agencia",
    desc: "Experiencia inmersiva y moderna diseñada para agencia creativa y comunidad.",
    image: "",
    miniVideo: "/media/projects/UnlimitedMini.mp4",
    context: "Agencia creativa que buscaba una identidad digital dinámica y diferenciada.",
    challenge: "Equilibrar impacto visual con navegación clara hacia sus servicios.",
    solution: "Arquitectura interactiva con foco en ritmo visual y carga optimizada.",
    link: ""
  },
  {
    title: "Experiencia Formula 1",
    category: "Webs & Landing",
    tag: "Experiencia Web",
    desc: "Plataforma de alta velocidad inspirada en la máxima categoría del automovilismo.",
    image: "/media/projects/WebF1.webp",
    miniVideo: "",
    context: "Concepto web interactivo centrado en telemetría visual, ritmo y velocidad de carga.",
    challenge: "Lograr transiciones fluidas y gran impacto visual manteniendo respuesta instantánea.",
    solution: "Arquitectura front-end optimizada con jerarquía tipográfica marcada y microinteracciones precisas.",
    link: ""
  }
];

const categories = ["Todos", "Webs & Landing", "Sistemas", "Catálogos"];

/** Reproduce el video solo cuando la tarjeta es visible en pantalla para evitar lag de decodificación */
function LazyViewportVideo({ src, poster, label }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster || undefined}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    />
  );
}

function ProjectCard({ project, onOpen, isCarousel }) {
  return (
    <article
      className={`${
        isCarousel ? 'w-[300px] sm:w-[360px] shrink-0' : 'w-full sm:w-[350px] lg:w-[370px]'
      } rounded-2xl overflow-hidden flex flex-col group border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-[#38BDF8] hover:border-[#7DD3FC] hover:shadow-[0_20px_44px_-12px_rgba(56,189,248,0.45)]`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="text-left flex flex-col flex-1 cursor-pointer focus-visible:outline-none"
        aria-label={`Ver detalles de ${project.title}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-elevated)]">
          {project.miniVideo ? (
            <LazyViewportVideo
              src={project.miniVideo}
              poster={project.image}
              label={`Vista previa en video de ${project.title}`}
            />
          ) : (
            <img
              src={project.image}
              alt={`Vista previa del proyecto ${project.title}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#030712]/65 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-20"
          />
        </div>

        {/* Cambio completo de color a celeste (#38BDF8) con texto oscuro de alto contraste WCAG AAA */}
        <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-colors duration-300 group-hover:border-t-[#030712]/15 group-hover:bg-[#38BDF8]">
          <div>
            <span className="type-caption block mb-2.5 transition-colors duration-300 group-hover:!text-[#030712] group-hover:font-bold">
              {project.tag}
            </span>
            <h3 className="type-h3 mb-2 transition-colors duration-300 group-hover:text-[#030712]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-300 group-hover:text-[#0F172A]">
              {project.desc}
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[#030712]">
            Explorar caso
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </button>
    </article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  const isCarousel = activeCategory === "Todos";
  const filtered = isCarousel
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const marqueeItems = [...filtered, ...filtered];

  const trackRef = useRef(null);
  const stateRef = useRef({
    offset: 0,
    isHovered: false,
    isDragging: false,
    startX: 0,
    startOffset: 0,
    dragDistance: 0,
    halfWidth: 0,
  });

  // Medir mitad del track solo en modo carrusel ("Todos")
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isCarousel) return;

    const measure = () => {
      stateRef.current.halfWidth = track.scrollWidth / 2;
      stateRef.current.offset = 0;
      track.style.transform = 'translate3d(0px, 0, 0)';
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [isCarousel]);

  // Loop único rAF GPU-composited + soporte de arrastre solo cuando isCarousel === true
  useEffect(() => {
    if (!isCarousel) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 48);
      lastTime = now;

      const s = stateRef.current;
      const track = trackRef.current;

      if (track && s.halfWidth > 0 && !s.isDragging && !s.isHovered && !prefersReducedMotion) {
        s.offset -= dt * 0.048;
        if (s.offset <= -s.halfWidth) s.offset += s.halfWidth;
        if (s.offset > 0) s.offset -= s.halfWidth;
        track.style.transform = `translate3d(${s.offset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isCarousel]);

  const handlePointerDown = (e) => {
    const s = stateRef.current;
    s.isDragging = true;
    s.startX = e.clientX;
    s.startOffset = s.offset;
    s.dragDistance = 0;
  };

  const handlePointerMove = (e) => {
    const s = stateRef.current;
    const track = trackRef.current;
    if (!s.isDragging || !track || s.halfWidth <= 0) return;

    const dx = e.clientX - s.startX;
    s.dragDistance = Math.abs(dx);
    let next = s.startOffset + dx;

    while (next <= -s.halfWidth) next += s.halfWidth;
    while (next > 0) next -= s.halfWidth;

    s.offset = next;
    track.style.transform = `translate3d(${next}px, 0, 0)`;
  };

  const handlePointerUp = () => {
    stateRef.current.isDragging = false;
  };

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <div className="section-rule"></div>
      <section id="proyectos" className="section-space relative overflow-hidden">
        <div className="inception-container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="shrink-0">
              <p className="type-caption mb-4">
                {isCarousel ? 'Casos seleccionados · Arrastrá para explorar' : `Casos seleccionados · ${activeCategory}`}
              </p>
              <h2 className="type-h1">
                Todos nuestros <span style={{ color: 'var(--accent)' }}>proyectos</span>.
              </h2>
            </div>

            {/* Categorías siempre en un solo renglón en desktop/tablet */}
            <div
              className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0"
              role="tablist"
              aria-label="Filtrar proyectos por categoría"
            >
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-display font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                      active
                        ? 'bg-[var(--accent)] text-[#FEFFFA]'
                        : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {isCarousel ? (
          /* Carrusel continuo arrastrable con extremos difuminados (solo en "Todos") */
          <div className="relative w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent"
            />

            <div
              className="overflow-hidden py-4 select-none cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'pan-y' }}
              onMouseEnter={() => { stateRef.current.isHovered = true; }}
              onMouseLeave={() => {
                stateRef.current.isHovered = false;
                stateRef.current.isDragging = false;
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                ref={trackRef}
                className="flex gap-6 w-max will-change-transform"
              >
                {marqueeItems.map((project, idx) => (
                  <ProjectCard
                    key={`${project.title}-${idx}`}
                    project={project}
                    isCarousel={true}
                    onOpen={() => {
                      if (stateRef.current.dragDistance < 6) {
                        setSelectedProject(project);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Vista estática y centrada proporcionalmente cuando se elige una categoría */
          <div className="inception-container py-4">
            <div className="flex flex-wrap justify-center gap-6">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  isCarousel={false}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle de ${selectedProject.title}`}
        >
          <div
            className="absolute inset-0 bg-[#030712]/88 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />

          <div className="sheen-card relative z-10 w-full max-w-3xl overflow-hidden bg-[var(--bg-surface)]">
            <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="type-caption block mb-2">{selectedProject.tag}</span>
                  <h3 className="type-h2">{selectedProject.title}</h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Cerrar detalle del proyecto"
                  className="w-11 h-11 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)] mb-8">
                {selectedProject.miniVideo ? (
                  <video
                    src={selectedProject.miniVideo}
                    poster={selectedProject.image || undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={`Vista ampliada de ${selectedProject.title}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[var(--text-muted)] mb-2">Contexto</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.context}</p>
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[var(--text-muted)] mb-2">Desafío</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-display uppercase tracking-wider text-[var(--text-muted)] mb-2">Solución</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedProject.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    window.dispatchEvent(new CustomEvent('open-cal-modal'));
                  }}
                  className="btn-primary"
                >
                  Quiero algo similar
                </button>

                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Visitar sitio en vivo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
