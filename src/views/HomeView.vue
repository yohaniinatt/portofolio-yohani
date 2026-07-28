<template>
  <main class="max-w-5xl mx-auto px-6 space-y-24 py-12">
    <!-- Hero Section (Dinamis dari Supabase) -->
    <section class="pt-8 md:pt-16 flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="flex-1 space-y-6 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold shadow-sm">
          <span>✨</span> {{ hero.welcome_badge || 'Halo, Selamat Datang!' }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          {{ hero.title_main || 'Web Developer &' }} <br class="hidden sm:inline" />
          <span class="text-blue-600">{{ hero.title_highlight || 'Creative Thinker.' }}</span>
        </h1>
        <p class="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
          {{ hero.description || 'Saya suka membangun aplikasi web yang bersih, responsif, dan nyaman digunakan dengan nuansa estetika yang hangat.' }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
          <router-link to="/kontak" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20 active:scale-95">
            Hubungi Saya
          </router-link>
          <a href="#projects" class="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-sm transition-all shadow-sm active:scale-95">
            Lihat Karya
          </a>
        </div>
      </div>

      <!-- Card Illustration -->
      <div class="relative">
        <div class="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl p-6 flex items-center justify-center shadow-xl shadow-blue-500/15 transform rotate-3 hover:rotate-0 transition duration-300">
          <div class="text-7xl drop-shadow-md">💻</div>
        </div>
      </div>
    </section>

    <!-- Proyek Pilihan Section (Dinamis dari Supabase) -->
    <section id="projects" class="space-y-8 pt-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Proyek Pilihan</h2>
        <p class="text-slate-500 text-sm">Beberapa karya terbaik yang pernah saya buat.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="proj in projects" :key="proj.id" class="bg-white border border-slate-200/80 rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
          <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl">
            {{ proj.icon }}
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-slate-900">{{ proj.title }}</h3>
            <p class="text-slate-600 text-sm leading-relaxed">{{ proj.description }}</p>
          </div>
          <div class="flex flex-wrap gap-2 pt-2">
            <span v-for="tag in proj.tags" :key="tag" class="px-3 py-1 rounded-lg bg-blue-50 text-xs font-semibold text-blue-600">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const hero = ref({})
const projects = ref([])

onMounted(async () => {
  // Ambil teks Hero dari database
  const { data: heroData } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  if (heroData) hero.value = heroData

  // Ambil daftar Proyek dari database
  const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: true })
  if (projData) projects.value = projData
})
</script>