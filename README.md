# Educação na Computação

Educational web application for teaching probability and statistics concepts through interactive visualizations and real-time data analysis. Built for the practical exam P1 on probability distributions in computer science education.

## 📚 Project Overview - P1 (Prova Prática 1)

This project implements a complete educational flow for teaching probability distributions through 5 interconnected parts:

1. **Prior Knowledge Assessment** - Interactive survey to gauge student background
2. **Results Dashboard** - Real-time visualization of class responses
3. **Theory Section** - Interactive lessons with animations and mathematical concepts
4. **Pattern Recognition** - Exercise to validate understanding of PDF properties
5. **Distribution Identification** - Real-world application using actual classroom data

### Educational Philosophy

The project follows **constructivist learning principles**:
- Students first self-assess their knowledge
- Learn theoretical concepts with interactive visualizations
- Validate understanding through recognition tasks
- Apply knowledge to predict real distributions from classroom data
- See actual data emerge in real-time as class participates

## 🌐 Live Deployment URLs

### Production Deployments
- **Firebase Hosting:** https://lab-mobile-webapp.web.app
- **Vercel:** https://mobile-app-rlpgq1g1u-thiagodsds-projects.vercel.app

### Example Pages (P1 Structure)
1. **Navigation Hub:** `/educacao-na-computacao/`
2. **Part 1 - Survey:** `/educacao-na-computacao/conhecimento-previo/`
3. **Part 2 - Results:** `/educacao-na-computacao/conhecimento-previo/resultados/`
4. **Part 3 - Theory:** `/educacao-na-computacao/teoria/`
5. **Part 4 - Recognition:** `/educacao-na-computacao/teoria/reconhecimento-padrao/`
6. **Part 5 - Identification:** `/educacao-na-computacao/identificacao-de-padrao/`

## 🎯 Key Features Implemented in P1

### Real-Time Interactions
- **Live Response Counters** - Poll API every 3-5 seconds for updates
- **Animated Transitions** - Framer Motion for smooth state changes
- **Dynamic Visualizations** - Charts update as students submit responses

### Interactive Learning Components
- **Video Animations** - Manim-generated educational videos (Bernoulli, Normal distribution)
- **Interactive Sliders** - Real-time Normal curve manipulation (μ and σ parameters)
- **Mathematical Rendering** - KaTeX for LaTeX equations inline and block
- **Form Validation** - Conditional fields, multi-select, range validation

### Data Visualization
- **Plotly.js Charts** - Bar charts, histograms, line plots with fill
- **Custom Distribution Functions** - Client-side PDF/PMF calculations
- **Distribution Catalog** - Visual reference for 6 probability distributions
- **Real Data Analysis** - Heights, time intervals, success rates

### Assessment & Feedback
- **Immediate Feedback** - Instant validation on Pattern Recognition exercise
- **Performance Tracking** - localStorage flags for cross-section continuity
- **Success Animations** - Celebration effects for correct answers
- **Educational Explanations** - Why distributions fit real data patterns

## 📂 Project Structure

