'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Sprout, Sun, Droplet, Wind, ThermometerSun,
  Sparkles, MessageCircle, Leaf, Info, Droplets, Gauge, PawPrint, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PLANTS } from '@/lib/plants'

const Particle = ({ delay = 0 }: { delay?: number }) => (
  <motion.span
    className="pointer-events-none absolute rounded-full blur-2xl opacity-30"
    style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(16,185,129,0.3) 35%, rgba(59,130,246,0.2) 70%, transparent 80%)', width: 300, height: 300 }}
    initial={{ scale: 0.8, x: -50, y: -50 }}
    animate={{ scale: [0.8, 1.1, 0.9, 1], x: [-50, 80, -30, 20], y: [-50, 40, 60, -20] }}
    transition={{ duration: 18, repeat: Infinity, delay }}
  />
)

const Trait = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon className="w-4 h-4" />
    <span className="opacity-70">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
)

function Chatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! I’m GreenHive. Ask me about watering, light, soil, temperature or pet safety.' }])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight }, [messages, open])

  async function ask(text: string) {
    const res = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q: text }) })
    const data = await res.json()
    return data.answer as string
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="w-full sm:max-w-md rounded-2xl bg-white overflow-hidden shadow-2xl">
            <div className="p-4 border-b bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white flex items-center justify-between">
              <div className="font-semibold flex items-center gap-2"><Sprout className="w-5 h-5" /> GreenHive Chat</div>
              <button onClick={onClose} className="rounded-lg bg-white/20 px-2 py-1">Close</button>
            </div>
            <div ref={listRef} className="p-4 space-y-3 max-h-[60vh] overflow-y-auto text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm shadow ${m.role === 'user' ? 'ml-auto bg-emerald-600 text-white' : 'bg-white/80 backdrop-blur border'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form className="p-3 border-t flex gap-2" onSubmit={async e => {
              e.preventDefault(); if (!input.trim()) return;
              const t = input.trim(); setInput('');
              setMessages(m=>[...m, { role:'user', text:t }])
              const answer = await ask(t)
              setMessages(m=>[...m, { role:'bot', text:answer }])
            }}>
              <Input value={input} onChange={e => setInput((e.target as HTMLInputElement).value)} placeholder="e.g. How much water for Monstera?" />
              <Button type="submit"><MessageCircle className="w-4 h-4 mr-1" />Send</Button>
            </form>
            <div className="px-3 pb-4 flex flex-wrap gap-2">
              {['Monstera Deliciosa','Areca Palm','Snake Plant','Peace Lily'].map((n, idx) => (
                <Button key={idx} variant="secondary" onClick={async ()=>{
                  const q = idx===0?`Tell me all care details for ${n}`: idx===1?`Is ${n} pet safe?`: idx===2?`${n} light requirements`:`${n} watering`;
                  setMessages(m=>[...m, {role:'user', text:q}]);
                  const a = await (await fetch('/api/ask', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({q})})).json();
                  setMessages(m=>[...m, {role:'bot', text:a.answer}]);
                }}>
                  <Sparkles className="w-3 h-3 mr-1" /> {n.split(' ')[0]}
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Page() {
  const [q, setQ] = useState('')
  const [chatOpen, setChatOpen] = useState(false)

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return PLANTS as any
    return (PLANTS as any).filter((p:any) => [p.name, p.latin, p.summary, p.traits.light, p.traits.water, p.traits.soil].join(' ').toLowerCase().includes(s))
  }, [q])

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Particle />
        <Particle delay={4} />
        <Particle delay={8} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.div initial={{ rotate: -12, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 12 }} className="rounded-full p-2 bg-white/70 backdrop-blur border shadow">
            <Sprout className="w-5 h-5 text-emerald-600" />
          </motion.div>
          <div>
            <div className="font-bold text-lg tracking-tight">GreenHive.ai</div>
            <div className="text-xs opacity-60 -mt-1">AI Nursery</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/70">#Plants</Badge>
          <Badge variant="secondary" className="bg-white/70">#Care</Badge>
          <Badge variant="secondary" className="bg-white/70">#PetSafe</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setChatOpen(true)} className="shadow-lg"><MessageCircle className="w-4 h-4 mr-2" />Chat</Button>
        </div>
      </header>

      <section className="relative z-10 px-6 pt-6 pb-2">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              A <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">living</span> nursery on your screen
            </motion.h1>
            <p className="mt-4 text-base md:text-lg opacity-80 max-w-prose">
              Browse plants, learn care in seconds, and chat with a built-in assistant fine-tuned for plant care.
            </p>
            <div className="mt-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                <Input value={q} onChange={e => setQ((e.target as HTMLInputElement).value)} placeholder="Search plants, e.g. snake plant light" className="pl-10" />
              </div>
              <Button variant="secondary" onClick={() => setChatOpen(true)}>
                <Sparkles className="w-4 h-4 mr-2" />Ask AI
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-80">
              <span className="inline-flex items-center gap-1"><Sun className="w-4 h-4" />Light</span>
              <span className="inline-flex items-center gap-1"><Droplet className="w-4 h-4" />Water</span>
              <span className="inline-flex items-center gap-1"><Droplets className="w-4 h-4" />Humidity</span>
              <span className="inline-flex items-center gap-1"><Gauge className="w-4 h-4" />Difficulty</span>
              <span className="inline-flex items-center gap-1"><PawPrint className="w-4 h-4" />Pet safety</span>
            </div>
          </div>
          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1800&auto=format&fit=crop" alt="Hero plants" className="w-full h-[320px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-blue-600/20" />
            </motion.div>
            <motion.div className="absolute -bottom-5 -left-5 rounded-2xl bg-white/70 backdrop-blur p-3 border shadow" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="text-xs uppercase opacity-60">Today’s Pick</div>
              <div className="font-semibold">Monstera Deliciosa</div>
              <div className="text-xs">Bright, indirect • Moderate water</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Plant Catalog</h2>
          <div className="text-sm opacity-70">{results.length} result(s)</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(results as any).map((p:any) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
              <div className="group relative overflow-hidden rounded-2xl border bg-white/60 backdrop-blur-md shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 via-blue-200/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="p-4 pb-3">
                  <div className="flex items-center gap-2 text-xl font-semibold">
                    <Leaf className="w-5 h-5 text-emerald-600" /> {p.name}
                  </div>
                  <div className="text-xs opacity-70 italic">{p.latin}</div>
                </div>
                <div className="p-4 pt-0">
                  <div className="relative mb-3 h-48 overflow-hidden rounded-xl">
                    <motion.img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                    <span className="absolute top-2 left-2 bg-emerald-600/90 text-white text-xs px-2 py-1 rounded-full">{p.traits.difficulty}</span>
                  </div>
                  <p className="text-sm opacity-80 mb-4">{p.summary}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <Trait icon={Sun} label="Light" value={p.traits.light} />
                    <Trait icon={Droplet} label="Water" value={p.traits.water} />
                    <Trait icon={Wind} label="Humidity" value={p.traits.humidity} />
                    <Trait icon={ThermometerSun} label="Temp" value={p.traits.temperature} />
                  </div>
                  <Button className="w-full" onClick={() => alert('Open care details in modal (keep MVP lean).')}><Info className="w-4 h-4 mr-2" /> Care Details</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Button onClick={() => setChatOpen(true)} className="fixed bottom-5 right-5 z-20 rounded-full shadow-2xl md:hidden">
        <MessageCircle className="w-5 h-5 mr-1" /> Chat
      </Button>

      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />

      <footer className="relative z-10 px-6 py-10 text-sm opacity-70">
        GreenHive.ai • Next.js, Tailwind, Framer Motion, lucide-react • Deploy on Vercel.
      </footer>
    </div>
  )
}
