import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const dropdown = isOpen ? (
    <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación móvil">
      <div
        className="absolute inset-0 bg-[#07080B]/88 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="sheen-card absolute top-5 right-5 left-5 sm:left-auto sm:w-72 bg-[var(--bg-surface)] p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
          <span className="font-display text-sm font-bold tracking-tight text-[var(--text-primary)]">
            INCEPTION<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
            className="w-11 h-11 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          {[
            { href: '#servicios', label: 'Servicios' },
            { href: '#proceso', label: 'Proceso' },
            { href: '#proyectos', label: 'Proyectos' },
            { href: '#alcance', label: 'Alcance' },
            { href: '#contacto', label: 'Contacto' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] flex items-center font-display text-base font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent('open-cal-modal'));
            }}
            className="btn-primary mt-4 w-full"
          >
            Agendar llamada
          </button>
        </nav>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú de navegación"
        aria-expanded={isOpen}
        className="md:hidden w-11 h-11 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {mounted && dropdown ? createPortal(dropdown, document.body) : null}
    </>
  );
}
