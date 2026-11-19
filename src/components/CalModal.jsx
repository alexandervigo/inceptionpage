import { useState, useEffect } from 'react';

export default function CalModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-cal-modal', handleOpen);
    return () => window.removeEventListener('open-cal-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Agendar llamada estratégica">
      <div
        className="absolute inset-0 bg-[#07080B]/88 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="sheen-card relative z-10 w-full max-w-4xl h-[90vh] max-h-[820px] bg-[var(--bg-surface)] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <span className="text-xs font-display uppercase font-medium tracking-[0.08em] text-[var(--text-primary)]">
              Agendar Llamada Estratégica
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="w-full flex-grow relative bg-[var(--bg-base)]">
          <iframe
            src="https://cal.com/inception-estudio/1?theme=dark"
            title="Agendar llamada con Inception Estudio"
            loading="lazy"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
