<p align="center">
  <img src="public/furniscan-logo.png" alt="FurniScan Logo" width="120" />
</p>

<h1 align="center">🪑 FurniScan AI</h1>
<p align="center">
  <b>AI-powered Wooden Furniture Damage Detection & Reporting</b><br>
  <i>Scan, detect, and report wooden furniture damages in seconds!</i>
</p>

<p align="center">
  <a href="https://furni-scan-ai.vercel.app/"><img src="https://img.shields.io/badge/Live-Demo-green?style=flat-square&logo=vercel" alt="Live Demo"></a>
  <a href="https://github.com/POORNA-github/FurniScanAI"><img src="https://img.shields.io/github/stars/POORNA-github/FurniScanAI?style=flat-square" alt="GitHub stars"></a>
  <a href="https://github.com/POORNA-github/FurniScanAI/issues"><img src="https://img.shields.io/github/issues/POORNA-github/FurniScanAI?style=flat-square" alt="GitHub issues"></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
</p>

---

## 🚀 Technologies Used

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Roboflow-101010?style=for-the-badge&logo=roboflow&logoColor=white" alt="Roboflow" />
  <img src="https://img.shields.io/badge/jsPDF-FFB300?style=for-the-badge&logo=javascript&logoColor=white" alt="jsPDF" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</p>

---

## 🚀 Overview

**FurniScan AI** is a next-generation web application that leverages the power of artificial intelligence to detect and report damages in wooden furniture from images. The platform combines a robust React frontend, advanced AI models, and seamless cloud deployment to deliver instant, actionable insights for manufacturers, sellers, and homeowners.

### 🧠 How It Works

1. **Image Upload:** Users upload a photo of their wooden furniture through a modern, drag-and-drop interface built with React and TypeScript.
2. **AI Damage Detection:** The uploaded image is analyzed using the [Roboflow](https://roboflow.com/) `rfdetr-nano` model—a fast, lightweight, and highly accurate object detection model optimized for real-time inference. This model identifies and localizes various types of wooden damage (such as cracks, scratches, and dents) directly in the image.
3. **Results Visualization:** Detected damages are displayed on an interactive canvas with bounding boxes and labels, allowing users to visually inspect the findings.
4. **Cost Analysis & Reporting:** The app calculates repair costs based on customizable material and labor rates, and generates a professional PDF report using jsPDF.
5. **Conversational AI Support:** Users can interact with an AI-powered chatbot (powered by [Cohere](https://cohere.com/)) for instant answers, prevention tips, and further guidance.
6. **Cloud Deployment:** The entire application is deployed on [Vercel](https://vercel.com/) for fast, reliable, and scalable access from any device.

### 🛠️ Technologies Explained

- **React & TypeScript:** Provide a robust, type-safe, and scalable frontend architecture for building interactive UIs.
- **Tailwind CSS & CSS Variables:** Enable rapid, utility-first styling and dynamic theming for a modern, responsive design.
- **Roboflow rfdetr-nano Model:** A state-of-the-art, lightweight object detection model trained specifically for wooden damage detection. It offers a balance of speed and accuracy, making it ideal for real-time web applications.
- **Cohere Chatbot:** Integrates advanced natural language processing to deliver a conversational assistant that can answer questions, provide prevention guidelines, and enhance user engagement.
- **jsPDF:** Allows users to export detailed, visually rich PDF reports of detected damages and cost breakdowns.
- **Vercel:** Handles seamless cloud deployment, ensuring the app is always available, fast, and secure.

---

FurniScan AI brings together the latest in AI, web development, and user experience to make furniture damage assessment effortless, accurate, and accessible to everyone.

## 🧩 Key Components

| Component                | Purpose / Description                                 | Features                                      |
|--------------------------|------------------------------------------------------|-----------------------------------------------|
| `App`                    | Main application entry point                         | Routing, global state, layout                 |
| `ImageUploader`          | Upload and preview furniture images                  | Drag & drop, file validation, preview         |
| `DamageDetector`         | AI-powered damage detection logic                    | Calls Roboflow API, processes results         |
| `AnalysisCanvas`         | Visualizes detected damages on images                | Bounding boxes, zoom, pan                     |
| `ResultsPanel`           | Displays detection results and cost breakdown        | Material/labor cost, export to PDF            |
| `SettingsDialog`         | User configuration for costs and preferences         | Editable rates, persistent settings           |
| `ChatAssistant`          | AI-powered chatbot for user support                  | Gemini integration, prevention tips           |
| `HistoryViewer`          | Shows previous scans and reports                     | List, view, delete, export                    |
| `PDFExporter`            | Generates downloadable PDF reports                   | Customizable, includes images and results     |
| `Sidebar`                | Navigation and quick actions                         | New scan, history, settings                   |

## 🎨 Styling System

- **CSS Variables:** Dynamic theming support
- **Responsive Design:** Mobile-first approach
- **Modern Gradients:** Professional visual appeal
- **Accessibility:** WCAG 2.1 AA compliant

---

## ✨ Features

- 🔍 **AI-Powered Damage Detection**  
  Instantly detect scratches, cracks, and other damages in wooden furniture using advanced computer vision.

- 🖼️ **Easy Image Upload**  
  Upload photos of your furniture and get instant analysis.

- 📄 **Automated Damage Reports**  
  Generate downloadable PDF reports with detected damages and recommendations.

- 💬 **Chatbot Assistant**  
  Get real-time support and answers to your questions.

- 📊 **History & Insights**  
  View previous scans and track damage trends over time.

---

## 🖼️ Screenshots

<p align="center">
  <img src="screenshots/homepage.png" alt="FurniScan Homepage" width="700"/>
  <br>
  <em>Homepage - Upload and scan your furniture instantly</em>
</p>

<p align="center">
  <img src="screenshots/detection.png" alt="Damage Detection Example" width="700"/>
  <br>
  <em>AI-powered damage detection with bounding boxes</em>
</p>

<p align="center">
  <img src="screenshots/report.png" alt="PDF Report Example" width="700"/>
  <br>
  <em>Downloadable PDF damage report</em>
</p>
---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS, CSS Variables
- **AI Model:** Roboflow API (for damage detection)
- **Chatbot:** Cohere Command-R Plus model  (AI-powered conversational assistant)
- **PDF Generation:** jsPDF
- **Deployment:** Vercel

---
## 🔧 Development

FurniScan AI is built for easy local development and production deployment.  
Below are the most useful scripts you can run in your project:

## 📋 Available Scripts

| Script                | Description                                      |
|-----------------------|--------------------------------------------------|
| `npm start`           | Runs the app in development mode with hot reload |
| `npm run build`       | Builds the app for production to the `build` folder |
| `npm run lint`        | Runs ESLint to check code quality and style      |
| `npm run type-check`  | Checks TypeScript types (if applicable)          |
| `npm run analyze`     | Analyzes the production bundle size (optional)   |

### Example Usage

```bash
# Start development server
npm start

# Build for production
npm run build

# Lint your code
npm run lint

# Type-check your code
npm run type-check

# Analyze bundle size
npm run analyze


## 🚦 Quick Start

```bash
git clone https://github.com/POORNA-github/FurniScanAI.git
cd FurniScanAI
npm install
Set up environment variables:
Create a .env file in the root directory and add your API keys and URLs, for example:

env

REACT_APP_ROBOFLOW_API_URL=your_roboflow_api_url
REACT_APP_COHERE_API_KEY=your_cohere_api_key
Run the app locally:

Bash

npm start
Open http://localhost:3000 in your browser to use FurniScan AI.

