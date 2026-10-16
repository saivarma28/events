import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight, CheckCircle2, CalendarDays, Clock3, Users, Sparkles, Heart, Sun, Cake, Gem, Flower2, PartyPopper, Baby, House, Briefcase, CalendarHeart } from 'lucide-react'

const eventTypes = [
  { name: 'Wedding', icon: Heart, note: 'A day that feels like you' },
  { name: 'Haldi Ceremony', icon: Sun, note: 'Colorful traditions, beautifully styled' },
  { name: 'Birthday Party', icon: Cake, note: 'A celebration for every age' },
  { name: 'Engagement', icon: Gem, note: 'The beginning of forever' },
  { name: 'Mehendi', icon: Flower2, note: 'Color, music and joy' },
  { name: 'Reception', icon: Sparkles, note: 'An evening to remember' },
  { name: 'Baby Shower', icon: Baby, note: 'A sweet new chapter' },
  { name: 'Anniversary', icon: PartyPopper, note: 'Celebrate your story' },
  { name: 'Housewarming', icon: House, note: 'Make a new place feel like home' },
  { name: 'Corporate Event', icon: Briefcase, note: 'Bring people together' },
  { name: 'Naming Ceremony', icon: Users, note: 'A meaningful family gathering' },
  { name: 'Other Function', icon: CalendarHeart, note: 'Tell us what you have in mind' },
]

const servicesByEvent = {
  Wedding: ['Wedding stage / mandap', 'Floral decoration', 'Lighting & ambience', 'Catering', 'Photography & videography', 'DJ & entertainment', 'Bride / groom entry', 'Guest transport', 'Venue assistance', 'Complete event management'],
  'Haldi Ceremony': ['Haldi seating & backdrop', 'Marigold / floral decor', 'Traditional props', 'Photography & videography', 'Music / DJ', 'Catering & refreshments', 'Welcome signage', 'Complete event management'],
  'Birthday Party': ['Theme decoration', 'Balloon arch & backdrop', 'Cake table setup', 'Cake & dessert coordination', 'Photography', 'DJ / games / entertainment', 'Return gifts', 'Catering'],
  Engagement: ['Stage & ring ceremony decor', 'Floral arrangements', 'Lighting', 'Photography & videography', 'Catering', 'Music / entertainment', 'Guest seating', 'Complete event management'],
  Mehendi: ['Mehendi seating setup', 'Floral / colorful decor', 'Traditional props', 'Music & entertainment', 'Photography', 'Catering'],
  Reception: ['Reception stage', 'Floral decor & lighting', 'Guest seating', 'Catering', 'Photography & videography', 'Music / DJ', 'Guest welcome'],
  'Baby Shower': ['Themed backdrop', 'Balloon / floral decor', 'Photo corner', 'Catering', 'Photography', 'Games & favors'],
  Anniversary: ['Theme decor', 'Stage / backdrop', 'Photography', 'Cake table', 'Catering', 'Music'],
  Housewarming: ['Entrance decor', 'Floral arrangements', 'Traditional setup', 'Catering', 'Photography'],
  'Corporate Event': ['Stage & branding backdrop', 'Audio / visual setup', 'Guest registration', 'Catering', 'Photography / videography', 'Seating & venue coordination'],
  'Naming Ceremony': ['Traditional stage decor', 'Floral arrangements', 'Seating setup', 'Catering', 'Photography'],
  'Other Function': ['Decoration & styling', 'Venue assistance', 'Catering', 'Photography & videography', 'Music / entertainment', 'Complete event management'],
}

const timeSlots = [
  { value: 'Morning', time: '6 AM – 11 AM', label: 'Morning', icon: '☀' },
  { value: 'Afternoon', time: '11 AM – 4 PM', label: 'Afternoon', icon: '◒' },
  { value: 'Evening', time: '4 PM – 10 PM', label: 'Evening', icon: '☾' },
  { value: 'Full day', time: 'Flexible timing', label: 'Full day', icon: '✳' },
]

const budgets = ['Below ₹50,000', '₹50,000 – ₹1 lakh', '₹1 lakh – ₹3 lakh', '₹3 lakh – ₹5 lakh', '₹5 lakh+', 'Need a custom quote']
const guestRanges = ['Below 50', '50–100', '100–300', '300–500', '500+']

