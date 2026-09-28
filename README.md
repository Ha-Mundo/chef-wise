# 👨‍🍳 Chef Wise — AI-Powered Recipe Generator

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Zod](https://img.shields.io/badge/Zod-3.x-5b21b6)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646cff?logo=vite)
![Groq](https://img.shields.io/badge/AI-GroqCloud-orange?logo=google-cloud)

**Chef Wise** is a modern **React + Vite + TypeScript** web application that generates smart recipes based on the ingredients provided by the user.

The app leverages **GroqCloud’s `gpt-oss-20b` model** to produce clean, markdown-formatted recipe suggestions with ultra-low latency.  
All requests and responses are validated with **Zod**, ensuring runtime safety and predictable data handling across the entire application.

> 🛡️ API security is a top priority: all AI requests are routed through secure **Vercel Serverless Functions**, keeping your Groq API key fully private and bypassing regional restrictions.

## 🚀 Features

- Input and manage a dynamic list of ingredients
- AI-generated recipes based on available ingredients (powered by GroqCloud)
- Markdown-formatted recipes rendered in the UI
- Loading progress feedback with smooth mobile scrolling
- Fully typed with TypeScript
- Runtime validation with Zod
- Secure backend API (no exposed secrets)
- Fast development experience with Vite

## 🛠️ How It Works

1. The user enters ingredients in the UI.
2. The frontend sends a POST request to `/api/getRecipe`.
3. A Vercel Serverless Function validates the request using Zod.
4. The backend securely calls the **Groq SDK** using a Serverless Function.
5. The **gpt-oss-20b** model generates a recipe.
6. The response is validated and displayed as formatted Markdown.

## 🧩 Architecture Overview

```plaintext
Frontend (React + Vite + TypeScript)
        │
        ▼
Vercel Serverless Function (/api/getRecipe)
        │
        ▼
GroqCloud API (gpt-oss-20b)
```


## 📁 Project Structure

```
chef-wise/
│
├── api/
│   └── getRecipe.ts
│
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── chef-wise-icon.png
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── IngredientsInputSection.tsx
│   │   ├── IngredientsList.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── RecipeSection.tsx
│   │   └── WiseRecipe.tsx
│   │
│   ├── hooks/
│   │   └── useMobileSmoothScroll.ts
│   │
│   ├── layouts/
│   │   └── DefaultLayout.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Error.tsx
│   │   └── NotFound.tsx
│   │
│   ├── schemas/
│   │   └── RecipeSchema.ts
│   │
│   ├── services/
│   │   └── RecipeService.ts
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── DefaultLayout.css
│   │   ├── Error.css
│   │   └── NotFound.css
│   │
│   ├── utils/
│   │   └── GenerateUtils.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.api.json
├── tsconfig.node.json
├── package.json
├── package-lock.json
└── README.md

```

## 🧑‍💻 Getting Started

### 1. Clone the Project
```
git clone https://github.com/Ha-Mundo/chef-wise.git

cd chef-Wise
```

### 2. Install Dependencies
```
npm install
```

### 3. Create an .env File
Create a .env file in the root of your project and add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
```
Make sure .env is listed in .gitignore to prevent it from being committed.

### 4. Run Locally
Run the project locally using Vercel Dev:
```
npm start
```
This will start both the frontend and the serverless backend.


## 🔐 Environment & Security

- API keys are never exposed to the client.

- All AI requests pass through a secure backend.

- Zod validates both request payloads and AI responses.

- Secrets are managed through environment variables only.

## 📦 Built With

- React 19

- TypeScript

- Vite

- Zod

- React Router

- Groq SDK - AI Inference (gpt-oss-20b)

- Vercel Serverless Functions

- ESLint


## ✨ Potential Improvements

- Automatic language detection (responses match the user’s input language)

- Save recipes to a database

- User profiles and favorites

- Recipe image generation

- Drag & drop ingredient input

- Improved accessibility and UX

- Offline caching


## 📜 License

- This project is open source and available under the MIT License


## 🙌 Acknowledgments

- AI Infrastructure: GroqCloud

- Model: gpt-oss-20b