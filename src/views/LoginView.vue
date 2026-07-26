<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100 font-sans">
    <div class="w-full max-w-md bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6">
      
      <!-- Header Login -->
      <div class="text-center space-y-2">
        <div class="w-12 h-12 bg-blue-950/80 border border-blue-800/50 rounded-2xl flex items-center justify-center mx-auto text-2xl">
          🔒
        </div>
        <h2 class="text-2xl font-bold text-white tracking-tight">Portal Admin</h2>
        <p class="text-xs text-slate-400">Silakan masuk menggunakan kredensial Supabase Anda.</p>
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1">
          <label class="text-xs font-medium text-slate-300">Email Admin</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            placeholder="admin@yohani.dev" 
            class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
          >
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-slate-300">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
          >
        </div>

        <button 
          :disabled="loading" 
          type="submit" 
          class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-medium text-sm transition shadow-lg shadow-blue-600/20 disabled:opacity-50 mt-2"
        >
          {{ loading ? 'Memeriksa Kredensial...' : 'Masuk Dashboard' }}
        </button>
      </form>

      <!-- Pesan Error -->
      <p v-if="errorMsg" class="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-400 text-center text-xs font-medium">
        {{ errorMsg }}
      </p>

      <div class="text-center pt-2">
        <router-link to="/" class="text-xs text-slate-500 hover:text-slate-300 transition">
          ← Kembali ke Beranda
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    // Berhasil Login -> Buka Dashboard Admin
    router.push('/admin')
  } catch (err) {
    errorMsg.value = 'Akses ditolak: Email atau password salah!'
  } finally {
    loading.value = false
  }
}
</script>