```
mobile-app-lab/
├── src/
│   ├── app/
│   │   ├── layout.tsx                         # Root layout with Raleway font
│   │   ├── page.tsx                           # Default homepage
│   │   ├── globals.css                        # Tailwind CSS v4 global styles
│   │   └── educacao-na-computacao/            # Main application namespace
│   │       ├── page.tsx                       # Navigation hub (5 parts)
│   │       ├── conhecimento-previo/           # PART 1 & 2: Prior Knowledge
│   │       │   ├── layout.tsx                 # SEO metadata
│   │       │   ├── page.tsx                   # Interactive survey (305 lines)
│   │       │   └── resultados/page.tsx        # Real-time results (212 lines)
│   │       ├── teoria/                        # PART 3: Theory Section
│   │       │   ├── layout.tsx                 # SEO metadata
│   │       │   ├── page.tsx                   # Educational content (249 lines)
│   │       │   └── reconhecimento-padrao/     # PART 4: Pattern Recognition
│   │       │       └── page.tsx               # PDF validation exercise (377 lines)
│   │       └── identificacao-de-padrao/       # PART 5: Distribution Prediction
│   │           ├── layout.tsx                 # SEO metadata
│   │           └── page.tsx                   # Prediction + analysis (552 lines)
│   ├── app/api/                               # Next.js API Routes
│   │   ├── conhecimento-previo/
│   │   │   └── route.ts                       # GET/POST survey data
│   │   └── identificacao-de-padrao/
│   │       ├── route.ts                       # POST predictions
│   │       └── dados/route.ts                 # GET analytics data
│   └── lib/
│       ├── firebase.ts                        # Client Firebase initialization
│       ├── firebase-admin.ts                  # Server Admin SDK initialization
│       ├── api-helpers.ts                     # Standardized response/error handling
│       └── validation.ts                      # Zod schemas for validation
├── public/
│   └── animations/                            # Manim-generated educational videos
│       ├── BernoulliDistribution.mp4          # (1.4 MB)
│       ├── SimpleNormalDistribution.mp4       # (2.8 MB)
│       └── MeanCalculation.mp4                # (226 KB)
├── manim-animations/                          # Python source for animations
│   ├── normal_distribution.py
│   ├── bernoulli_distribution.py
│   ├── mean_calculation.py
│   ├── simple_normal.py
│   └── requirements.txt                       # Manim dependencies
├── docs/                                      # Development documentation
│   ├── api_best_practices.md
│   ├── firebase-deploy.md
│   └── SECURITY.md
├── firestore.rules                            # Firestore security configuration
├── firebase.json                              # Firebase deployment config
├── package.json                               # Dependencies & npm scripts
├── tsconfig.json                              # TypeScript configuration
├── next.config.ts                             # Next.js configuration
├── postcss.config.mjs                         # Tailwind CSS v4 setup
├── eslint.config.mjs                          # Code quality rules
├── CLAUDE.md                                  # Project instructions for Claude Code
└── README.md                                  # This file
```

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.5.4** - App Router with React Server Components
- **React 19.1.0** - Latest concurrent features and hooks
- **TypeScript 5** - Strict mode for type safety
- **Tailwind CSS v4** - Utility-first styling with PostCSS

### Styling & Animation
- **Tailwind CSS v4** - Responsive design, grid, flexbox utilities
- **Framer Motion 12.23.22** - Spring physics animations and transitions
- **PostCSS** - CSS processing pipeline for Tailwind
- **Custom Animations** - Scale, opacity, rotate effects

### Data Visualization
- **Plotly.js 3.1.1** - Professional charts (bar, histogram, scatter)
- **react-plotly.js 2.6.0** - React wrapper for Plotly
- **KaTeX 0.16.22** - Fast LaTeX math rendering
- **react-katex 3.1.0** - React integration for KaTeX
- **Custom Mathematical Functions** - Client-side PDF/PMF calculations

### Backend & Database
- **Firebase 12.3.0** - Client SDK for Firestore
- **firebase-admin 13.5.0** - Server-side Admin SDK
- **Cloud Firestore** - Document-oriented NoSQL database
- **Next.js API Routes** - Serverless functions for data access

