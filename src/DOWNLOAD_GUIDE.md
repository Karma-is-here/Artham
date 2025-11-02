# Artham Finance App - Download Guide

## How to Download This Project

Since Figma Make doesn't support direct downloads, follow these steps:

### Step 1: Create Project Structure

Create a new React + TypeScript project:

```bash
# Using Vite (recommended)
npm create vite@latest artham-finance -- --template react-ts
cd artham-finance
```

### Step 2: Install Dependencies

```bash
npm install lucide-react recharts motion sonner
npm install @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-tabs @radix-ui/react-tooltip
npm install class-variance-authority clsx tailwind-merge
npm install -D tailwindcss@next @tailwindcss/vite
```

### Step 3: Copy Files

You need to copy these files from Figma Make:

#### Core Files (Required)
- `/App.tsx` - Main application router
- `/types/artham.ts` - TypeScript type definitions
- `/utils/vaultCalculations.ts` - Vault calculation logic
- `/utils/csvParser.ts` - CSV parsing utilities
- `/styles/globals.css` - Global styles with Artham theme

#### Page Components
- `/components/artham/LandingPage.tsx`
- `/components/artham/SettingsPage.tsx`
- `/components/artham/DashboardPage.tsx`

#### Settings Components
- `/components/artham/settings/ProfileCard.tsx`
- `/components/artham/settings/IncomeSection.tsx`
- `/components/artham/settings/BankStatementSection.tsx`
- `/components/artham/settings/RiskAppetiteSection.tsx`
- `/components/artham/settings/VaultPreferencesSection.tsx`
- `/components/artham/settings/AICalculationSection.tsx`
- `/components/artham/settings/VaultPreviewSection.tsx`
- `/components/artham/settings/TransitionAnimation.tsx`

#### UI Components (Shadcn)
Copy all files from `/components/ui/` directory

#### Helper Component
- `/components/figma/ImageWithFallback.tsx`

### Step 4: Configure Tailwind CSS

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Step 5: Update Import Paths

If using Vite with `src/` directory, update all imports:
- Change `./components/` to `./src/components/`
- Change `./types/` to `./src/types/`
- Change `./utils/` to `./src/utils/`

Or configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Step 6: Run the Application

```bash
npm run dev
```

## File Tree Structure

```
artham-finance/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── types/
│   │   └── artham.ts
│   ├── utils/
│   │   ├── vaultCalculations.ts
│   │   └── csvParser.ts
│   ├── components/
│   │   ├── artham/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── settings/
│   │   │       ├── ProfileCard.tsx
│   │   │       ├── IncomeSection.tsx
│   │   │       ├── BankStatementSection.tsx
│   │   │       ├── RiskAppetiteSection.tsx
│   │   │       ├── VaultPreferencesSection.tsx
│   │   │       ├── AICalculationSection.tsx
│   │   │       ├── VaultPreviewSection.tsx
│   │   │       └── TransitionAnimation.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/
│   │       └── [all shadcn components]
│   └── styles/
│       └── globals.css
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Notes

- The app uses localStorage for data persistence
- CSV upload accepts standard bank statement format (Date, Description, Amount, Type)
- Sample data is available via "Use Sample Data" button
- Color scheme: Teal (#1C8B82), Gold (#F4B400)
- Font: Inter (loaded via Google Fonts)

## Need Help?

Ask me to show you the contents of any specific file by saying:
"Show me the contents of [filename]"
