# SmileCloudVueProject

## חלק הסבר - תשובות לשאלות התרגיל

### 1. באיזו שיטה השתמשתי לציור המשולש?

**תשובה:** השתמשתי ב-**SVG (Scalable Vector Graphics)**

**למה בחרתי בשיטה הזו?**
התייעצתי עם GPT:
- **דיוק גרפי**: SVG מאפשר ציור מדויק של צורות גיאומטריות
- **גמישות**: קל להוסיף אלמנטים כמו קשתות והטקסט.
- **רספונסיביות**: התאמה אוטומטית לגדלי מסך שונים

---

### 2. כיצד חישבתי את ערך הזוויות?

**תשובה:** השתמשתי ב-**Law of Cosines (חוק הקוסינוסים)**

**הנוסחה:** `cos(C) = (a² + b² - c²) / (2ab)`

```typescript
function calculateAngleAtVertex(vertex: Point, p1: Point, p2: Point): number {
  const a = distance(vertex, p1);
  const b = distance(vertex, p2); 
  const c = distance(p1, p2);
  
  const cosAngle = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
  const clampedCos = Math.max(-1, Math.min(1, cosAngle)); // למניעת שגיאות round-off
  
  return Math.acos(clampedCos) * (180 / Math.PI); // המרה לדרגות
}
```



---

### 3. מה היה מאתגר בתרגיל?

**האתגרים העיקריים:**

1. **חישוב מיקום הטקסט של הזוויות**
   - מצאתי את המיקום האופטימלי לכל זווית בתוך המשולש
   - פתרון: חישוב ממוצע של וקטורי הכיוון מהקודקוד

2. **ציור הקשתות לסימון הזוויות**
   - שימוש ב-SVG Arc עם חישובי וקטור


---

### 4.  האם יש משהו שלא הצלחתי לפתור?
לא הסתדרתי עם העיצוב , התקנת Tailwind CSS, צריכה זמן נוסף בשביל זה.
לא כתבתי בצורה שלימה לבד, ונעזרתי בכלים.

---

### 5. האם השתמשתי בעזרים חיצוניים?

**כן, השתמשתי במספר עזרים:**

#### 🧠 **AI ועוזרים דיגיטליים:**
- **ChatGPT/Claude**: עזרה בחישובים מתמטיים מורכבים
- **GitHub Copilot**: השלמת קוד מהירה
- **בעיקר עזרו ב:**
  - אלגוריתם Law of Cosines
  - חישוב וקטורי למיקום טקסט
  - אופטימיזציה של קוד
  - - התאמה לVue, בדר"כ כותבת בreact.

####  **מקורות ותיעוד:**
- Vue.js Documentation - לתחביר נכון
- MDN Web Docs - לפונקציות SVG
- Stack Overflow - לפתרון בעיות ספציפיות
- Tailwind CSS Docs - רציתי לעיצוב

**הגישה שלי:**
-- תחילה חשבתי על אכקטטורה נכונה ובנייה בצורה הזאת, ויחד עם הAI התחלתי לפתור, חושבת שבעידן של היום החכמה היא לדעת להעזר .
- תמיד בדקתי ובחנתי את הקוד לפני השימוש כלל ברור וחובה .
- הוספתי שיפורים ואופטימיזציות משלי

---
רבקה טולידאנו
