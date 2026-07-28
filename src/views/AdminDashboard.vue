<template>
  <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
    <!-- Header Dashboard -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">⚡ Dashboard Admin</h1>
        <p class="text-xs text-slate-500">Kelola konten website dan lihat pesan dari pengunjung.</p>
      </div>
      <!-- Tab Menu -->
      <div class="flex flex-wrap gap-2">
        <button @click="activeTab = 'hero'" :class="activeTab === 'hero' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'" class="px-4 py-2 rounded-xl text-xs font-semibold transition">🏠 Hero Web</button>
        <button @click="activeTab = 'projects'" :class="activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'" class="px-4 py-2 rounded-xl text-xs font-semibold transition">🚀 Proyek</button>
        <button @click="activeTab = 'messages'" :class="activeTab === 'messages' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'" class="px-4 py-2 rounded-xl text-xs font-semibold transition">💬 Pesan Masuk</button>
        <button @click="activeTab = 'articles'" :class="activeTab === 'articles' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'" class="px-4 py-2 rounded-xl text-xs font-semibold transition">📝 Artikel</button>
      </div>
    </div>

    <!-- TAB 1: EDIT HERO WEB -->
    <div v-if="activeTab === 'hero'" class="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
      <h2 class="text-lg font-bold text-slate-900">Ubah Teks Halaman Depan (Hero Section)</h2>
      <form @submit.prevent="saveHeroSettings" class="space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-700">Badge (Tulisan Kecil di Atas)</label>
          <input v-model="heroForm.welcome_badge" required type="text" class="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600">
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-700">Judul Utama (Warna Hitam)</label>
            <input v-model="heroForm.title_main" required type="text" class="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600">
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-700">Judul Highlight (Warna Biru)</label>
            <input v-model="heroForm.title_highlight" required type="text" class="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600">
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-700">Deskripsi Singkat</label>
          <textarea v-model="heroForm.description" required rows="3" class="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600 resize-none"></textarea>
        </div>
        <button :disabled="loading" type="submit" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm disabled:opacity-50">
          {{ loading ? 'Menyimpan...' : 'Simpan Perubahan Hero' }}
        </button>
      </form>
    </div>

    <!-- TAB 2: KELOLA PROYEK -->
    <div v-if="activeTab === 'projects'" class="space-y-6">
      <div class="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
        <h3 class="font-bold text-slate-900">+ Tambah Proyek Baru</h3>
        <form @submit.prevent="addProject" class="space-y-4">
          <div class="grid sm:grid-cols-3 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-700">Icon Emoji</label>
              <input v-model="projectForm.icon" required type="text" placeholder="🚀 / ☕ / 💻" class="w-full mt-1 px-4 py-2 rounded-xl bg-slate-50 border text-sm">
            </div>
            <div class="sm:col-span-2">
              <label class="text-xs font-semibold text-slate-700">Nama Proyek</label>
              <input v-model="projectForm.title" required type="text" placeholder="Nama Aplikasi..." class="w-full mt-1 px-4 py-2 rounded-xl bg-slate-50 border text-sm">
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-700">Deskripsi Proyek</label>
            <input v-model="projectForm.description" required type="text" placeholder="Penjelasan singkat..." class="w-full mt-1 px-4 py-2 rounded-xl bg-slate-50 border text-sm">
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-700">Tags Teknologi (Pisahkan dengan koma)</label>
            <input v-model="projectForm.tags" required type="text" placeholder="Vue.js, Tailwind, Supabase" class="w-full mt-1 px-4 py-2 rounded-xl bg-slate-50 border text-sm">
          </div>
          <button :disabled="loading" type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition">
            Tambah Proyek
          </button>
        </form>
      </div>

      <!-- Daftar Proyek -->
      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="item in projects" :key="item.id" class="bg-white border p-6 rounded-2xl flex justify-between items-start gap-4 shadow-sm">
          <div class="space-y-1">
            <div class="text-2xl">{{ item.icon }}</div>
            <h4 class="font-bold text-slate-900">{{ item.title }}</h4>
            <p class="text-xs text-slate-600">{{ item.description }}</p>
            <div class="flex gap-1 pt-1">
              <span v-for="t in item.tags" :key="t" class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{{ t }}</span>
            </div>
          </div>
          <button @click="deleteProject(item.id)" class="text-rose-500 hover:text-rose-700 text-xs font-semibold">Hapus</button>
        </div>
      </div>
    </div>

    <!-- TAB 3: PESAN MASUK -->
    <div v-if="activeTab === 'messages'" class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900">Kotak Masuk ({{ messages.length }} Pesan)</h2>
      <div v-if="messages.length === 0" class="bg-white p-8 rounded-3xl border text-center text-slate-400 text-sm">Belum ada pesan masuk.</div>
      <div v-for="msg in messages" :key="msg.id" class="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-slate-900">{{ msg.name }}</h3>
            <p class="text-xs text-blue-600">{{ msg.email }}</p>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">{{ new Date(msg.created_at).toLocaleDateString() }}</span>
        </div>
        <p class="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{{ msg.message }}</p>
        <button @click="deleteMessage(msg.id)" class="text-xs text-rose-500 hover:underline">Hapus Pesan</button>
      </div>
    </div>

    <!-- TAB 4: KELOLA ARTIKEL -->
    <div v-if="activeTab === 'articles'" class="space-y-6">
      <div class="bg-white border p-6 rounded-3xl shadow-sm space-y-4">
        <h3 class="font-bold text-slate-900">+ Tulis Artikel Baru</h3>
        <form @submit.prevent="addArticle" class="space-y-3">
          <input v-model="articleForm.title" required type="text" placeholder="Judul Artikel..." class="w-full px-4 py-2 rounded-xl bg-slate-50 border text-sm">
          <textarea v-model="articleForm.content" required rows="4" placeholder="Isi artikel..." class="w-full px-4 py-2 rounded-xl bg-slate-50 border text-sm resize-none"></textarea>
          <button :disabled="loading" type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl">Publikasikan Artikel</button>
        </form>
      </div>
      <div class="space-y-3">
        <div v-for="art in articles" :key="art.id" class="bg-white border p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h4 class="font-bold text-sm text-slate-900">{{ art.title }}</h4>
            <span class="text-xs text-slate-400">{{ new Date(art.created_at).toLocaleDateString() }}</span>
          </div>
          <button @click="deleteArticle(art.id)" class="text-rose-500 hover:underline text-xs">Hapus</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const activeTab = ref('hero')