export default function EnquiryModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', event: 'Wedding', date: '', time: 'Evening', guests: '100–300', budget: 'Need a custom quote', venue: 'Need venue assistance', location: 'Vijayawada', services: [], message: '',
  })
  const today = new Date().toISOString().slice(0, 10)
  const serviceOptions = useMemo(() => servicesByEvent[form.event] || servicesByEvent['Other Function'], [form.event])
  const update = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }))
  const selectEvent = (event) => setForm((current) => ({ ...current, event, services: [] }))
  const toggleService = (service) => setForm((current) => ({ ...current, services: current.services.includes(service) ? current.services.filter((item) => item !== service) : [...current.services, service] }))
  const close = () => {
    onClose()
    window.setTimeout(() => { setSubmitted(false); setStep(1) }, 250)
  }
  const submit = (e) => {
    e.preventDefault()
    // Frontend-only demo: no data is sent or stored. Connect this handler to the backend later.
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && close()}>
        <motion.div className="enquiry-modal booking-modal" initial={{ opacity: 0, y: 28, scale: .97, rotateX: 2 }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" onClick={close} aria-label="Close booking form"><X size={20} /></button>
          {!submitted ? <>
            <div className="booking-modal-intro">
              <p className="eyebrow">A LITTLE ABOUT YOUR BIG MOMENT</p>
              <h2 id="modal-title">Let's plan something<br /><em>unforgettable.</em></h2>
              <p className="modal-copy">Choose your occasion, tell us what you need, and share a date that works for you.</p>
            </div>
            <div className="booking-progress" aria-label={`Step ${step} of 3`}>
              {[['01', 'Your event'], ['02', 'The details'], ['03', 'Your contact']].map(([number, label], index) => <button type="button" key={number} className={`booking-progress-step ${step === index + 1 ? 'is-current' : ''} ${step > index + 1 ? 'is-done' : ''}`} onClick={() => index + 1 < step && setStep(index + 1)}><span>{step > index + 1 ? '✓' : number}</span><small>{label}</small></button>)}
            </div>
            <form className="enquiry-form booking-form" onSubmit={submit}>
              {step === 1 && <motion.div key="step-one" className="booking-step-content" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div className="booking-section-title"><span>01</span><div><h3>What are we celebrating?</h3><p>Choose the occasion you're dreaming of.</p></div></div>
                <div className="event-type-grid">
                  {eventTypes.map(({ name, icon: Icon, note }) => <button type="button" key={name} onClick={() => selectEvent(name)} className={`event-type-card ${form.event === name ? 'event-type-selected' : ''}`} aria-pressed={form.event === name}><Icon size={20} strokeWidth={1.5} /><span>{name}</span><small>{note}</small><i>{form.event === name ? '✓' : '+'}</i></button>)}
                </div>
                <div className="booking-step-actions"><span>We'll tailor the next step to your event.</span><button type="button" className="button button-dark" onClick={() => setStep(2)}>Choose your slot <ArrowUpRight size={16} /></button></div>
              </motion.div>}

              {step === 2 && <motion.div key="step-two" className="booking-step-content" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div className="booking-section-title"><span>02</span><div><h3>Make it yours.</h3><p>Share your preferred date, scale and must-have details.</p></div></div>
                <div className="booking-two-col">
                  <label><span className="field-icon"><CalendarDays size={15} /> Preferred event date</span><input name="date" type="date" min={today} value={form.date} onChange={update} required /></label>
                  <label><span className="field-icon"><Clock3 size={15} /> Preferred time slot</span><select name="time" value={form.time} onChange={update}>{timeSlots.map((slot) => <option key={slot.value} value={slot.value}>{slot.label} · {slot.time}</option>)}</select></label>
                </div>
                <div className="time-slot-grid">{timeSlots.map((slot) => <button type="button" key={slot.value} className={`time-slot-card ${form.time === slot.value ? 'time-slot-selected' : ''}`} onClick={() => setForm((current) => ({ ...current, time: slot.value }))}><span>{slot.icon}</span><b>{slot.label}</b><small>{slot.time}</small></button>)}</div>
                <div className="booking-two-col">
                  <label><span className="field-icon"><Users size={15} /> Expected guests</span><select name="guests" value={form.guests} onChange={update}>{guestRanges.map((range) => <option key={range} value={range}>{range} guests</option>)}</select></label>
                  <label><span className="field-icon">₹ Estimated budget</span><select name="budget" value={form.budget} onChange={update}>{budgets.map((budget) => <option key={budget}>{budget}</option>)}</select></label>
                </div>
                <label><span className="field-icon">Venue preference</span><select name="venue" value={form.venue} onChange={update}><option>Need venue assistance</option><option>Venue already booked</option><option>Home or own venue</option><option>Open to suggestions</option></select></label>
                <div className="booking-requirements"><div className="booking-requirements-heading"><div><h4>What will you need?</h4><p>Select all that apply to your celebration.</p></div><span>{form.services.length.toString().padStart(2, '0')} selected</span></div><div className="requirement-grid">{serviceOptions.map((service) => <label className={`requirement-option ${form.services.includes(service) ? 'requirement-selected' : ''}`} key={service}><input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} /><span className="requirement-check">{form.services.includes(service) ? '✓' : '+'}</span><span>{service}</span></label>)}</div></div>
                <label><span className="field-icon">Anything else on your mind?</span><textarea name="message" value={form.message} onChange={update} placeholder="Theme ideas, colors, venue, special requests…" rows="3" /></label>
                <div className="booking-step-actions"><button type="button" className="button button-back" onClick={() => setStep(1)}>Back</button><button type="button" className="button button-dark" onClick={() => setStep(3)}>Your contact details <ArrowUpRight size={16} /></button></div>
              </motion.div>}

              {step === 3 && <motion.div key="step-three" className="booking-step-content" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div className="booking-section-title"><span>03</span><div><h3>Who should we get in touch with?</h3><p>We'll use these details to discuss your plans.</p></div></div>
                <label>Your full name<input name="name" value={form.name} onChange={update} placeholder="e.g. Priya Sharma" autoComplete="name" required /></label>
                <div className="booking-two-col"><label>Mobile number<input name="phone" value={form.phone} onChange={update} placeholder="10-digit mobile number" inputMode="tel" pattern="[0-9+() -]{10,18}" autoComplete="tel" required /></label><label>Email address <span className="optional-label">Optional</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" /></label></div>
                <label>Event city / venue<input name="location" value={form.location} onChange={update} placeholder="City, venue or area" required /></label>
                <div className="booking-summary"><div className="summary-topline"><Sparkles size={16} /><span>YOUR CELEBRATION AT A GLANCE</span></div><h4>{form.event}</h4><div className="summary-pills"><span><CalendarDays size={13} /> {form.date || 'Date to be discussed'}</span><span><Clock3 size={13} /> {form.time}</span><span><Users size={13} /> {form.guests} guests</span></div><p>{form.services.length ? form.services.join(' · ') : 'Service requirements to be discussed'} </p><small>Preferred dates are requests only. Your event is not confirmed until the Event Manages team checks availability and confirms details.</small></div>
                <div className="booking-step-actions"><button type="button" className="button button-back" onClick={() => setStep(2)}>Back</button><button className="button button-dark" type="submit">Send booking enquiry <ArrowUpRight size={17} /></button></div>
                <p className="form-note">Frontend demo only — this form does not send or store your details yet.</p>
              </motion.div>}
            </form>
          </> : <div className="success-state"><CheckCircle2 size={42} strokeWidth={1.2} /><p className="eyebrow">ENQUIRY PREVIEW COMPLETE</p><h2>Your celebration<br /><em>starts here.</em></h2><p>Thanks, {form.name || 'there'}. Your {form.event.toLowerCase()} enquiry is ready to connect to the backend. No booking has been sent or confirmed in this demo.</p><div className="booking-success-summary"><span>OCCASION <b>{form.event}</b></span><span>PREFERRED DATE <b>{form.date || 'To be discussed'}</b></span><span>TIME SLOT <b>{form.time}</b></span></div><button className="button button-dark" onClick={close}>Back to the website</button></div>}
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  )
}
