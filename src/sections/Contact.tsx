import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/BrandIcons';
import confetti from 'canvas-confetti';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const contactDetails = {
    email: 'hariprasathd26112006@gmail.com',
    phone: '+91 9790851329',
    whatsapp: 'https://wa.me/919790851329?text=Hi%20Hari,%20I%27d%20love%20to%20discuss%20a%20project!',
    linkedin: 'https://linkedin.com/in/hariprasath2611',
    github: 'https://github.com/Hariprasath2611',
    instagram: 'https://www.instagram.com/_.dazzling_._master._/?hl=en',
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactDetails.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _subject: `Portfolio Contact: ${form.subject}`
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        
        // Fire confetti burst!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#9d4edd', '#06b6d4', '#d946ef'],
        });

        // Reset Form
        setForm({ name: '', email: '', subject: '', message: '' });
        alert('Message sent successfully! If this is your first time using this form, please check your inbox (including spam) to click the FormSubmit activation link.');
      } else {
        throw new Error('Failed to send message via FormSubmit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      alert('Oops! There was an issue sending your message. Please try again or reach out directly to ' + contactDetails.email);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-100/30 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white mb-4">
            &gt; CONTACT_ME
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-stretch">
          
          {/* Left: Info Cards & Social Matrix */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-orbitron font-bold text-slate-800 dark:text-white text-xl mb-2">
              ESTABLISH CONNECTION
            </h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-4">
              Feel free to reach out for project collaboration, job opportunities, or simple developer chats. Choose a transmission channel below.
            </p>

            {/* Email Copier Card */}
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-slate-200/50 dark:border-cyan-500/5 hover:border-cyan-500/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</div>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-white">{contactDetails.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(contactDetails.email, 'email')}
                className="p-2 rounded-lg border border-slate-200 dark:border-cyan-500/10 hover:border-cyan-400 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors"
                title="Copy Email"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Copier Card */}
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border border-slate-200/50 dark:border-cyan-500/5 hover:border-cyan-500/10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-purple-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phone Number</div>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-white">{contactDetails.phone}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(contactDetails.phone, 'phone')}
                className="p-2 rounded-lg border border-slate-200 dark:border-cyan-500/10 hover:border-cyan-400 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors"
                title="Copy Phone"
              >
                {copiedType === 'phone' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp Quick Button */}
            <a
              href={contactDetails.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 text-green-400 font-mono text-center font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              <span>LAUNCH QUICK WHATSAPP TRANSMISSION</span>
            </a>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 text-center transition-all duration-300"
              >
                <LinkedinIcon className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase">LinkedIn</span>
              </a>

              <a
                href={contactDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 text-center transition-all duration-300"
              >
                <GithubIcon className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase">GitHub</span>
              </a>

              <a
                href={contactDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 text-center transition-all duration-300"
              >
                <InstagramIcon className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase">Instagram</span>
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-200/50 dark:border-cyan-500/5 h-full flex flex-col justify-between"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full justify-between">
                <div>
                  <h3 className="font-orbitron font-bold text-slate-800 dark:text-white text-xl mb-6">
                    TRANSMIT SECURE MESSAGE
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/40 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-cyan-500/10 focus:border-cyan-400 focus:ring-cyan-400'
                        }`}
                        placeholder="Hari Prasath D"
                      />
                      {errors.name && <span className="text-[10px] font-mono text-red-500">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Email Address
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/40 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-cyan-500/10 focus:border-cyan-400 focus:ring-cyan-400'
                        }`}
                        placeholder="hariprasathd26112006@gmail.com"
                      />
                      {errors.email && <span className="text-[10px] font-mono text-red-500">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                      Transmission Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/40 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-cyan-500/10 focus:border-cyan-400 focus:ring-cyan-400'
                      }`}
                      placeholder="Project details..."
                    />
                    {errors.subject && <span className="text-[10px] font-mono text-red-500">{errors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                      Secure Payload Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/40 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all resize-none ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-cyan-500/10 focus:border-cyan-400 focus:ring-cyan-400'
                      }`}
                      placeholder="Write your message payload here..."
                    />
                    {errors.message && <span className="text-[10px] font-mono text-red-500">{errors.message}</span>}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono font-bold tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">TRANSMITTING SECURE DATA...</span>
                  ) : (
                    <>
                      <span>TRANSMIT PAYLOAD MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
