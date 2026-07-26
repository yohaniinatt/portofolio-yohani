<template>
  <main class="max-w-xl mx-auto px-6 py-16">
    <div class="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Hubungi Saya</h1>
        <p class="text-slate-500 text-sm">Ada pertanyaan atau mau bekerja sama? Silakan isi form di bawah.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-700">Nama</label>
          <input 
            v-model="form.name" 
            required 
            type="text" 
            placeholder="Masukkan nama Anda" 
            class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
          >
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-700">Email</label>
          <input 
            v-model="form.email" 
            required 
            type="email" 
            placeholder="nama@email.com" 
            class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
          >
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-700">Pesan</label>
          <textarea 
            v-model="form.message" 
            required 
            rows="4" 
            placeholder="Tuliskan pesan Anda..." 
            class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm resize-none"
          ></textarea>
        </div>

        <button 
          :disabled="loading" 
          type="submit" 
          class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-md shadow-blue-500/20 disabled:opacity-50 active:scale-95"
        >
          {{ loading ? 'Mengirim Pesan...' : 'Kirim Pesan' }}
        </button>
      </form>

      <p 
        v-if="statusMessage" 
        :class="statusSuccess ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-rose-600 bg-rose-50 border-rose-200'" 
        class="p-3 rounded-xl border text-center text-xs font-medium"
      >
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
    const { error } = await supabase.from('messages').insert([
      { name: form.value.name, email: form.value.email, message: form.value.message }
    ])
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