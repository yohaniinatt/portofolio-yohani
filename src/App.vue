<template>
  <div class="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Tempat Halaman Berganti (Home, Artikel, Kontak) -->
    <div class="flex-grow">
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 font-medium">
      © 2026 Yohani
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>