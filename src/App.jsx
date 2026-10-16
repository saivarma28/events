import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, Sparkles, MoveUpRight, Instagram, Facebook, Heart, Plus } from 'lucide-react'
import Reveal from './components/Reveal'
import EnquiryModal from './components/EnquiryModal'
import { services, gallery } from './data/content'

const ease = [0.22, 1, 0.36, 1]

function Header({ onEnquire }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [['Our approach', '#about'], ['Experiences', '#services'], ['Selected work', '#gallery'], ['Contact', '#contact']]
  const go = (href) => { setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }
  return <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
    <a href="#home" className="brand" aria-label="Event Manages home"><span className="brand-mark">e<span>m</span></span><span className="brand-name">EVENT <b>MANAGES</b><small>CELEBRATIONS, CURATED</small></span></a>
    <nav className="desktop-nav">{links.map(([label, href]) => <button key={href} onClick={() => go(href)}>{label}</button>)}</nav>
    <button className="header-cta" onClick={onEnquire}>Plan your event <ArrowUpRight size={15} /></button>
    <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .28 }}>{links.map(([label, href]) => <button key={href} onClick={() => go(href)}>{label}<ArrowUpRight size={16} /></button>)}<button onClick={() => { setMenuOpen(false); onEnquire() }}>Plan your event <ArrowUpRight size={16} /></button></motion.nav>}</AnimatePresence>
  </header>
}

function Hero({ onEnquire }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const pointerX = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: .7 })
  const pointerY = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: .7 })
  const imageX = useTransform(pointerX, [-.5, .5], [-13, 13])
  const imageOffsetY = useTransform(pointerY, [-.5, .5], [-10, 10])
  const imageRotateX = useTransform(pointerY, [-.5, .5], [3, -3])
  const imageRotateY = useTransform(pointerX, [-.5, .5], [-4, 4])
  const particles = [
    { left: '12%', top: '26%', size: 3, duration: 7, delay: 0 },
    { left: '24%', top: '68%', size: 2, duration: 8, delay: .7 },
    { left: '38%', top: '18%', size: 2, duration: 6.5, delay: 1.4 },
    { left: '51%', top: '77%', size: 3, duration: 8.5, delay: .4 },
    { left: '64%', top: '29%', size: 2, duration: 7.5, delay: 1.8 },
    { left: '76%', top: '63%', size: 3, duration: 9, delay: .9 },
    { left: '88%', top: '35%', size: 2, duration: 7, delay: 2.1 },
    { left: '18%', top: '48%', size: 2, duration: 9, delay: 2.5 },
    { left: '43%', top: '53%', size: 2, duration: 7.5, delay: 1.1 },
    { left: '71%', top: '82%', size: 2, duration: 8, delay: 1.6 },
    { left: '93%', top: '72%', size: 3, duration: 9.5, delay: .3 },
    { left: '7%', top: '79%', size: 2, duration: 8, delay: 1.9 },
  ]
  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - .5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - .5)
  }
  const resetPointer = () => { pointerX.set(0); pointerY.set(0) }
  return <section className="hero" id="home" ref={ref} onPointerMove={onPointerMove} onPointerLeave={resetPointer}>
    <motion.div className="hero-image-wrap" style={{ y: imageY }}><motion.img className="hero-image" style={{ x: imageX, y: imageOffsetY, rotateX: imageRotateX, rotateY: imageRotateY, scale: 1.08 }} src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90" alt="Romantic wedding celebration with elegant floral styling" fetchPriority="high" /></motion.div>
    <div className="hero-vignette" />
    <div className="hero-particles" aria-hidden="true">{particles.map((particle, index) => <motion.i key={index} style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }} animate={{ x: [0, 8, -5, 0], y: [0, -20, 6, 0], opacity: [.12, .72, .22, .12], scale: [1, 1.35, .8, 1] }} transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }} />)}</div>
    <motion.div className="hero-content" style={{ y: textY }}>
      <motion.div className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7, ease }}><span className="kicker-line" /> WEDDINGS · GATHERINGS · EXTRAORDINARY MOMENTS <span className="kicker-line" /></motion.div>
      <h1><span><motion.span className="hero-word" initial={{ opacity: 0, y: 42, rotateX: -18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .45, duration: .9, ease }}>Your</motion.span>{' '}<motion.span className="hero-word" initial={{ opacity: 0, y: 42, rotateX: -18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .57, duration: .9, ease }}>Moments.</motion.span></span><span className="hero-title-italic"><motion.span className="hero-word" initial={{ opacity: 0, y: 42, rotateX: -18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .69, duration: .9, ease }}>Our</motion.span>{' '}<motion.span className="hero-word" initial={{ opacity: 0, y: 42, rotateX: -18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .81, duration: .9, ease }}>Masterpiece.</motion.span></span></h1>
      <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .95, duration: .8 }}>Extraordinary celebrations, beautifully imagined.</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08, duration: .7, ease }}><button className="button button-gold" onClick={onEnquire}>Plan Your Event <ArrowUpRight size={16} /></button><a href="#gallery" className="text-link light-link">Explore Our Work <ArrowDownRight size={16} /></a></motion.div>
    </motion.div>
    <div className="hero-side-note"><span>01 / 04</span><span className="side-note-line" /><span>THE ART OF CELEBRATING</span></div>
    <a href="#intro" className="scroll-cue"><span>SCROLL TO DISCOVER</span><span className="scroll-cue-line"><i /></span></a>
    <div className="hero-stamp"><Sparkles size={15} /><span>MADE WITH<br />MEANING</span></div>
  </section>
}

