'use client'

import React, { useRef, useState } from 'react'

// Activities data
type Link = { label: string; href: string }
type Activity = {
  title: string
  subtitle?: string
  img?: string
  imgPosition?: string // e.g., 'center', 'top', 'bottom'
  bullets?: string[]
  links?: Link[]
}

const ACTIVITIES: Activity[] = [
  {
    title: 'NUS Student Union',
    subtitle: 'Vice-President (External)',
    img: 'logos/relations.jpeg',
    imgPosition: 'center',
    links: [
      { label: 'Tsinghua article', href: 'https://www.tsinghua.edu.cn/info/1180/110038.htm' },
      { label: 'Facebook post', href: 'https://www.facebook.com/photo.php?fbid=726529606175372&id=100064550177227&set=a.622420489919618' },
    ],
  },
  {
    title: 'Inter-University Network',
    subtitle: 'Chairperson',
    img: 'logos/LSQ06334.webp',
    imgPosition: 'center',
    links: [
      { label: 'Instagram feature', href: 'https://www.instagram.com/p/C8EdHHEoy2o/' },
    ],
  },
  {
    title: 'NUS Varsity Wushu',
    subtitle: 'Team NUS — IVP Overall Champions',
    img: '/logos/wushu.jpg',
    imgPosition: 'center',
  },
  {
    title: 'Tembusu Ambassadors',
    subtitle: 'College outreach',
    img: '/logos/tembusu.jpeg',
    imgPosition: '40%',
    links: [
      { label: 'Instagram reel', href: 'https://www.instagram.com/reel/CpVGIHaA_z-/?igsh=MTBzMnh0eTFzdHU1ag==' },
      { label: 'Instagram post', href: 'https://www.instagram.com/p/CpuvgxwvBUb/?igsh=OWx4aDk3czd4dmVr' },
    ],
  },
  {
    title: 'Tembusu Ultimate Frisbee',
    subtitle: 'College sport',
    img: '/logos/frisbee.jpeg',
    imgPosition: '90%',
  },
  {
    title: 'NUS Investment Society',
    subtitle: 'Global Macro. Sectorial Focus: Oceania FX and Commodities',
    img: '/logos/nusis.jpeg',
    imgPosition: 'center',
    links: [
      { label: 'AUD/USD idea', href: 'https://drive.google.com/file/d/1nc4Aob_eEYkry6BNPgnPXiO3kLS2FJ1C/view' },
      { label: 'NZD/USD idea', href: 'https://drive.google.com/file/d/1E8h260jOy30DxGG-9EmlzjsBwqL6OMqi/view' },
    ],
  },
  {
    title: 'GW Stock & Portfolio Management Club',
    subtitle: 'Equity Analyst (Radius Recycling, Vital Farms)',
    img: '/logos/gwspmc.jpg',
    imgPosition: 'center',
    links: [
      { label: "Q1'25 Report", href: 'https://drive.google.com/file/d/1c3idMhxiaOvdxOEvs2-aD3qMe1BF0rMQ/view' },
      { label: "Q2'25 Report", href: 'https://drive.google.com/file/d/1hs5E86uHaWo8cyK5LtTk-qYr2Y0uBNn-/view' },
    ],
  },
]

