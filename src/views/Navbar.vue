<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      
      <!-- Logo Website -->
      <router-link to="/" class="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-1.5">
        Yohani<span class="text-blue-600 font-extrabold">.dev</span>
      </router-link>

      <!-- Menu Desktop & Tablet (Layar Medium / md: flex) -->
      <div class="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-600">
        <router-link to="/" class="hover:text-blue-600 transition-colors" active-class="text-blue-600 font-bold">Home</router-link>
        <router-link to="/artikel" class="hover:text-blue-600 transition-colors" active-class="text-blue-600 font-bold">Artikel</router-link>
        <router-link to="/kontak" class="hover:text-blue-600 transition-colors" active-class="text-blue-600 font-bold">Kontak</router-link>

        <!-- TOMBOL LOGIN MENTOK KANAN (Sangat Jelas & Mencolok!) -->
        <div class="pl-2 border-l border-slate-200">
          <router-link 
            v-if="!isLoggedIn" 
            to="/secret-login" 
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <span>🔑</span> Login Admin
          </router-link>

          <div v-else class="flex items-center gap-2">
            <router-link to="/admin" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs text-white shadow-sm">
              ⚡ Dashboard
            </router-link>
            <button @click="handleLogout" class="text-xs text-rose-500 hover:text-rose-700 font-medium px-2 py-1">
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Tombol Hamburger (Khusus Layar HP & Tablet Kecil) -->
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen" 
        class="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Menu Dropdown Khusus Tampilan Mobile/HP & Tablet -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
      <router-link @click="isMobileMenuOpen = false" to="/" class="block py-2 text-slate-700 font-medium hover:text-blue-600 border-b border-slate-100">🏠 Home</router-link>
      <router-link @click="isMobileMenuOpen = false" to="/artikel" class="block py-2 text-slate-700 font-medium hover:text-blue-600 border-b border-slate-100">📝 Artikel</router-link>
      <router-link @click="isMobileMenuOpen = false" to="/kontak" class="block py-2 text-slate-700 font-medium hover:text-blue-600 border-b border-slate-100">💬 Kontak</router-link>

      <div class="pt-2">
        <router-link 
          v-if="!isLoggedIn" 
          @click="isMobileMenuOpen = false" 
          to="/secret-login" 
          class="block w-full text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20"
        >
          🔑 Login Admin
        </router-link>
        <div v-else class="space-y-2">
          <router-link @click="isMobileMenuOpen = false" to="/admin" class="block w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm">⚡ Dashboard Admin</router-link>
          <button @click="handleLogout" class="block w-full text-center py-2 rounded-xl text-rose-500 font-medium text-xs">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const isLoggedIn = ref(false)
const isMobileMenuOpen = ref(false)

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isLoggedIn.value = !!session
  supabase.auth.onAuthStateChange((_event, session) => {
    isLoggedIn.value = !!session
  })
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  isMobileMenuOpen.value = false
  router.push('/')
}
</script>