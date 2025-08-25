import type { Point, Angles } from "./types";

function distance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calculateAngleAtVertex(vertex: Point, p1: Point, p2: Point): number {
  const a = distance(vertex, p1);
  const b = distance(vertex, p2);
  const c = distance(p1, p2);
  
  // Law of Cosines: cos(C) = (a² + b² - c²) / (2ab)
  const cosAngle = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
  
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));
  
  return Math.acos(clampedCos) * (180 / Math.PI);
}


export function calculateAngles(p1: Point, p2: Point, p3: Point): Angles {


  return {
    a: calculateAngleAtVertex(p1, p2, p3), 
    b: calculateAngleAtVertex(p2, p1, p3), 
    c: calculateAngleAtVertex(p3, p1, p2), 
  };
}

export function calculateAngleLabelPosition(vertex: Point, p1: Point, p2: Point, offset: number = 40): Point {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  
  const len1 = Math.hypot(v1.x, v1.y);
  const len2 = Math.hypot(v2.x, v2.y);
  
  if (len1 === 0 || len2 === 0) return vertex;
  
  const u1 = { x: v1.x / len1, y: v1.y / len1 };
  const u2 = { x: v2.x / len2, y: v2.y / len2 };
  
  const avgDirection = { x: (u1.x + u2.x) / 2, y: (u1.y + u2.y) / 2 };
  const avgLen = Math.hypot(avgDirection.x, avgDirection.y);
  
  if (avgLen === 0) return vertex;
  
  const normalizedAvg = { x: avgDirection.x / avgLen, y: avgDirection.y / avgLen };
  
  return {
    x: vertex.x + normalizedAvg.x * offset,
    y: vertex.y + normalizedAvg.y * offset
  };
}