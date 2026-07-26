<template>
  <div class="min-h-screen bg-[#F4F7F9] text-[#2C3E50] font-sans">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-[#F4F7F9]/80 backdrop-blur-md border-b border-[#D0DCE5]">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold tracking-tight text-[#1A365D]">Yohani<span class="text-[#4A7C59]">.dev</span></h1>
        <div class="space-x-6 text-sm font-medium">
          <a href="#about" class="hover:text-[#3B82F6] transition">Tentang</a>
          <a href="#projects" class="hover:text-[#3B82F6] transition">Proyek</a>
          <a href="#contact" class="hover:text-[#3B82F6] transition">Kontak</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="about" class="max-w-5xl mx-auto px-6 py-20 text-center md:text-left md:flex items-center justify-between">
      <div class="md:w-1/2 space-y-6">
        <span class="px-3 py-1 bg-[#E1EBF5] text-[#2B6CB0] rounded-full text-xs font-semibold tracking-wide">
          👋 Halo, Selamat Datang!
        </span>
        <h2 class="text-4xl md:text-5xl font-extrabold text-[#1A365D] leading-tight">
          Web Developer & Creative Thinker.
        </h2>
        <p class="text-[#5A6B7C] text-lg leading-relaxed">
          Saya suka membangun aplikasi web yang bersih, responsif, dan nyaman digunakan dengan nuansa estetika yang hangat.
        </p>
        <div class="flex gap-4 justify-center md:justify-start">
          <a href="#contact" class="px-6 py-3 bg-[#2B6CB0] text-white font-medium rounded-xl shadow-sm hover:bg-[#1C4ED8] transition">
            Hubungi Saya
          </a>
          <a href="#projects" class="px-6 py-3 bg-white text-[#2B6CB0] border border-[#D0DCE5] font-medium rounded-xl hover:bg-[#E1EBF5] transition">
            Lihat Karya
          </a>
        </div>
      </div>
      <div class="md:w-1/3 mt-10 md:mt-0 flex justify-center">
        <div class="w-64 h-64 bg-gradient-to-tr from-[#93C5FD] to-[#3B82F6] rounded-3xl shadow-lg transform rotate-3 hover:rotate-0 transition duration-300 flex items-center justify-center text-white text-6xl">
          💻
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-16 bg-[#EBF2F7]">
      <div class="max-w-5xl mx-auto px-6">
        <h3 class="text-2xl font-bold text-[#1A365D] text-center mb-10">Proyek Pilihan</h3>
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Card Proyek 1 -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-[#D0DCE5] hover:shadow-md transition">
            <div class="h-40 bg-[#D9E6F2] rounded-xl mb-4 flex items-center justify-center text-3xl">🚀</div>
            <h4 class="text-xl font-bold text-[#1A365D] mb-2">Aplikasi Portofolio</h4>
            <p class="text-[#5A6B7C] text-sm mb-4">Dibuat menggunakan Vue 3, Tailwind CSS, dan dikoneksikan ke database Supabase.</p>
            <div class="flex gap-2">
              <span class="text-xs px-2.5 py-1 bg-[#E1EBF5] text-[#2B6CB0] rounded-md font-medium">Vue.js</span>
              <span class="text-xs px-2.5 py-1 bg-[#E1EBF5] text-[#2B6CB0] rounded-md font-medium">Tailwind</span>
            </div>
          </div>
          <!-- Card Proyek 2 -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-[#D0DCE5] hover:shadow-md transition">
            <div class="h-40 bg-[#D9E6F2] rounded-xl mb-4 flex items-center justify-center text-3xl">☕</div>
            <h4 class="text-xl font-bold text-[#1A365D] mb-2">Cozy Management System</h4>
            <p class="text-[#5A6B7C] text-sm mb-4">Sistem manajemen inventaris dan pesanan ringan untuk kedai kopi lokal.</p>
            <div class="flex gap-2">
              <span class="text-xs px-2.5 py-1 bg-[#E1EBF5] text-[#2B6CB0] rounded-md font-medium">Supabase</span>
              <span class="text-xs px-2.5 py-1 bg-[#E1EBF5] text-[#2B6CB0] rounded-md font-medium">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form (Terkoneksi ke Supabase) -->
    <section id="contact" class="max-w-3xl mx-auto px-6 py-20">
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-[#D0DCE5]">
        <h3 class="text-2xl font-bold text-[#1A365D] mb-2 text-center">Kirim Pesan</h3>
        <p class="text-center text-[#5A6B7C] text-sm mb-8">Ada pertanyaan atau mau bekerja sama? Silakan isi form di bawah.</p>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-[#2C3E50] mb-1">Nama</label>
            <input v-model="form.name" required type="text" placeholder="Nama Anda" class="w-full px-4 py-3 rounded-xl border border-[#D0DCE5] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/50 bg-[#F8FAFC]">
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2C3E50] mb-1">Email</label>
            <input v-model="form.email" required type="email" placeholder="email@contoh.com" class="w-full px-4 py-3 rounded-xl border border-[#D0DCE5] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/50 bg-[#F8FAFC]">
          </div>
          <div>
            <label class="block text-sm font-medium text-[#2C3E50] mb-1">Pesan</label>
            <textarea v-model="form.message" required rows="4" placeholder="Tuliskan pesan Anda..." class="w-full px-4 py-3 rounded-xl border border-[#D0DCE5] focus:outline-none focus:ring-2 focus:ring-[#2B6CB0]/50 bg-[#F8FAFC]"></textarea>
          </div>
          
          <button :disabled="loading" type="submit" class="w-full py-3 bg-[#2B6CB0] hover:bg-[#1C4ED8] text-white font-medium rounded-xl transition shadow-sm disabled:opacity-50">
            {{ loading ? 'Sending...' : 'Kirim Pesan' }}
          </button>
        </form>

        <p v-if="statusMessage" :class="statusSuccess ? 'text-green-600' : 'text-red-600'" class="mt-4 text-center text-sm font-medium">
          {{ statusMessage }}
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-[#D0DCE5] py-6 text-center text-xs text-[#718096]">
      © 2026 Yohani. Built with Vue 3 & Tailwind CSS.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from './lib/supabaseClient'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const statusMessage = ref('')
const statusSuccess = ref(true)

const handleSubmit = async () => {
  loading.value = true
  statusMessage.value = ''

  try {
    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          name: form.value.name, 
          email: form.value.email, 
          message: form.value.message 
        }
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