function Intro() {
  return <section className="intro-section section-pad" id="intro">
    <Reveal className="intro-label"><span className="eyebrow">A DIFFERENT KIND OF EVENT STUDIO</span><span className="intro-index">EST. WITH INTENTION</span></Reveal>
    <div className="intro-grid">
      <Reveal className="intro-heading"><h2>Not just an event.<br />A feeling that <em>stays.</em></h2></Reveal>
      <Reveal className="intro-copy" delay={.12}><span className="gold-spark">✳</span><p>Some moments deserve more than a plan. They deserve a point of view, a little wonder, and details that feel unmistakably yours.</p><p>We bring your ideas together with considered design and thoughtful coordination — so you can be right where you belong: in the moment.</p><a className="text-link dark-link" href="#about">Get to know our approach <ArrowUpRight size={16} /></a></Reveal>
    </div>
    <div className="intro-bottom-rule"><span>PERSONAL BY DESIGN</span><span>BEAUTIFUL BY NATURE</span><span>REMEMBERED FOREVER</span></div>
  </section>
}

function About() {
  return <section className="about-section" id="about">
    <div className="about-image-panel"><motion.img whileInView={{ scale: 1 }} initial={{ scale: 1.08 }} transition={{ duration: 1.4, ease }} viewport={{ once: true }} src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1500&q=85" alt="Thoughtfully styled celebration tables with flowers and warm light" loading="lazy" /><div className="image-caption"><span>THE BEAUTY IS IN THE DETAILS</span><ArrowDownRight size={17} /></div><div className="about-floating-card"><span className="floating-card-star">✳</span><span>Thoughtful<br /><em>by design.</em></span></div></div>
    <div className="about-copy-panel"><Reveal><p className="eyebrow">OUR POINT OF VIEW</p><h2>Considered details.<br /><em>Effortless joy.</em></h2><p className="about-body">The best celebrations never feel like anyone else's. They reflect the people at the heart of them — their stories, their rituals, their little details.</p><p className="about-body">From the first idea to the final finishing touch, our approach is personal, collaborative and grounded in the belief that the meaningful things are often the smallest.</p><div className="signature-line"><span className="signature">With care, always.</span><span className="signature-rule" /></div><a className="text-link dark-link" href="#services">Discover what we do <ArrowUpRight size={16} /></a></Reveal></div>
  </section>
}

function Services({ onEnquire }) {
  return <section className="services-section section-pad" id="services">
    <Reveal className="section-heading-row"><div><p className="eyebrow">MADE FOR YOUR KIND OF MAGIC</p><h2>Every reason<br />to <em>celebrate.</em></h2></div><p className="section-aside">Different stories. Different settings.<br />One thoughtful approach to every detail.</p></Reveal>
    <div className="services-grid">{services.map((service, i) => <Reveal key={service.number} delay={i * .07} className={`service-card ${service.className}`}><button className="service-image-button" onClick={onEnquire} aria-label={`Enquire about ${service.title}`}><img src={service.image} alt={`${service.title} event inspiration`} loading="lazy" /><span className="service-image-overlay" /><span className="service-number">{service.number} / 04</span><span className="service-plus"><Plus size={19} /></span><span className="service-image-title">{service.title}</span></button><div className="service-meta"><span>{service.eyebrow}</span><p>{service.description}</p></div></Reveal>)}</div>
    <div className="services-footer"><span>HAVE SOMETHING ELSE IN MIND?</span><button className="text-link dark-link" onClick={onEnquire}>Tell us your idea <ArrowUpRight size={16} /></button></div>
  </section>
}

function Manifesto() {
  return <section className="manifesto-section"><div className="manifesto-bg" /><div className="manifesto-grain" /><Reveal className="manifesto-inner"><span className="manifesto-star">✳</span><p className="eyebrow">THE LITTLE THINGS ARE THE BIG THINGS</p><h2>Made with intention.<br /><em>Remembered by heart.</em></h2><p className="manifesto-copy">Because the best memories aren't measured in grand gestures, but in how a moment makes you feel.</p><a href="#contact" className="button button-outline-light">Let's make a memory <ArrowUpRight size={16} /></a></Reveal><span className="manifesto-side">A LITTLE WONDER GOES A LONG WAY</span></section>
}

