<template>
  <main class="max-w-xl mx-auto px-6 py-12">
    <div class="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 shadow-xl backdrop-blur-sm space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold text-white">Hubungi Saya</h1>
        <p class="text-slate-400 text-sm">Ada pertanyaan atau mau bekerja sama? Silakan isi form di bawah.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-1">
          <label class="text-xs font-medium text-slate-300">Nama</label>
          <input v-model="form.name" required type="text" placeholder="Masukkan nama Anda" class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition text-sm">
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-slate-300">Email</label>
          <input v-model="form.email" required type="email" placeholder="nama@email.com" class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition text-sm">
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-slate-300">Pesan</label>
          <textarea v-model="form.message" required rows="4" placeholder="Tuliskan pesan Anda..." class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition text-sm resize-none"></textarea>
        </div>

        <button :disabled="loading" type="submit" class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-lg shadow-blue-600/20 disabled:opacity-50">
          {{ loading ? 'Mengirim Pesan...' : 'Kirim Pesan' }}
        </button>
      </form>

      <p v-if="statusMessage" :class="statusSuccess ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50' : 'text-rose-400 bg-rose-950/40 border-rose-800/50'" class="p-3 rounded-xl border text-center text-xs font-medium">
        {{ statusMessage }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const form = ref({ name: '', email: '', message: '' })
const loading = ref(false)
const statusMessage = ref('')
const statusSuccess = ref(true)

const handleSubmit = async () => {
  loading.value = true
  statusMessage.value = ''
  try {
    const { error } = await supabase.from('messages').insert([{ name: form.value.name, email: form.value.email, message: form.value.message }])
    if (error) throw error
    statusSuccess.value = true
    statusMessage.value = 'Pesan Anda berhasil terkirim! Terima kasih.'
    form.value = { name: '', email: '', message: '' }
  } catch (err) {
    statusSuccess.value = false
    statusMessage.value = 'Gagal mengirim pesan: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>