import React, { useRef, useEffect, useState } from 'react';

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const ContactSection = () => {
  const titleRef = useReveal();
  const formRef = useReveal(0.1);
  const infoRef = useReveal(0.1);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Replace this key with your own access key from https://web3forms.com/
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("Error sending message. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Email',
      value: 'm7mednsr999@gmail.com',
      href: 'mailto:m7mednsr999@gmail.com',
      color: '#4f8ef7',
    },
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+201062146490',
      href: 'https://wa.me/201062146490',
      color: '#25D366',
    },
  ];

  const socialLinks = [
    {
      id: 'github-link',
      href: 'https://github.com/M7mednsr',
      label: 'GitHub',
      color: '#f8f8ff',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      ),
    },
    {
      id: 'linkedin-link',
      href: 'https://www.linkedin.com/in/mohamed-nasr-7730a7296',
      label: 'LinkedIn',
      color: '#0077b5',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  const inputStyle = (name) => ({
    width: '100%',
    padding: '14px 18px',
    background: focused === name ? 'rgba(79,142,247,0.06)' : 'rgba(255,255,255,0.04)',
    border: focused === name
      ? '1px solid rgba(79,142,247,0.5)'
      : '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === name ? '0 0 20px rgba(79,142,247,0.1)' : 'none',
    resize: 'none',
  });

  return (
    <section
      id="contact"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary, #111114)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.3), transparent)',
      }} />

      {/* Gradient blob */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-badge">Contact</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            Let's Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Amazing</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}>
            Have a project in mind? I'd love to hear about it. Let's create something great together.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Form */}
          <div ref={formRef} className="reveal-left">
            <div className="glass" style={{
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid var(--border-color)',
            }}>
              {submitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 0',
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                  }}>Message Sent!</h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                  }}>Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                    style={{ marginTop: '24px' }}
                  >
                    <span>Send Another</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form">
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--text-primary)',
                    marginBottom: '28px',
                  }}>Send a Message</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '8px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}>Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('name')}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '8px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}>Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('email')}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '8px',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}>Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('message')}
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                      {!loading && (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}>Let's Connect</h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.7',
              }}>
                I'm currently open to freelance work, collaboration, and full-time opportunities. Don't hesitate to reach out!
              </p>
            </div>

            {/* Contact cards */}
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${info.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 25px ${info.color}15`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${info.color}15`,
                  border: `1px solid ${info.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: info.color,
                  flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}>{info.label}</div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif',
                  }}>{info.value}</div>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div>
              <p style={{
                fontSize: '0.8rem',
                fontWeight: '600',
                color: 'var(--text-muted)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>Follow Me</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {socialLinks.map(social => (
                  <a
                    key={social.id}
                    id={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${social.color}10`;
                      e.currentTarget.style.borderColor = `${social.color}40`;
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 8px 25px ${social.color}20`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--bg-card)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
