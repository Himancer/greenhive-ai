
export type Plant = {
  id: string
  name: string
  latin: string
  images: string[]
  summary: string
  traits: {
    light: string
    water: string
    humidity: string
    soil: string
    temperature: string
    difficulty: string
    toxic: boolean
    petSafe: boolean
  }
}

export const PLANTS: Plant[] = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    latin: 'Monstera deliciosa',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593697820988-6c281b72d68d?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Iconic split leaves, fast grower, easy indoor statement plant.',
    traits: {
      light: 'Bright, indirect',
      water: 'Moderate; let top 2–3 cm dry',
      humidity: 'Medium–High',
      soil: 'Chunky aroid mix (bark+perlite+peat)',
      temperature: '18–27°C',
      difficulty: 'Easy',
      toxic: true,
      petSafe: false,
    }
  },
  {
    id: 'snake',
    name: 'Snake Plant',
    latin: 'Dracaena trifasciata',
    images: [
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde1?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Nearly indestructible; tolerates low light and irregular watering.',
    traits: {
      light: 'Low to bright, indirect',
      water: 'Low; let soil dry fully',
      humidity: 'Low–Medium',
      soil: 'Well-draining cactus mix',
      temperature: '15–30°C',
      difficulty: 'Very Easy',
      toxic: true,
      petSafe: false,
    }
  },
  {
    id: 'pothos',
    name: 'Golden Pothos',
    latin: 'Epipremnum aureum',
    images: [
      'https://images.unsplash.com/photo-1623855248431-1f1abcb0f0c1?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589923158778-9cde0c8ea9da?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Trailing vine with variegated leaves; forgiving and fast-growing.',
    traits: {
      light: 'Low–Medium–Bright, indirect',
      water: 'Moderate; dry top 2–4 cm',
      humidity: 'Medium',
      soil: 'Standard potting + perlite',
      temperature: '16–28°C',
      difficulty: 'Easy',
      toxic: true,
      petSafe: false,
    }
  },
  {
    id: 'areca',
    name: 'Areca Palm',
    latin: 'Dypsis lutescens',
    images: [
      'https://images.unsplash.com/photo-1585325701979-c93e30769cb3?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545249390-6177a5f53f6d?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Feathery fronds; air-purifying and pet-friendly.',
    traits: {
      light: 'Bright, filtered',
      water: 'Evenly moist; avoid soggy',
      humidity: 'Medium–High',
      soil: 'Rich, well-draining',
      temperature: '18–27°C',
      difficulty: 'Medium',
      toxic: false,
      petSafe: true,
    }
  },
  {
    id: 'peace',
    name: 'Peace Lily',
    latin: 'Spathiphyllum wallisii',
    images: [
      'https://images.unsplash.com/photo-1614594852131-9d9edb41a3c9?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598899134739-24d5b3c2c4e1?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Elegant white spathes; loves consistent moisture and humidity.',
    traits: {
      light: 'Medium, indirect (tolerates low)',
      water: 'Keep slightly moist',
      humidity: 'Medium–High',
      soil: 'Peat-based, airy',
      temperature: '18–27°C',
      difficulty: 'Easy',
      toxic: true,
      petSafe: false,
    }
  },
]

export function answerQuestion(q: string) {
  const query = q.toLowerCase()
  const plant = PLANTS.find(p => query.includes(p.name.toLowerCase().split(' ')[0]) || query.includes(p.id) || query.includes(p.name.toLowerCase()))
  if (!plant) {
    const names = PLANTS.map(p=>p.name).join(', ')
    return `I can help with ${names}. Ask e.g. "How much water for Monstera?"`
  }
  const t = plant.traits
  const pick = (keys: (keyof typeof t)[]) => keys.map(k => `${k}: ${t[k] ?? 'n/a'}`).join(' | ')
  if (/(water|watering|thirst)/.test(query)) return `${plant.name} — Water: ${t.water}.`
  if (/(light|sun)/.test(query)) return `${plant.name} — Light: ${t.light}.`
  if (/(humidity|humid)/.test(query)) return `${plant.name} — Humidity: ${t.humidity}.`
  if (/(soil|mix|potting)/.test(query)) return `${plant.name} — Soil: ${t.soil}.`
  if (/(temp|temperature|cold|heat)/.test(query)) return `${plant.name} — Temperature: ${t.temperature}.`
  if (/(toxic|poison|pet|cat|dog)/.test(query)) return `${plant.name} — ${t.petSafe ? 'Pet-safe ✅' : 'Toxic to pets ⚠️'}`
  if (/(care|guide|all|summary|info|about|details)/.test(query)) return `${plant.name} care — ${pick(['light','water','humidity','soil','temperature','difficulty'])}`
  return `For ${plant.name}, I can tell you about light, water, humidity, soil, temperature, toxicity, pet safety, and difficulty.`
}