const loading = ref(false)

// Data state
const heroForm = ref({ welcome_badge: '', title_main: '', title_highlight: '', description: '' })
const projects = ref([])
const projectForm = ref({ icon: '', title: '', description: '', tags: '' })
const messages = ref([])
const articles = ref([])
const articleForm = ref({ title: '', content: '' })

// Fetch Semua Data Saat Admin Buka Dashboard
const fetchData = async () => {
  // 1. Ambil data Hero
  const { data: hero } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  if (hero) heroForm.value = hero

  // 2. Ambil Proyek
  const { data: proj } = await supabase.from('projects').select('*').order('created_at', { ascending: true })
  if (proj) projects.value = proj

  // 3. Ambil Pesan
  const { data: msg } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
  if (msg) messages.value = msg

  // 4. Ambil Artikel
  const { data: art } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
  if (art) articles.value = art
}

onMounted(fetchData)

// Action: Simpan Hero
const saveHeroSettings = async () => {
  loading.value = true
  await supabase.from('site_settings').update({
    welcome_badge: heroForm.value.welcome_badge,
    title_main: heroForm.value.title_main,
    title_highlight: heroForm.value.title_highlight,
    description: heroForm.value.description
  }).eq('id', 1)
  loading.value = false
  alert('Berhasil! Halaman depan sudah diperbarui.')
}

// Action: Proyek
const addProject = async () => {
  loading.value = true
  const tagsArray = projectForm.value.tags.split(',').map(tag => tag.trim())
  await supabase.from('projects').insert([{
    icon: projectForm.value.icon,
    title: projectForm.value.title,
    description: projectForm.value.description,
    tags: tagsArray
  }])
  projectForm.value = { icon: '', title: '', description: '', tags: '' }
  loading.value = false
  fetchData()
}
const deleteProject = async (id) => {
  if (confirm('Yakin hapus proyek ini?')) {
    await supabase.from('projects').delete().eq('id', id)
    fetchData()
  }
}

// Action: Pesan
const deleteMessage = async (id) => {
  if (confirm('Hapus pesan ini?')) {
    await supabase.from('messages').delete().eq('id', id)
    fetchData()
  }
}

// Action: Artikel
const addArticle = async () => {
  loading.value = true
  await supabase.from('articles').insert([{ title: articleForm.value.title, content: articleForm.value.content }])
  articleForm.value = { title: '', content: '' }
  loading.value = false
  fetchData()
}
const deleteArticle = async (id) => {
  if (confirm('Hapus artikel ini?')) {
    await supabase.from('articles').delete().eq('id', id)
    fetchData()
  }
}
</script>