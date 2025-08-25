<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">הזנת נקודות</h1>
    <form @submit.prevent="goToDisplay">
      <div 
        v-for="(point, index) in points" 
        :key="index" 
        class="mb-3 flex items-center space-x-2 rtl:space-x-reverse"
      >
        <label class="w-20 font-semibold">נקודה {{ index + 1 }}</label>
        <input
          v-model.number="point.x"
          type="number"
          placeholder="X"
          class="border p-1 w-20 text-center rounded"
        />
        <input
          v-model.number="point.y"
          type="number"
          placeholder="Y"
          class="border p-1 w-20 text-center rounded"
        />
      </div>

      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
      >
        הצג משולש
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const points = reactive([
  { x: 100, y: 100 },
  { x: 300, y: 100 },
  { x: 200, y: 300 },
]);

function goToDisplay() {
  router.push({
    name: "display",
    query: {
      p1: `${points[0].x},${points[0].y}`,
      p2: `${points[1].x},${points[1].y}`,
      p3: `${points[2].x},${points[2].y}`,
    },
  });
}
</script>
