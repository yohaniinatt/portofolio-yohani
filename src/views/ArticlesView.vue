<template>
  <main class="max-w-4xl mx-auto px-6 py-12 space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold text-white">Artikel & Catatan</h1>
      <p class="text-slate-400 text-sm">Berbagi ide, pemikiran, dan tutorial seputar web development.</p>
    </div>

    <!-- State Loading -->
    <div v-if="loading" class="text-center py-12 text-slate-500">
      Mengecek artikel...
    </div>

    <!-- Jika Artikel Kosong -->
    <div v-else-if="articles.length === 0" class="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/60 text-slate-400 text-sm">
      Belum ada artikel yang dipublikasikan.
    </div>

    <!-- Daftar Artikel -->
    <div v-else class="space-y-6">
      <article v-for="item in articles" :key="item.id" class="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-3 hover:border-blue-500/40 transition">
        <span class="text-xs text-blue-400 font-mono">{{ new Date(item.created_at).toLocaleDateString() }}</span>
        <h2 class="text-xl font-bold text-white">{{ item.title }}</h2>
        <p class="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{{ item.content }}</p>
      </article>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    if (!error) articles.value = data || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>