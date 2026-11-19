import { useState } from 'react';

const WHATSAPP_NUMBER = "5493872542403";
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    website: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildWhatsappUrl = () => {
    const text = [
      `Hola Inception Estudio. Soy ${formData.name}.`,
      `Teléfono: ${formData.phone}`,
      `Correo: ${formData.email}`,
      `Proyecto: ${formData.message}`
    ].join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.website) {
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Por favor completá los cuatro campos para enviar tu pedido.');
      setStatus('error');
      return;
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setErrorMsg('Falta configurar la conexión con el CRM. Podés escribirnos directo por WhatsApp.');
      setStatus('error');
      return;
    }

    setErrorMsg('');
    setStatus('submitting');

    try {
      const payload = {
        id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        source: 'estudioinception.com',
        status: 'nuevo',
      };

      const response = await fetch(`${SUPABASE_URL}/rest/v1/web_inquiries`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
    } catch {
      setErrorMsg('No pudimos registrar el pedido automáticamente. Podés enviarlo directo por WhatsApp.');
      setStatus('error');
    }
  };

  return (
    <>
      <div className="section-rule"></div>
      <section id="contacto" className="section-space relative">
        <div className="inception-container">
          <div className="max-w-2xl mb-14" data-reveal>
            <p className="type-caption mb-4">Contacto</p>
            <h2 className="type-h1 mb-4">
              Empecemos tu <span style={{ color: 'var(--accent)' }}>proyecto</span>.
            </h2>
            <p className="type-lead max-w-[52ch]">
              Dejanos tus datos para recibir tu pedido en nuestro equipo o agendá una llamada estratégica directa.
            </p>
          </div>

          <div className="sheen-card p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              {status === 'success' ? (
                <div className="py-6 space-y-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="type-h3 mb-2">¡Pedido recibido en nuestro Inbox!</h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-[46ch]">
                      Tu consulta ya quedó registrada para nuestro equipo. Si querés acelerar la respuesta, también podés escribirnos directo por WhatsApp:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={buildWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Continuar por WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ name: '', phone: '', email: '', message: '', website: '' });
                        setStatus('idle');
                      }}
                      className="btn-ghost"
                    >
                      Enviar otro pedido
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-display uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        Nombre
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre o empresa"
                        className="w-full min-h-[48px] px-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-display uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                        WhatsApp / Teléfono
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+54 9 ..."
                        className="w-full min-h-[48px] px-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-display uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                      Correo electrónico
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nombre@empresa.com"
                      className="w-full min-h-[48px] px-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-display uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                      Sobre el proyecto
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Contanos brevemente qué necesitás construir y en qué plazo."
                      className="w-full p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div role="alert" className="space-y-2">
                      <p className="text-sm text-[#F87171]">{errorMsg}</p>
                      <a
                        href={buildWhatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-display uppercase tracking-wider text-[var(--accent-cyan)] underline"
                      >
                        Enviar por WhatsApp ahora →
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Enviando pedido...' : 'Enviar pedido'}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10 space-y-8">
              <div>
                <p className="type-caption mb-3">Llamada 1:1</p>
                <h3 className="type-h3 mb-3">¿Preferís hablar hoy?</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  Reservá un espacio de 20 minutos para revisar tu caso y definir el camino más rápido.
                </p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-cal-modal'))}
                  className="btn-ghost w-full sm:w-auto"
                >
                  Agendar llamada
                </button>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3 text-sm">
                <p className="text-xs font-display uppercase tracking-wider text-[var(--text-muted)]">
                  Canales directos
                </p>
                <p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    +54 9 3872 54-2403
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:inceptionestudio@gmail.com"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    inceptionestudio@gmail.com
                  </a>
                </p>
                <p className="text-[var(--text-muted)]">
                  Argentina · BSAS, Salta, La Rioja
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
