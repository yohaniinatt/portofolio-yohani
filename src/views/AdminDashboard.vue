<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-8">
    <div class="max-w-5xl mx-auto space-y-12">
      <header class="flex justify-between items-center border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold">Dashboard Admin</h1>
        <router-link to="/" class="text-sm text-blue-400 hover:underline">← Kembali ke Website</router-link>
      </header>

      <!-- Panel Tulis Artikel -->
      <section class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <h2 class="text-xl font-bold text-white">➕ Tulis Artikel Baru</h2>
        <form @submit.prevent="postArticle" class="space-y-4">
          <input v-model="newTitle" required placeholder="Judul Artikel" class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white">
          <textarea v-model="newContent" required rows="4" placeholder="Isi artikel..." class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"></textarea>
          <button type="submit" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium text-white">Publish Artikel</button>
        </form>
      </section>

      <!-- Panel Pesan Masuk dari Form Kontak -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white">📥 Pesan Masuk Dari Pengunjung</h2>
        <div v-if="messages.length === 0" class="text-slate-500 text-sm">Belum ada pesan masuk.</div>
        <div class="grid gap-4">
          <div v-for="msg in messages" :key="msg.id" class="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <div class="flex justify-between text-xs text-slate-400 mb-2">
              <span class="font-bold text-blue-400">{{ msg.name }} ({{ msg.email }})</span>
              <span>{{ new Date(msg.created_at).toLocaleDateString() }}</span>
            </div>
            <p class="text-slate-300 text-sm">{{ msg.message }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const messages = ref([])
const newTitle = ref('')
const newContent = ref('')

const fetchMessages = async () => {
  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
  messages.value = data || []
}

const postArticle = async () => {
  const { error } = await supabase.from('articles').insert([{ title: newTitle.value, content: newContent.value }])
  if (!error) {
    alert('Artikel Berhasil Diterbitkan!')
    newTitle.value = ''
    newContent.value = ''
  }
}

onMounted(() => {
  fetchMessages()
})
</script>