### Validation & Type Safety
- **Zod 4.1.11** - Schema validation with TypeScript inference
- **@types/** packages - Complete type coverage for all dependencies

### Build & Development Tools
- **Turbopack** - Next.js native fast bundler
- **ESLint 9** - Code quality with Next.js configuration
- **firebase-tools 13.35.1** - Firebase CLI for deployment

## 🗄️ Database Schema

### Collection 1: `conhecimento_previo` (Public Survey Data)

```typescript
{
  id: string,                                    // Auto-generated Firestore ID
  estudouEstatistica: "Sim" | "Não" | "Alguns assuntos",
  onde: string[],                                // ["Educação", "Hobby", "Trabalho", "Família"]
  timestamp: Timestamp                           // Server timestamp (ordered)
}
```

**Firestore Rules:**
- Read: Public (anyone can view count and results)
- Create: Public (anyone can submit survey)
- Update/Delete: Blocked (prevent data tampering)

**Usage:**
- Part 1: Students submit their background
- Part 2: Aggregated results displayed in charts
- API: `/api/conhecimento-previo` (GET for count/results, POST to submit)

---

### Collection 2: `identificacao-de-padrao` (Pattern Identification Data)

```typescript
{
  id: string,                                    // Auto-generated Firestore ID
  altura: number,                                // Height in cm (100-250 validated)
  previsaoAltura: string,                        // Predicted distribution for heights
  previsaoTempo: string,                         // Predicted distribution for time intervals
  previsaoAcertos: string,                       // Predicted distribution for success rate
  acertouReconhecimento: boolean,                // Did student pass Part 4?
  timestamp: Date | Timestamp                    // Server timestamp (ordered ASC)
}
```

**Firestore Rules:**
- Read/Write: Blocked for clients (server-only access via Admin SDK)

**Usage:**
- Part 5: Students submit height + 3 predictions
- Part 5 Results: Real-time analytics of actual distributions
- API: `/api/identificacao-de-padrao` (POST), `/api/identificacao-de-padrao/dados` (GET)

**Data Processing:**
- Heights → Histogram bins for distribution visualization
- Timestamps → Calculate intervals (seconds between consecutive submissions)
- `acertouReconhecimento` → Count success vs failure rates

## 🔌 API Endpoints

### `POST /api/conhecimento-previo`
**Purpose:** Submit prior knowledge survey (Part 1)

**Request Body:**
```json
{
  "estudouEstatistica": "Sim" | "Não" | "Alguns assuntos",
  "onde": ["Educação", "Hobby"]  // Array of selected options
}
```

**Response (Success):**
```json
{
  "success": true,
  "id": "firestore_document_id",
  "newCount": 42,
  "message": "Resposta salva com sucesso"
}
```

**Validation:**
- Required fields: `estudouEstatistica`, `onde`
- `onde` must be an array

---

### `GET /api/conhecimento-previo`
**Purpose:** Fetch response count or full dataset (Part 2)

**Query Parameters:**
- `full=true` - Returns complete documents (for results page)

**Response (Count Only):**
```json
{
  "success": true,
  "count": 42
}
```

**Response (Full Data):**
```json
{
  "success": true,
  "count": 42,
  "data": [
    {
      "id": "doc_id",
      "estudouEstatistica": "Sim",
      "onde": ["Educação"],
      "timestamp": { "seconds": 1699000000, "nanoseconds": 0 }
    }
  ]
}
```

---

### `POST /api/identificacao-de-padrao`
**Purpose:** Submit distribution predictions + height (Part 5)

**Request Body:**
```json
{
  "altura": 175,
  "previsaoAltura": "Normal",
  "previsaoTempo": "Exponencial",
  "previsaoAcertos": "Bernoulli",
  "acertouReconhecimento": true
}
```

**Response:**
```json
{
  "success": true,
  "id": "firestore_document_id"
}
```

**Validation:**
- `altura`: 100-250 (number)
- All prediction fields required
- Uses Firebase Admin SDK (server-side only)

---

### `GET /api/identificacao-de-padrao/dados`
**Purpose:** Fetch aggregated data for visualization (Part 5 results)

**Response:**
```json
{
  "alturas": [170, 165, 180, 175],
  "intervalos": [3, 5, 2, 8, 12],        // Seconds between responses
  "acertos": 28,
  "erros": 14,
  "total": 42
}
```

**Data Processing:**
- `alturas`: All submitted heights (for histogram)
- `intervalos`: Calculated time differences between consecutive submissions
- `acertos`: Count where `acertouReconhecimento === true`
- `erros`: Total - acertos

## 🎓 Learning Flow: 5-Part Educational Journey

### PART 1: Conhecimento Prévio (Prior Knowledge Assessment)
**Route:** `/educacao-na-computacao/conhecimento-previo/`
**File:** `src/app/educacao-na-computacao/conhecimento-previo/page.tsx` (305 lines)

**Purpose:** Survey to assess student background in statistics

**Features:**
- Question 1: "Have you studied statistics?" (3 radio options)
- Question 2 (conditional): "Where?" (Multiple checkboxes)
- Real-time response counter with animated gradient
- Success confirmation with checkmark animation
- Polls API every 3 seconds for live count updates

**Technical Details:**
- Framer Motion for entrance/exit animations
- Dynamic conditional rendering (Q2 only shows if Q1 ≠ "Não")
- POST to Firebase via API route
- Disabled submit until all required fields filled

---

### PART 2: Resultados (Results Dashboard)
**Route:** `/educacao-na-computacao/conhecimento-previo/resultados/`
**File:** `src/app/educacao-na-computacao/conhecimento-previo/resultados/page.tsx` (212 lines)

**Purpose:** Real-time visualization of class survey responses

**Features:**
- Two Plotly.js bar charts:
  1. Statistics study status distribution
  2. Where statistics was learned (multi-select histogram)
- Live update counter (refreshes every 5 seconds)
- Dynamic data processing from Firestore

**Technical Details:**
- Fetches full dataset with `?full=true` parameter
- Client-side data aggregation (count occurrences)
- Responsive chart layout with transparent backgrounds
- Loading states while fetching data

---

### PART 3: Teoria (Probability Distribution Theory)
**Route:** `/educacao-na-computacao/teoria/`
**File:** `src/app/educacao-na-computacao/teoria/page.tsx` (249 lines)

**Purpose:** Teach foundational concepts of probability distributions

**Features:**
- **Educational Videos:**
  - Bernoulli distribution animation (autoplay, loop)
  - Normal distribution visualization
- **Section 1:** "Processes and Distributions" - Conceptual explanation
- **Section 2:** "Probability Density Function (PDF)" - Formal definition with math
- **Interactive Normal Distribution:**
  - Slider for μ (mean): -10 to 10
  - Slider for σ (std deviation): 0.1 to 5
  - Real-time curve recomputation using Gaussian formula
  - Mathematical notation rendered with KaTeX

**Technical Details:**
- Video embedding: MP4 autoplay with loop and muted
- Mathematical formulas: `InlineMath` and `BlockMath` components
- Real-time curve generation: 200 data points computed on slider change
- Plotly scatter plot with fill for smooth curve rendering

---

### PART 4: Reconhecimento de Padrão (Pattern Recognition Exercise)
**Route:** `/educacao-na-computacao/teoria/reconhecimento-padrao/`
**File:** `src/app/educacao-na-computacao/teoria/reconhecimento-padrao/page.tsx` (377 lines)

**Purpose:** Test understanding of valid probability density functions

**Educational Goal:** Teach two fundamental PDF properties:
1. **Non-negativity:** f(x) ≥ 0 for all x
2. **Normalization:** ∫f(x)dx = 1 (area under curve = 1)

**Exercise Format:**
- Three distributions presented as Plotly charts:
  - **Distribution A:** Uniform (Valid ✓)
  - **Distribution B:** Exponential (Valid ✓)
  - **Distribution C:** Sine wave (Invalid ✗ - has negative values)
- Student selects "Valid" or "Invalid" for each
- Immediate feedback with mathematical explanation
- Success triggers localStorage flag `acertouReconhecimento: true`

**Features:**
- Framer Motion card animations (hover effects)
- Dynamic feedback messages with inline KaTeX
- Celebration animation on all correct
- Reset button to retry
- No backend submission (client-side validation)

**Technical Details:**
- Three separate chart generation functions
- Conditional button styling (green for valid, red for invalid)
- localStorage persistence for Part 5 cross-reference
- Answer validation against correct solution: {A: true, B: true, C: false}

---

### PART 5: Identificação de Padrão (Distribution Identification)
**Route:** `/educacao-na-computacao/identificacao-de-padrao/`
**File:** `src/app/educacao-na-computacao/identificacao-de-padrao/page.tsx` (552 lines)

**Purpose:** Apply knowledge to predict real distributions from classroom data

**Form Section:**
- Height input (number, 100-250 cm validation)
- Question 1: Which distribution describes class heights?
- Question 2: Which distribution describes time intervals between responses?
- Question 3: Which distribution describes success/failure on Part 4?
- Distribution options: Normal, Uniforme, Exponencial, Binomial, Poisson, Bernoulli

**Distribution Catalog:**
- Visual reference gallery showing all 6 distributions
- Small interactive charts generated with mathematical functions
- Helps students recognize distribution shapes

**Real-Time Results Display** (after submission):
Three analysis panels with Plotly histograms:

1. **Height Distribution**
   - Histogram of actual classroom heights
   - Educational note: "Alturas tendem a seguir distribuição Normal"

2. **Time Intervals**
   - Histogram of seconds between consecutive student submissions
   - Educational note: "Intervalos de tempo seguem distribuição Exponencial"

3. **Success vs Failure Rates**
   - Bar chart of Part 4 performance (acertou vs errou)
   - Educational note: "Acertos/erros seguem distribuição Binomial ou Bernoulli"

**Features:**
- Live data updates every 5 seconds after submission
- Form disables after submit to prevent duplicates
- Dynamic chart rendering based on real data
- Educational explanations under each chart

**Technical Details:**
- POST to API with form data + localStorage flag
- GET from `/dados` endpoint for analytics
- Client-side distribution generation functions (6 types)
- Data binning for histograms (automatic bin calculation)
- Conditional rendering: form → results transition

## 🎨 Animation & Visualization Details

### Framer Motion Animations
- **Card Entrances:** Opacity 0→1, scale 0.9→1 with spring physics
- **Counter Pulse:** Scale 1→1.1→1 with rotation on value change
- **Success Checkmark:** Spring animation with overshoot
- **Conditional Rendering:** `AnimatePresence` for smooth exits
- **Button Hover:** Scale 1.02 with color shift

### Plotly.js Chart Types
1. **Bar Chart** - Survey results (Part 2)
2. **Histogram** - Height distribution (Part 5)
3. **Scatter with Fill** - Normal curve (Part 3)
4. **Line Plot** - Distribution reference catalog

**Chart Configuration:**
- Transparent backgrounds for seamless integration
- Responsive sizing (100% width, fixed height)
- Custom color schemes (blue, orange, purple)
- No mode bar (clean presentation)

### KaTeX Mathematical Rendering
**Inline Math:** `<InlineMath math="f(x) \geq 0" />`
**Display Math:** `<BlockMath math="\int_{-\infty}^{\infty} f(x) dx = 1" />`

**Used For:**
- Gaussian formula: Normal distribution equation
- PDF properties: Non-negativity and normalization
- Parameter display: μ and σ values

## 🔧 Development

### Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in Firebase credentials in .env.local

# Start development server (with Turbopack)
npm run dev
```

### Scripts
```bash
npm run dev       # Development server (http://localhost:3000)
npm run build     # Production build with Turbopack
npm start         # Run production server
npm run lint      # ESLint code quality check
```

### Environment Variables Required

**Client-Side (public):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

**Server-Side (private):**
```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

### Firebase Deployment
```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

See `docs/firebase-deploy.md` for detailed deployment instructions.

## 🔒 Security

### Firestore Security Rules
- `conhecimento_previo`: Public read/create, no update/delete
- All other collections: Denied by default
- Server-side operations use Admin SDK with full access

### API Security
- Input validation with Zod schemas
- Generic error messages (no info leakage)
- Admin SDK operations server-only
- No user authentication required (public classroom tool)

### Client Security
- No direct database access from client
- Firebase config in public variables (expected for client SDK)
- Private keys only in server-side environment variables
- localStorage used only for non-sensitive flags

See `docs/SECURITY.md` for full security guidelines.

## 📊 Code Statistics (P1)

| Metric | Value |
|--------|-------|
| **Total Pages** | 6 main pages |
| **Total Lines (TSX/TS)** | ~2000+ |
| **API Routes** | 3 endpoints |
| **Firestore Collections** | 2 |
| **Animation Videos** | 3 (4.4 MB total) |
| **npm Dependencies** | 14 main, 9 dev |
| **TypeScript Files** | 7 (pages, API, lib) |
| **React Components** | 5 client components |
| **KaTeX Equations** | 4+ |
| **Plotly Charts** | 4+ |

## 🎯 P1 Learning Outcomes

By completing the 5-part journey, students will:

1. ✅ **Self-assess** their statistics background (Part 1)
2. ✅ **Visualize** real-time class data aggregation (Part 2)
3. ✅ **Learn** probability distribution theory with interactive tools (Part 3)
4. ✅ **Validate** understanding of PDF mathematical properties (Part 4)
5. ✅ **Apply** knowledge to predict distributions from real classroom data (Part 5)

### Key Concepts Covered
- **Discrete vs Continuous Distributions**
- **Probability Mass Functions (PMF)**
- **Probability Density Functions (PDF)**
- **Distribution Properties:** Non-negativity, Normalization
- **Common Distributions:** Normal, Exponential, Bernoulli, Binomial, Poisson, Uniform
- **Real-World Applications:** Heights, time intervals, binary outcomes

### Pedagogical Approach
- **Constructivist Learning:** Build knowledge through active participation
- **Immediate Feedback:** Instant validation and explanations
- **Real Data:** Use actual classroom submissions for analysis
- **Visual Learning:** Charts, animations, and interactive controls
- **Scaffolded Difficulty:** Progress from simple survey to complex prediction

## 🚀 Next Steps for P2

The `prova-p2` branch is initialized from P1's final state. Future enhancements for P2 could include:

- Additional distribution types (Gamma, Beta, Chi-square)
- Hypothesis testing exercises
- Confidence interval calculators
- More complex pattern recognition tasks
- Bayesian probability scenarios
- A/B testing simulations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Thiago Duarte Souza**
GitHub: [@thiagodsd](https://github.com/thiagodsd)

---

**Last Updated:** October 2025
**Project Version:** P1 (Prova Prática 1)
**Status:** Production Deployed ✅
