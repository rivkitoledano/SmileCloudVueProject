<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">


    <main class="flex-1 flex justify-center items-start p-6">
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <!-- Router Outlet -->
        <router-view />
      </div>
    </main>


  </div>
</template>

<script setup lang="ts">
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl; 
}
</style>
