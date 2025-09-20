import { defineConfig, presetWind, presetAttributify, presetIcons, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),         // utilidades tipo Tailwind
    presetAttributify(),  // opcional: <div text="xl gray-500">
    presetIcons(),        // opcional: i-lucide:trophy
    presetTypography(),   // opcional: estilos tipográficos
  ],
  theme: {
    colors: {
      'raynu-cyan':  '#00E5FF',
      'raynu-red':   '#FF4A3A',
      'raynu-green': '#39FF14',
    },
  },
  shortcuts: {
    // Layout / superficies
    'section':        'py-16 md:py-24',
    'section-surface':'py-16 md:py-24 bg-[rgb(var(--bg-0))]',
    'panel':          'rounded-2xl border border-white/10 bg-[rgb(var(--bg-1))] shadow-[0_18px_60px_rgba(0,0,0,0.35)]',

    // Botones
    'btn':           'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:rgb(var(--raynu-cyan))] focus:ring-offset-black',
    'btn-primary':   'btn text-white bg-gradient-to-r from-[#00E5FF] to-[#FF4A3A] shadow-[0_10px_26px_rgba(0,229,255,0.28),0_2px_8px_rgba(255,74,58,0.22)] hover:brightness-105 hover:-translate-y-0.5',
    'btn-outline':   'btn border border-white/15 text-[rgb(var(--text-0))] bg-white/5 hover:bg-white/10',

    // Chips / inputs
    'chip':          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-[rgba(0,229,255,0.35)] text-[#a5f3fc] bg-[rgba(0,229,255,0.10)]',
    'input':         'w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[rgb(var(--text-0))] placeholder:text-[rgb(var(--text-1))] focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--raynu-cyan))]',
    'select':        'rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-[rgb(var(--text-0))] focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--raynu-cyan))]',
    'textarea':      'w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[rgb(var(--text-0))] placeholder:text-[rgb(var(--text-1))] focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--raynu-cyan))]',

    // Tablas
    'table-base':    'min-w-full text-sm',
  },
  safelist: [
    // clases que usas en strings dinámicos
    'text-[rgb(var(--text-0))]','text-[rgb(var(--text-1))]',
    'bg-black/60','backdrop-blur','border-b','border-white/10','fixed','top-0','inset-x-0','z-50',
  ],
})