// Activities Card Component
function ActivitiesSection() {
  const [i, setI] = useState(0)
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)

  const current = ACTIVITIES[i]

  const onStart = (x: number) => { startX.current = x; setDragging(true) }
  const onMove = (x: number) => { if (dragging) setDx(x - startX.current) }
  const onEnd = () => {
    const threshold = 80
    if (dx > threshold && i > 0) setI(i - 1)
    else if (dx < -threshold && i < ACTIVITIES.length - 1) setI(i + 1)
    setDx(0); setDragging(false)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && i > 0) setI(i - 1)
    if (e.key === 'ArrowRight' && i < ACTIVITIES.length - 1) setI(i + 1)
  }

  return (
    <div className="px-4" onKeyDown={onKey} tabIndex={0}>
      <div className="relative max-w-xl mx-auto h-[520px] md:h-[560px]">
        {/* Background shadow card for depth effect */}
        <div className="absolute inset-2 rounded-2xl bg-gray-200/50 transform rotate-2" />
        <div className="absolute inset-1 rounded-2xl bg-gray-100/50 transform -rotate-1" />
        
        <div
          className="absolute inset-0 rounded-2xl bg-white shadow-xl border border-gray-100 p-5 md:p-6 select-none touch-pan-y
                     transition-transform duration-200 ease-out"
          style={{
            transform: `translateX(${dx}px) rotate(${dx / 35}deg)`,
          }}
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseMove={(e) => onMove(e.clientX)}
          onMouseUp={onEnd}
          onMouseLeave={() => dragging && onEnd()}
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
        >
          {current?.img && (
            <div className="h-48 md:h-64 w-full overflow-hidden rounded-xl mb-4 shadow-inner">
              <img
                src={current.img}
                alt={current.title}
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: current.imgPosition === 'center' ? 'center' 
                    : current.imgPosition === 'bottom' ? 'bottom' 
                    : current.imgPosition?.includes('%') ? `center ${current.imgPosition}`
                    : 'top'
                }}
              />
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{current?.title}</h3>
          {current?.subtitle && (
            <p className="text-sm md:text-base text-gray-500 mt-1">{current.subtitle}</p>
          )}

          {current?.bullets && (
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm md:text-base text-gray-600">
              {current.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
            </ul>
          )}

          {current?.links && (
            <div className="flex flex-wrap gap-3 mt-4">
              {current.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  className="text-blue-500 hover:text-blue-600 text-sm transition-colors inline-flex items-center gap-1"
                >
                  {l.label} <span className="text-xs">↗</span>
                </a>
              ))}
            </div>
          )}

          <div className="absolute bottom-5 left-0 right-0 flex items-center justify-between px-5">
            <button
              onClick={() => i > 0 && setI(i - 1)}
              disabled={i === 0}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              ← Prev
            </button>
            <div className="flex gap-1.5">
              {ACTIVITIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === i ? 'w-6 bg-gray-800' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
            <button
              onClick={() => i < ACTIVITIES.length - 1 && setI(i + 1)}
              disabled={i === ACTIVITIES.length - 1}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Swipe or use arrow keys to navigate
      </p>
    </div>
  )
}

