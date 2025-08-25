<template>
  <div class="p-6 flex flex-col items-center">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">תצוגת המשולש</h2>
    
    <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {{ error }}
    </div>
    
    <div v-else class="space-y-6">
      <div class="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-lg">
        <svg width="800" height="600" class="w-full max-w-4xl">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <polygon
            :points="`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`"
            fill="rgba(59, 130, 246, 0.2)"
            stroke="rgb(59, 130, 246)"
            stroke-width="3"
          />
          
          <path
            v-for="(arc, index) in arcs"
            :key="index"
            :d="arc"
            stroke="rgb(239, 68, 68)"
            stroke-width="2.5"
            fill="transparent"
          />
          
          <circle
            v-for="(point, index) in [p1, p2, p3]"
            :key="'point-' + index"
            :cx="point.x"
            :cy="point.y"
            r="6"
            fill="rgb(59, 130, 246)"
            stroke="white"
            stroke-width="2"
          />
          
          <text
            v-for="(point, index) in [p1, p2, p3]"
            :key="'label-' + index"
            :x="point.x"
            :y="point.y - 15"
            class="text-sm font-bold"
            fill="rgb(55, 65, 81)"
            text-anchor="middle"
          >
            {{ String.fromCharCode(65 + index) }}
          </text>
          
          <text
            v-for="(angle, index) in [angles.a, angles.b, angles.c]"
            :key="'angle-' + index"
            :x="optimizedAnglePositions[index].x"
            :y="optimizedAnglePositions[index].y"
            class="text-lg font-bold"
            fill="rgb(239, 68, 68)"
            text-anchor="middle"
          >
            {{ angle.toFixed(1) }}°
          </text>
        </svg>
      </div>
    </div>
    
    <button
      class="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg transform transition duration-150 hover:scale-105"
      @click="goBack"
    >
      חזור להזנת נקודות
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { calculateAngles, calculateAngleLabelPosition, areCollinear } from "../utils/triangleUtils";
import type { Point } from "../utils/types";

const route = useRoute();
const router = useRouter();
const error = ref<string>("");

function parsePoint(q: string | undefined): Point {
  if (!q) return { x: 100, y: 100 };
  const [x, y] = q.split(",").map(Number);
  return { x, y };
}

const p1 = parsePoint(route.query.p1 as string);
const p2 = parsePoint(route.query.p2 as string);
const p3 = parsePoint(route.query.p3 as string);

const angles = computed(() => {
  try {
    error.value = "";
    return calculateAngles(p1, p2, p3);
  } catch (e) {
    error.value = (e as Error).message;
    return { a: 0, b: 0, c: 0 };
  }
});

const optimizedAnglePositions = computed(() => [
  calculateAngleLabelPosition(p1, p2, p3),
  calculateAngleLabelPosition(p2, p1, p3),
  calculateAngleLabelPosition(p3, p1, p2),
]);

function createArcVertex(vertex: Point, pA: Point, pB: Point) {
  const radius = 30;
  const v1 = { x: pA.x - vertex.x, y: pA.y - vertex.y };
  const v2 = { x: pB.x - vertex.x, y: pB.y - vertex.y };
  const len1 = Math.hypot(v1.x, v1.y);
  const len2 = Math.hypot(v2.x, v2.y);
  
  if (len1 === 0 || len2 === 0) return "";
  
  const u1 = { x: (v1.x / len1) * radius, y: (v1.y / len1) * radius };
  const u2 = { x: (v2.x / len2) * radius, y: (v2.y / len2) * radius };
  const startX = vertex.x + u1.x;
  const startY = vertex.y + u1.y;
  const endX = vertex.x + u2.x;
  const endY = vertex.y + u2.y;
  const cross = v1.x * v2.y - v1.y * v2.x;
  const sweepFlag = cross > 0 ? 1 : 0;
  return `M${startX},${startY} A${radius},${radius} 0 0,${sweepFlag} ${endX},${endY}`;
}

const arcs = computed(() => {
  if (error.value) return [];
  return [
    createArcVertex(p1, p2, p3),
    createArcVertex(p2, p1, p3),
    createArcVertex(p3, p1, p2),
  ];
});

function goBack() {
  router.push({ name: "input" });
}
</script>

<style scoped>
svg {
  background-color: #fefefe;
}
</style>