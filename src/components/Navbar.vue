<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo dengan Klik Rahasia 3x -->
      <div 
        @click="handleSecretClick" 
        class="cursor-pointer select-none text-xl font-bold text-slate-900 flex items-center gap-1.5"
      >
        Yohani<span class="text-blue-600 font-extrabold">.dev</span>
      </div>

      <!-- Menu Desktop -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <router-link to="/" class="hover:text-blue-600 transition-colors">Tentang</router-link>
        <router-link to="/artikel" class="hover:text-blue-600 transition-colors">Artikel</router-link>
        <router-link to="/kontak" class="hover:text-blue-600 transition-colors">Kontak</router-link>

        <template v-if="isLoggedIn">
          <router-link to="/admin" class="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm shadow-blue-500/20">Dashboard</router-link>
          <button @click="handleLogout" class="text-slate-400 hover:text-rose-500 transition">Logout</button>
        </template>

        <router-link 
          v-else-if="showSecretLogin" 
          to="/secret-login" 
          class="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-blue-600 hover:bg-slate-200 font-semibold text-xs animate-bounce"
        >
          🔑 Admin Login
        </router-link>
      </div>

      <!-- Tombol Hamburger Mobile -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-slate-600 hover:text-blue-600 p-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Dropdown Menu Mobile -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-3 text-sm">
      <router-link @click="isMobileMenuOpen = false" to="/" class="block text-slate-600 hover:text-blue-600 font-medium">Tentang</router-link>
      <router-link @click="isMobileMenuOpen = false" to="/artikel" class="block text-slate-600 hover:text-blue-600 font-medium">Artikel</router-link>
      <router-link @click="isMobileMenuOpen = false" to="/kontak" class="block text-slate-600 hover:text-blue-600 font-medium">Kontak</router-link>

      <template v-if="isLoggedIn">
        <router-link @click="isMobileMenuOpen = false" to="/admin" class="block text-blue-600 font-bold">Dashboard Admin</router-link>
        <button @click="handleLogout" class="block text-rose-500">Logout</button>
      </template>

      <router-link 
        v-else-if="showSecretLogin" 
        @click="isMobileMenuOpen = false"
        to="/secret-login" 
        class="inline-block px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-blue-600 font-semibold text-xs"
      >
        🔑 Admin Login
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const isLoggedIn = ref(false)
const showSecretLogin = ref(false)
const isMobileMenuOpen = ref(false)
let clickCount = 0
let clickTimer = null

const handleSecretClick = () => {
  clickCount++
  if (clickCount === 3) {
    showSecretLogin.value = !showSecretLogin.value
    clickCount = 0
    clearTimeout(clickTimer)
  } else {
    clearTimeout(clickTimer)
    clickTimer = setTimeout(() => { clickCount = 0 }, 1000)
  }
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isLoggedIn.value = !!session
  supabase.auth.onAuthStateChange((_event, session) => { isLoggedIn.value = !!session })
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  showSecretLogin.value = false
  isMobileMenuOpen.value = false
  router.push('/')
}
</script>