// Experience Card Component
function ExperienceCard({ logo, company, role }: {
  logo: string
  company: string
  role: string
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex items-center gap-5 p-5">
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
          <img
            src={logo}
            alt={company}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{role}</p>
        </div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ title, subtitle, description, link, links, techLogos }: {
  title: string
  subtitle?: string
  description: string | React.ReactNode
  link?: { label: string; href: string }
  links?: { label: string; href: string }[]
  techLogos?: string[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 hover:bg-gray-50/50 transition text-left"
      >
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 italic mt-0.5">{subtitle}</p>
          )}
          {link && (
            <a 
              href={link.href} 
              target="_blank" 
              className="text-blue-500 text-sm hover:text-blue-600 transition-colors inline-flex items-center gap-1 mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              {link.label} <span className="text-xs">↗</span>
            </a>
          )}
        </div>
        <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-gray-200' : ''}`}>
          <span className="text-gray-500 text-sm">▼</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white space-y-4">
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" className="text-blue-500 hover:text-blue-600 text-sm transition-colors inline-flex items-center gap-1">
                  {l.label} <span className="text-xs">↗</span>
                </a>
              ))}
            </div>
          )}
          
          {techLogos && techLogos.length > 0 && (
            <div className="flex gap-3 pt-2">
              {techLogos.map((logo, idx) => (
                <div key={idx} className="w-8 h-8 rounded-lg bg-gray-100 p-1.5 hover:scale-110 transition-transform">
                  <img src={logo} alt="Tech" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Section Header Component
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-8 rounded-full bg-gray-300" />
        <div className="h-1 w-16 rounded-full bg-gray-800" />
        <div className="h-1 w-8 rounded-full bg-gray-300" />
      </div>
    </div>
  )
}

function ProjectGroup({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
        {title}
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* About Section */}
      <section id="about" className="pt-16 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-shrink-0 relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-gray-200 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-gray-100" />
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-white transform transition duration-500 hover:scale-105">
              <img
  src="/logos/headshot_v2.jpeg"
  alt="Rangi Ho"
  className="w-full h-full object-cover"
  style={{
    transform: 'scale(1.15)',      // zoom in
    transformOrigin: 'center',     // keep centered
    objectPosition: '50% 20%',     // fine-tune vertical focus if needed
  }}
/>

              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-blue-600 font-medium mb-2">Welcome to my portfolio</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
  Hi, I&apos;m Rangi Ho
</h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Final-year Economics student at the National University of Singapore, 
                with a second major in Data Analytics and a minor in Mathematics.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mt-4">
                Passionate about bridging finance and technology, building tools and startups, 
                and sharing insights on financial markets.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="flex justify-center gap-6">
            {/* Email */}
            <a
              href="mailto:rangi.ho@gmail.com"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">Email</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/rangi-ho-669945267"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0077B5] group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/rangiho"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">GitHub</span>
            </a>

            {/* Blog (Substack) */}
<a
  href="https://substack.com/@rangiho"
  target="_blank"
  rel="noopener noreferrer"
  className="group flex flex-col items-center gap-2"
>
  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
    {/* Simple “newsletter/blog” icon */}
    <svg
      className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h10M7 11h10M7 15h6M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
      />
    </svg>
  </div>
  <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
    Blog
  </span>
</a>

          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Work Experience" />
          <div className="space-y-4">

        <ExperienceCard
          logo="/logos/teja.png"
          company="Teja Ventures"
          role="Intern | Aug 2025 – Dec 2025"
        />

        <ExperienceCard
          logo="/logos/equis.webp"
          company="Equis Development"
          role="Finance Intern | Aug 2024 – Dec 2024"
        />

        <ExperienceCard
          logo="/logos/maybank.webp"
          company="Maybank Investment Banking Group"
          role="Intern | May 2024 – Aug 2024"
        />

        <ExperienceCard
          logo="/logos/dcs.svg"
          company="DCS Card Centre"
          role="Data Analyst Intern | May 2023 – July 2023"
        />
          </div>
        </div>
      </section>

     {/* Projects Section */}
<section
  id="projects"
  className="py-16 px-4 bg-gradient-to-b from-gray-50/50 to-white scroll-mt-20"
>
  <div className="max-w-4xl mx-auto">
    <SectionHeader title="Projects" />

    <div className="mt-10 space-y-10">
      {/* Tech */}
      <div className="space-y-4">
        <ProjectGroup title="Tech" />

        <ProjectCard
          title="Monde"
          link={{ label: "mondelearning.com", href: "https://www.mondelearning.com/" }}
          description="Monde is an AI-powered learning platform that delivers personalized tutoring for students from primary to university levels, and even lifelong learners, based on the Singapore Education System. It addresses key challenges such as the lack of individualized support, overly generalized learning content, and the stress faced by students and teachers."
          techLogos={["/logos/vue.png", "/logos/tailwind.png", "/logos/node.png"]}
        />

        <ProjectCard
          title="Enhancing Mathematical Problem-Solving in Discrete Mathematics Through Fine-Tuning Large Language Models"
          description="Implemented Low-Rank Adaptation (LoRA) via PEFT to fine-tune LLaMA 2 on custom discrete mathematics datasets, enhancing the model's ability to perform domain-specific reasoning."
          links={[
            {
              label: "GitHub",
              href: "https://github.com/rangiho/Enhancing-Mathematical-Problem-Solving-in-Discrete-Mathematics-through-Fine-Tuning-LLMs",
            },
            {
              label: "Documentation",
              href: "https://drive.google.com/file/d/1qw4At2J6nd9Ex4HgDZ1JX6zgo1RLkTY-/view",
            },
          ]}
          techLogos={["/logos/python.png"]}
        />

        <ProjectCard
          title="HawkerBro"
          description={
            <>
              Awarded NUS Orbital – Apollo 11 (Difficult/Advanced Tier) for developing a cross-platform,
              full-stack mobile hawker center guide app built with Flutter, enabling users to discover and
              review local food stalls. Built together with{" "}
              <a
                href="https://www.linkedin.com/in/syed-iman-syed-amir-shah/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Syed Iman bin Syed Amir Shah
              </a>
              .
            </>
          }
          links={[
            { label: "GitHub", href: "https://github.com/rangiho/hawkerbro" },
            {
              label: "Documentation",
              href: "https://drive.google.com/drive/folders/19B285Uw81VAKAFscF8WiK5vQlNogvgv3?usp=drive_link",
            },
          ]}
          techLogos={["/logos/flutter.png", "/logos/firebase.webp"]}
        />
      </div>

      {/* Economic/Econometrics Research */}
      <div className="space-y-4">
        <ProjectGroup title="Economic/Econometrics Research" />

        <ProjectCard
          title="Undergraduate Research Opportunity (UROP): Empirical Applications of Multiway Clustering"
          description={<>I studied and applied multiway clustering methods in empirical economics to address a core problem in applied regression analysis: how to conduct valid statistical inference when error terms are correlated along more than one dimension.

            Standard regression models often assume independent errors, or at most allow clustering along a single dimension (for example, by country or by firm). However, many real-world datasets violate this assumption. My project focused on understanding why single-way clustering is insufficient, how multiway clustering corrects this, and how these methods change empirical conclusions in applied work. The main takeaway is that inference is highly sensitive to the assumed error structure. This reinforced the idea that econometric credibility depends as much on variance estimation as on model specification.</>}
            techLogos={["/logos/R.png"]}
        />

        <ProjectCard
          title="Machine Learning Analysis of Student Performance"
          description="Supervised regression models, supervised classification models, and unsupervised learning techniques (PCA and K-Means) to examine how class size, demographics, and teacher characteristics relate to academic outcomes."
          links={[
            {
              label: "GitHub",
              href: "https://github.com/rangiho/ML-Analysis-of-Student-Performance-NELS-88-",
            },
          ]}
          techLogos={["/logos/python.png"]}
        />

        <ProjectCard
          title="Malaria in Sub-Saharan Africa"
          description="Empirical analysis of malaria’s long-run economic and educational impacts in Sub-Saharan Africa."
          links={[{ label: "GitHub", href: "https://github.com/rangiho/Malaria-in-Sub-Saharan-Africa" }]}
          techLogos={["/logos/R.png"]}
        />

        <ProjectCard
          title="Bitcoin Returns and Lunar Phases"
          description="Investigates whether Bitcoin’s daily returns and volatility exhibit any statistical relationship with the lunar cycle."
          links={[
            {
              label: "GitHub",
              href: "https://github.com/rangiho/Bitcoin-Returns-and-Lunar-Phases",
            },
          ]}
          techLogos={["/logos/R.png"]}
        />
      </div>

      {/* Finance */}
      <div className="space-y-4">
        <ProjectGroup title="Finance" />

        <ProjectCard
          title="Long Floor & Decor (NYSE:FND)"
          description={<>Full 3 Statement Model, DCF, Scenario Analysis and Valuations with Report</>}
          links={[
            {
              label: "Financial Model",
              href: "https://docs.google.com/spreadsheets/d/17r4qdhlgWHMbgZe9dmF_z7iq0lvVslCF/edit?usp=sharing&ouid=105166441848938439398&rtpof=true&sd=true",
            },
            {
              label: "Report",
              href: "https://drive.google.com/file/d/1LR0285pXYlzrxMDYSP6_tNK9jcd2Ub-d/view?usp=sharing",
            },
          ]}
        />
      </div>

      {/* Essays */}
      <div className="space-y-4">
        <ProjectGroup title="Essays" />

        <ProjectCard
          title="Basis of Authority: Challenges on the Social Contract through Feminist and Familial Lenses"
          subtitle="Political Philosophy"
          description={
            <>
              The crux of this fictional dialogue is not to proffer a definitive answer to the enduring question
              of &quot;What is the basis of authority?&quot; but rather to explore a plausible response, using the social
              contract theories, to illuminate the necessity for governance and political authority.
            </>
          }
          links={[
            {
              label: "Essay",
              href: "https://drive.google.com/file/d/1GfDm3ssqwv1gW_oS_34hU4bhNdtmGDk1/view?usp=sharing",
            },
            {
              label: "Nomination for Best Essay Prize",
              href: "https://tembusu.nus.edu.sg/education/student-prizes/",
            },
          ]}
        />
      </div>
    </div>
  </div>
</section>

      {/* Activities Section */}
      <section id="activities" className="py-16 px-4 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Activities" />
          <ActivitiesSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© 2025 Rangi Ho. All rights reserved.</p>
      </footer>
    </div>
  )
}
