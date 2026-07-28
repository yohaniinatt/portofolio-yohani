<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo Website -->
      <router-link to="/" class="text-xl font-bold text-slate-900 flex items-center gap-1">
        Yohani<span class="text-blue-600 font-extrabold">.dev</span>
      </router-link>

      <!-- Menu Desktop -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <router-link to="/" class="hover:text-blue-600 transition-colors" active-class="text-blue-600 font-bold">Tentang</router-link>
        <router-link to="/artikel" class="hover:text-blue-600 transition-colors" active-class="text-blue-600 font-bold">Artikel</router-link>
        <router-link to="/kontak" class="hover:text-blue-600 transition-colors" active-class="text-blue-600 font-bold">Kontak</router-link>

        <!-- Area Login / Dashboard -->
        <div class="pl-2 border-l border-slate-200 flex items-center gap-3">
          <!-- Tombol Gembok jika BELUM Login -->
          <router-link 
            v-if="!isLoggedIn" 
            to="/secret-login" 
            class="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Login Admin"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a5 5 0 00-10 0v4"/>
            </svg>
          </router-link>

          <!-- Status jika SUDAH Login -->
          <template v-else>
            <router-link 
              to="/admin" 
              class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-sm"
            >
              ⚡ Dashboard
            </router-link>
            <button 
              @click="handleLogout" 
              class="text-xs text-rose-500 hover:text-rose-700 font-medium transition"
            >
              Logout
            </button>
          </template>
        </div>
      </div>

      <!-- Tombol Mobile (Gembok + Hamburger) -->
      <div class="flex items-center gap-2 md:hidden">
        <router-link 
          v-if="!isLoggedIn" 
          to="/secret-login" 
          class="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition"
          title="Login Admin"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a5 5 0 00-10 0v4"/>
          </svg>
        </router-link>

        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen" 
          class="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition focus:outline-none"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Dropdown Mobile -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
      <router-link @click="isMobileMenuOpen = false" to="/" class="block py-2 text-slate-700 font-medium hover:text-blue-600 border-b border-slate-100">Tentang</router-link>
      <router-link @click="isMobileMenuOpen = false" to="/artikel" class="block py-2 text-slate-700 font-medium hover:text-blue-600 border-b border-slate-100">Artikel</router-link>
      <router-link @click="isMobileMenuOpen = false" to="/kontak" class="block py-2 text-slate-700 font-medium hover:text-blue-600 border-b border-slate-100">Kontak</router-link>

      <div v-if="isLoggedIn" class="pt-2 space-y-2">
        <router-link @click="isMobileMenuOpen = false" to="/admin" class="block w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm">⚡ Dashboard Admin</router-link>
        <button @click="handleLogout" class="block w-full text-center py-2 rounded-xl text-rose-500 font-medium text-xs">Logout</button>
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