function Gallery() {
  const [filter, setFilter] = useState('All')
  const [activeImage, setActiveImage] = useState(null)
  const filters = ['All', 'Weddings', 'Decor', 'Parties']
  const items = gallery.filter(item => filter === 'All' || item.category === filter)
  return <section className="gallery-section section-pad" id="gallery">
    <Reveal className="gallery-heading"><div><p className="eyebrow">A FEW STORIES WE LOVE</p><h2>Little previews.<br /><em>Lasting impressions.</em></h2></div><p className="gallery-aside">A collection of details, atmosphere and moments that make a celebration feel like yours.</p></Reveal>
    <div className="gallery-toolbar"><div className="gallery-filters" role="group" aria-label="Filter gallery">{filters.map(f => <button className={filter === f ? 'filter-active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><span>{String(items.length).padStart(2, '0')} SELECTED MOMENTS</span></div>
    <motion.div layout className="gallery-grid">{items.map((item, i) => <motion.button layout key={item.title} className={`gallery-item gallery-item-${i % 3}`} onClick={() => setActiveImage(item)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease }}><img src={item.image} alt={item.title} loading="lazy" /><span className="gallery-item-shade" /><span className="gallery-item-info"><span><small>{item.category}</small><b>{item.title}</b></span><span className="gallery-open"><ArrowUpRight size={17} /></span></span></motion.button>)}</motion.div>
    <AnimatePresence>{activeImage && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)}><button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Close image"><X /></button><motion.img src={activeImage.image} alt={activeImage.title} initial={{ scale: .94 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()} /><p>{activeImage.title} <span>— {activeImage.category}</span></p></motion.div>}</AnimatePresence>
    <div className="gallery-bottom"><span>YOUR STORY COULD BE NEXT</span><a href="#contact" className="text-link dark-link">Create something together <ArrowUpRight size={16} /></a></div>
  </section>
}

function Process() {
  const steps = [{ n: '01', title: 'We listen', copy: 'Your story, your people, your vision. We start with what matters to you.' }, { n: '02', title: 'We imagine', copy: 'We shape a considered direction, with details that feel personal.' }, { n: '03', title: 'We bring it to life', copy: 'Every moving part comes together, leaving you free to be present.' }]
  return <section className="process-section section-pad"><Reveal className="process-heading"><p className="eyebrow">FROM FIRST THOUGHT TO FINAL TOAST</p><h2>A thoughtful process.<br /><em>A beautiful result.</em></h2></Reveal><div className="process-list">{steps.map((s, i) => <Reveal key={s.n} delay={i * .08} className="process-item"><span className="process-number">{s.n}</span><h3>{s.title}</h3><p>{s.copy}</p><ArrowUpRight size={18} className="process-arrow" /></Reveal>)}</div></section>
}

function Contact({ onEnquire }) {
  return <section className="contact-section" id="contact"><div className="contact-image"><img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85" alt="Elegant celebration space ready for guests" loading="lazy" /><div className="contact-image-overlay" /><span className="contact-image-label">THE START OF SOMETHING SPECIAL</span></div><div className="contact-content"><Reveal><p className="eyebrow">YOUR MOMENT IS WAITING</p><h2>Shall we make<br /><em>it unforgettable?</em></h2><p>Tell us what you're dreaming of. We'll bring the thoughtful questions, the ideas and the care.</p><button className="button button-gold" onClick={onEnquire}>Tell us about your event <ArrowUpRight size={16} /></button><div className="contact-detail"><span>BASED IN</span><b>Vijayawada, Andhra Pradesh</b><small>Creating celebrations in Vijayawada and beyond.</small></div></Reveal></div></section>
}

function Footer({ onEnquire }) {
  return <footer className="site-footer"><div className="footer-top"><a href="#home" className="brand footer-brand"><span className="brand-mark">e<span>m</span></span><span className="brand-name">EVENT <b>MANAGES</b><small>CELEBRATIONS, CURATED</small></span></a><p>For the moments<br />that become <em>memories.</em></p><button className="footer-arrow" onClick={onEnquire} aria-label="Plan your event"><ArrowUpRight size={25} /></button></div><div className="footer-bottom"><span>© {new Date().getFullYear()} EVENT MANAGES. MADE WITH CARE.</span><div><a href="#about">OUR APPROACH</a><a href="#services">EXPERIENCES</a><a href="#gallery">SELECTED WORK</a></div><span>VIJAYAWADA · ANDHRA PRADESH</span></div></footer>
}

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setEnquiryOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return <div className="app-shell"><Header onEnquire={() => setEnquiryOpen(true)} /><main><Hero onEnquire={() => setEnquiryOpen(true)} /><Intro /><About /><Services onEnquire={() => setEnquiryOpen(true)} /><Manifesto /><Gallery /><Process /><Contact onEnquire={() => setEnquiryOpen(true)} /></main><Footer onEnquire={() => setEnquiryOpen(true)} /><EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} /><a className="back-to-top" href="#home" aria-label="Back to top"><ArrowDown className="back-to-top-icon" size={17} /></a></div>
}
