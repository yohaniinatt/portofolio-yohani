<template>
  <main class="max-w-md mx-auto px-6 py-16">
    <div class="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 text-2xl mb-1">
          🔑
        </div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Login Admin</h1>
        <p class="text-slate-500 text-xs">Masukkan email dan password admin Supabase kamu.</p>
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-700">Email Admin</label>
          <input 
            v-model="email" 
            required 
            type="email" 
            placeholder="admin@email.com" 
            class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
          >
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-700">Password</label>
          <input 
            v-model="password" 
            required 
            type="password" 
            placeholder="••••••••" 
            class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
          >
        </div>

        <button 
          :disabled="loading" 
          type="submit" 
          class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition shadow-md shadow-blue-500/20 disabled:opacity-50 active:scale-95"
        >
          {{ loading ? 'Memproses...' : 'Masuk ke Dashboard' }}
        </button>
      </form>

      <!-- Pesan Error -->
      <p v-if="errorMessage" class="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-center text-xs font-medium">
        {{ errorMessage }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    // Jika login berhasil, redirect langsung ke Dashboard Admin!
    router.push('/admin')
  } catch (err) {
    errorMessage.value = 'Login Gagal: ' + (err.message || 'Email atau password salah.')
  } finally {
    loading.value = false
  }
}
</script>