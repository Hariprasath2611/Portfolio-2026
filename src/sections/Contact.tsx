import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/BrandIcons';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  opportunityType: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    opportunityType: 'Internship',
  });

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactDetails = {
    email: 'hariprasathd26112006@gmail.com',
    phone: '+91 9790851329',
    location: 'Chennai, Tamil Nadu, India',
    linkedin: 'https://linkedin.com/in/hariprasath-d-b19068379',
    github: 'https://github.com/Hariprasath2611',
    instagram: 'https://www.instagram.com/_.dazzling_._master._/?hl=en',
  };

  const opportunities = ['Internship', 'Freelance', 'Full-time'];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactDetails.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          opportunityType: form.opportunityType,
          subject: form.subject || `Inquiry: ${form.opportunityType}`,
          message: form.message,
          _subject: `Portfolio Contact [${form.opportunityType}]: ${form.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setForm({ name: '', email: '', subject: '', message: '', opportunityType: 'Internship' });

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD84D', '#FF8A5B', '#D9CCFF', '#12110F'],
          });
        } catch {
          console.log('Confetti effect executed');
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Contact submission error', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#FFD84D] border-t-2 border-[#12110F] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
            07 / CONTACT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#12110F]">
            Let us build <span className="font-serif-italic font-normal">something good.</span>
          </h2>
          <p className="text-[#12110F]/80 font-sans mt-3 text-sm sm:text-base max-w-xl">
            Have an open role, hackathon collaboration, or client build? Pick your project type or send me a note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Availability Selection Chips */}
            <div className="neo-card bg-white p-5 sm:p-6">
              <span className="font-mono text-xs font-extrabold uppercase text-[#12110F]/60 block mb-3">
                Select Opportunity Type:
              </span>
              <div className="flex flex-wrap gap-2">
                {opportunities.map((opp) => (
                  <button
                    key={opp}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, opportunityType: opp }))}
                    className={`min-h-[44px] px-4 py-2 rounded-xl font-mono text-xs font-bold border-2 border-[#12110F] transition-all cursor-pointer ${
                      form.opportunityType === opp
                        ? 'bg-[#12110F] text-white shadow-[2px_2px_0px_#12110F]'
                        : 'bg-[#F4F1EA] text-[#12110F] hover:bg-[#FFE585]'
                    }`}
                    data-cursor="pointer"
                  >
                    [{opp}]
                  </button>
                ))}
              </div>
            </div>

            {/* Email Card with Copy */}
            <div className="neo-card bg-white p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#D9CCFF] border-2 border-[#12110F] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#12110F]" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#12110F]/60">Email</div>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="font-mono text-xs sm:text-sm font-bold text-[#12110F] truncate block hover:underline"
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(contactDetails.email, 'email')}
                className="w-11 h-11 rounded-lg border-2 border-[#12110F] bg-[#F4F1EA] hover:bg-[#FFD84D] transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                aria-label="Copy Email address"
                data-cursor="pointer"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4 text-[#12110F]" />}
              </button>
            </div>

            {/* Phone Card with Copy */}
            <div className="neo-card bg-white p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#BDF3D4] border-2 border-[#12110F] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#12110F]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase text-[#12110F]/60">Phone / WhatsApp</div>
                  <a
                    href={`tel:${contactDetails.phone}`}
                    className="font-mono text-xs sm:text-sm font-bold text-[#12110F] hover:underline"
                  >
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(contactDetails.phone, 'phone')}
                className="w-11 h-11 rounded-lg border-2 border-[#12110F] bg-[#F4F1EA] hover:bg-[#FFD84D] transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                aria-label="Copy Phone number"
                data-cursor="pointer"
              >
                {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4 text-[#12110F]" />}
              </button>
            </div>

            {/* Quick WhatsApp Message Button */}
            <a
              href={`https://wa.me/919790851329?text=${encodeURIComponent(
                `Hi Hariprasath, I am reaching out regarding a ${form.opportunityType} opportunity from your portfolio.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn min-h-[52px] p-4 rounded-2xl bg-[#25D366] text-[#12110F] font-display font-extrabold text-sm sm:text-base flex items-center justify-between gap-3 hover:bg-[#20bd5a] transition-all cursor-pointer shadow-[4px_4px_0px_#12110F] group"
              data-cursor="pointer"
              aria-label="Quick WhatsApp Message"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#12110F] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#12110F]">
                  <WhatsappIcon className="w-5 h-5 text-[#25D366]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-display font-extrabold text-[#12110F] leading-tight">
                    Quick WhatsApp Message
                  </div>
                  <div className="text-[11px] font-mono font-medium text-[#12110F]/80">
                    Direct chat • +91 9790851329
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white border-2 border-[#12110F] flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shadow-[2px_2px_0px_#12110F]">
                <ArrowUpRight className="w-4 h-4 text-[#12110F]" />
              </div>
            </a>

            {/* Location Card */}
            <div className="neo-card bg-white p-4 sm:p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD0BC] border-2 border-[#12110F] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#12110F]" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-[#12110F]/60">Location</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#12110F]">
                  {contactDetails.location}
                </div>
              </div>
            </div>

            {/* Social Pills */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-2">
              <a
                href={contactDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-white text-[#12110F] flex items-center justify-center gap-2 font-mono text-xs font-bold hover:bg-[#D9CCFF]"
                data-cursor="pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-white text-[#12110F] flex items-center justify-center gap-2 font-mono text-xs font-bold hover:bg-[#BBDDFF]"
                data-cursor="pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={contactDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn min-w-[44px] min-h-[44px] py-2.5 px-3.5 rounded-xl bg-white text-[#12110F] flex items-center justify-center font-mono text-xs font-bold hover:bg-[#FFD0BC]"
                data-cursor="pointer"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              className="neo-card bg-white p-5 sm:p-8 flex flex-col gap-4 sm:gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs font-bold uppercase text-[#12110F] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="D Hariprasath"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F1EA] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] font-sans text-base text-[#12110F] placeholder-[#12110F]/40 focus:outline-none focus:bg-white min-h-[48px]"
                    data-cursor="text"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-mono text-xs font-bold uppercase text-[#12110F] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    required
                    autoComplete="email"
                    placeholder="hariprasathd26112006@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F1EA] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] font-sans text-base text-[#12110F] placeholder-[#12110F]/40 focus:outline-none focus:bg-white min-h-[48px]"
                    data-cursor="text"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block font-mono text-xs font-bold uppercase text-[#12110F] mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  autoComplete="off"
                  placeholder={`Discussing ${form.opportunityType} opportunity`}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F1EA] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] font-sans text-base text-[#12110F] placeholder-[#12110F]/40 focus:outline-none focus:bg-white min-h-[48px]"
                  data-cursor="text"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs font-bold uppercase text-[#12110F] mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your team, tech stack, and goals..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F1EA] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] font-sans text-base text-[#12110F] placeholder-[#12110F]/40 focus:outline-none focus:bg-white resize-none"
                  data-cursor="text"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#BDF3D4] border-2 border-[#12110F] font-mono text-xs font-bold text-[#12110F] flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Message delivered! I will reply within 24 hours.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-red-100 border-2 border-red-700 font-mono text-xs font-bold text-red-700">
                  Submission failed. Please email me directly at {contactDetails.email}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="neo-btn w-full min-h-[52px] py-3.5 sm:py-4 rounded-xl bg-[#12110F] text-white hover:bg-[#FF8A5B] hover:text-[#12110F] font-display font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                data-cursor="pointer"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message Directly</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="h-[2px] bg-[#12110F]/15 flex-1" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-[#12110F]/60">or connect directly</span>
                <div className="h-[2px] bg-[#12110F]/15 flex-1" />
              </div>

              <a
                href={`https://wa.me/919790851329?text=${encodeURIComponent(
                  form.message 
                    ? `Hi Hariprasath, my name is ${form.name || 'a visitor'}. Regarding: ${form.subject || form.opportunityType}. ${form.message}` 
                    : `Hi Hariprasath, I am reaching out regarding a ${form.opportunityType} opportunity from your portfolio.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-full min-h-[48px] py-3 rounded-xl bg-[#25D366] text-[#12110F] font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:bg-[#20bd5a] transition-all cursor-pointer shadow-[3px_3px_0px_#12110F]"
                data-cursor="pointer"
              >
                <WhatsappIcon className="w-4 h-4 text-[#12110F] shrink-0" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 text-[#12110F]" />
              </a>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
