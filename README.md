# Full-Stack Developer Interview Preparation Book

A comprehensive, self-contained, and beginner-to-senior technical interview preparation book and interactive study platform designed specifically for Full-Stack, MERN Stack, and Node.js Backend Developer interviews.

Hosted entirely as a static web application compatible with **GitHub Pages**, with zero external API dependencies, zero build steps, and offline local progress persistence.

---

## 🚀 Key Features

- **📖 Complete 45-Chapter Curriculum**: Covers 9 comprehensive parts spanning Computer Networks, JavaScript Internals, Asynchronous Event Loop, TypeScript, Browser Engines, Node.js Architecture, Express.js Production APIs, React & Redux Toolkit, PostgreSQL & SQL Performance, MongoDB & Mongoose, API Security (OWASP Top 10), System Design, DevOps (Docker, Linux CLI, CI/CD), and Engineering Judgment.
- **🎯 12+ to 20+ Interview Questions & Answers Per Chapter**: Each chapter concludes with a dedicated interview section featuring Beginner, Intermediate, Advanced, and Scenario-based questions, code-tracing breakdowns, and spoken interview answers suitable for verbal communication.
- **🎨 Modern Responsive Reading Platform**:
  - Light and Dark modes with automatic OS preference detection and seamless CSS transitions.
  - Collapsible, searchable multi-part navigation sidebar.
  - In-page Table of Contents with live scrollspy highlighting.
  - Interactive Reading Progress Bar.
  - One-click Code Copy buttons with visual confirmation.
  - Standalone, zero-dependency client-side syntax highlighting.
  - Fast Global Search modal accessible via `Ctrl+K` or `/`.
  - Chapter completion tracking and revision bookmarks persisted in browser `localStorage`.
  - Print-friendly stylesheet (`@media print`) optimized for offline study and paper export.

---

## 📂 Project Structure

```text
/
├── index.html                   # Main landing page & curriculum dashboard
├── 404.html                     # GitHub Pages fallback error page
├── README.md                    # Setup, architecture & deployment guide
├── BOOK_PROGRESS.md             # Execution progress & verification ledger
├── LICENSE                      # Open-source MIT license
├── assets/
│   ├── css/
│   │   ├── theme.css            # Light & Dark design tokens (CSS variables)
│   │   ├── code.css             # Code blocks & syntax highlighting styles
│   │   ├── main.css             # Typography, sidebar, layout & modal styles
│   │   └── print.css            # Print stylesheet (clean offline paper layout)
│   ├── js/
│   │   ├── book-data.js         # Curriculum manifest (45 chapters & metadata)
│   │   ├── theme.js             # Theme switcher & local persistence
│   │   ├── progress.js          # Chapter progress tracker & bookmarks
│   │   ├── prism.js             # Zero-dependency syntax highlighter
│   │   ├── search.js            # Global search engine modal (Ctrl+K)
│   │   └── chapter.js           # Chapter page builder (sidebar, TOC, copy, Q&A)
│   └── images/                  # Diagrams and architectural visual assets
└── chapters/                    # Individual chapter HTML files
    ├── ch01-how-the-web-works.html
    ├── ch02-javascript-fundamentals.html
    ├── ...
    └── ch45-engineering-judgment-and-behavioral.html
```

---

## 💻 Running the Book Locally

Because this book is built using semantic HTML5, modern CSS3, and vanilla JavaScript without any external build tooling (no Webpack, Vite, or npm installs required to read), you can read it directly:

### Option 1: Direct File Access
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Simple Local Static Server
If you prefer running via a local HTTP server:

```bash
# Using Python 3:
python -m http.server 8000

# Using Node.js (npx):
npx serve .

# Or using VS Code Live Server extension:
# Right-click "index.html" -> "Open with Live Server"
```

Then visit `http://localhost:8000` in your browser.

---

## 🌐 Deploying to GitHub Pages

You can host this entire book for free on GitHub Pages. Follow these exact steps:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click the **+** icon in the upper-right corner and select **New repository**.
3. Name your repository (e.g., `fullstack-interview-handbook`).
4. Keep the repository **Public** (or Private if you have a GitHub Pro plan).
5. Do not initialize with a README if you are pushing an existing folder.

### Step 2: Initialize Git and Push
In your terminal / PowerShell within the project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: complete fullstack interview preparation book platform"

# Set default branch to main
git branch -M main

# Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top tab navigation).
3. In the left sidebar, click **Pages** under the "Code and automation" section.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes. GitHub Pages will display:
   > *Your site is live at `https://<your-username>.github.io/<your-repo-name>/`*

### Step 4: Updating the Book
Whenever you edit or add new chapters:
```bash
git add .
git commit -m "docs: add new interview chapters"
git push origin main
```
GitHub Pages will automatically rebuild and deploy within minutes.

### Step 5: Troubleshooting Paths & Caching
- **Relative Asset Paths**: All assets and links use relative paths (`assets/...` or `../assets/...`), ensuring seamless functionality whether hosted at root domain (`https://book.example.com`) or subpath repository (`https://username.github.io/repo-name/`).
- **Storage Across Devices**: Note that chapter completion and bookmarks are stored safely in the browser's `localStorage` and will not automatically synchronize across different devices.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

