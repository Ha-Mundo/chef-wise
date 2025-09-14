# 👨‍🍳 Chef Wise — AI-Powered Recipe Generator

**Chef Wise** is a modern React + Vite web app that helps users create recipes based on the ingredients they have on hand. It uses Hugging Face’s `Mixtral-8x7B-Instruct` model to generate markdown-formatted recipe suggestions.

> 🛡️ API security is a top priority: API calls are routed through a secure backend to keep your Hugging Face token private.

---

## 🚀 Features

- ✅ Input any number of ingredients
- 🧠 Uses AI to generate realistic, markdown-formatted recipes
- 🔐 API key never exposed to the frontend
- ⚡ Built with fast and modern tools (React + Vite)
- 🧼 Clean and easy-to-read UI

---

## 🛠️ How It Works

1 - The user enters a list of ingredients in the UI.

2 - The frontend sends a POST request to /api/get-recipe.

3 - A serverless function securely communicates with Hugging Face's API using an access token stored in the backend.

4 - The AI responds with a markdown-formatted recipe.

5 - The frontend displays the recipe to the user.

## 🧩 Architecture Overview 
```plaintext
Frontend (React + Vite)
      │
      ▼
Backend API (/api/get-recipe)
      │
      ▼
Hugging Face Inference API

```

## 📁 Project Structure

```
Chef-Wise/
├── api/                      # Serverless backend functions (e.g., for Vercel)
│   └── get-recipe.js         # Secure Hugging Face API call
├── components/               # Reusable React components
│   ├── Header.jsx            # Header UI component
│   ├── IngredientsList.jsx   # UI for entering ingredients
│   ├── Main.jsx              # Main layout or routing logic
│   └── WiseRecipe.jsx        # Displays the generated recipe
├── images/                   # Static assets (e.g., icons)
│   └── chef-icon.png
├── .env                      # Environment variables (NOT committed to Git)
├── .gitignore                # Git ignore file
├── ai.js                     # Frontend fetch to backend API
├── App.js                    # Main App component
├── eslint.config.js          # ESLint configuration
├── index.css                 # Global styles
├── index.html                # HTML entry point for Vite
├── index.jsx                 # Main React renderer
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Exact versions of dependencies
└── vite.config.js            # Vite configuration

```

## 🧑‍💻 Getting Started

### 1. Clone the Project
```
git clone https://github.com/yourusername/chef-Wise.git
cd chef-Wise
```

### 2. Install Dependencies
```
npm install
```

### 3. Create an .env File
Create a .env file in the root of your project and add your Hugging Face token:
```
HF_ACCESS_TOKEN=your_huggingface_access_token
```
Make sure .env is listed in .gitignore to prevent it from being committed.

### 4. Run Locally
If using Vercel serverless functions:
```
npx vercel dev
```

Otherwise, to test only the frontend:
```
npm run dev
```
You’ll need a compatible backend (like Vercel Functions or Express) to run /api/get-recipe.

## 🔐 Environment & Security

Your Hugging Face API key is stored in the .env file and never exposed to the browser.

All requests to Hugging Face go through a serverless backend (/api/get-recipe) to keep your key secure.

Do not use process.env.HF_ACCESS_TOKEN in your frontend code — it will be exposed at build time.

## ⚙️ Deployment
### Deploying with Vercel:

- Push the project to GitHub.

- Import the project into your Vercel dashboard.

- In Project Settings > Environment Variables, add:
```
Name: HF_ACCESS_TOKEN
Value: your_huggingface_access_token
```

Vercel will automatically deploy the frontend and backend (/api folder) together.

## 📦 Built With

- React

- Vite

- @huggingface/inference

- Vercel Functions
 (or your preferred backend platform)

## ✨ Potential Improvements

- Add image generation (e.g. using Stable Diffusion)

- Save recipes or user profiles with a database

- Support drag & drop ingredient input

- Improve mobile responsiveness

##📜 License

- This project is open source and available under the MIT License
.

## 🙌 Acknowledgments

- AI model: Mixtral-8x7B-Instruct
 via Hugging Face