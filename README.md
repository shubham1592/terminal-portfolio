# Shubham Kumar — Developer Portfolio

Welcome to the repository for my personal portfolio website. This site is a fusion of retro terminal aesthetics and modern web design, built to showcase my background, technical skills, and project work as a Senior Data Engineer and current MS Computer Science student at Northeastern University, Boston.

## 🧠 About the Site

This is a dynamic single-page portfolio website designed with a "retro terminal + modern UI" theme. It includes:

- Smooth scroll navigation
- Interactive project and profile cards
- Custom bottom dock (Mac-like)
- Retro-styled code animations and typewriter text
- Fully responsive layout
- Embedded Spotify playlist
- Interactive contact form with email functionality
- Easter egg section ("Beyond Code") highlighting interests beyond tech
- **NEW**: One-click resume download functionality
- **NEW**: Smooth scroll to contact section from landing page

## 🚀 Features

- **Landing Page**: Terminal-style typewriter introduction with download resume and contact buttons
- **About Me**: Animated, keyword-highlighted terminal lines
- **Projects**: Clickable project cards with animations
- **Tech Stack**: Icons and categories styled in a retro grid
- **Beyond Code**: Music, blog, hackathon, and personal fun facts
- **Contact**: Interactive form with email functionality and hover-animated icons
- **Smooth scrolling**: All navigation is smooth and fluid
- **Fully responsive**: Optimized for all screen sizes
- **Resume Download**: Direct download of PDF resume from Google Drive
- **Quick Contact Access**: Instant smooth scroll to contact section from hero

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion (for animations)
- Nodemailer (for email functionality)
- Lucide Icons
- Terminal-inspired custom CSS

## 🖥️ Live Demo

You can view the live version of this portfolio at:

- to be added later

## 🧩 Sections Overview

- **Experience**: Expandable-Collapsible experiences in detail.
- **Projects**: Includes 6 key projects (3 academic + 3 professional), like:
  - Sensei: AI-powered onboarding assistant built with GPT-4o and LangChain
  - Data Lake Optimizer: Cost-saving Spark framework
  - Chess Engine with Parallel Computing
- **Tech Stack**: Categorized view of tools and languages used professionally
- **Beyond Code**: Includes Spotify playlist, blogs, guitar events, and hackathon history
- **Contact**: Reach out for full-time opportunities, internships, collaborations, or feedback

## 🆕 Latest Updates

### Version 2.1.0 (Latest)
- ✅ **Resume Download**: Added one-click resume download functionality from Google Drive
- ✅ **Smooth Contact Navigation**: Enhanced "Contact Shubham" button with smooth scroll to contact section
- ✅ **Updated Contact Information**: Fixed email address in contact icons section
- ✅ **Improved User Experience**: Better navigation flow and accessibility

## 📝 How to Use / Run Locally

1. Clone the repository

   ```bash
   git clone https://github.com/shubham1592/terminal-portfolio.git
   ```

2. Navigate to the project folder

   ```bash
   cd terminal-portfolio
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Create a .env file in the root directory with your Gmail credentials:

   ```
   GMAIL_USER="your-email@gmail.com"
   GMAIL_APP_PASSWORD="your-app-password"
   GITHUB_URL="your-github-profile-url"
   LINKEDIN_URL="your-linkedin-profile-url"
   NAME="Your Name"
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

6. Start the email server (in a separate terminal)

   ```bash
   node server.js
   ```

7. Open your browser and visit:
   - Local: http://localhost:5176
   - Network: http://your-local-ip:5176 (for testing on other devices)

## 🚀 Deployment

This project is configured for deployment on Render. To deploy:

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the following environment variables in Render:
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_APP_PASSWORD`: Your Gmail app password
   - `GITHUB_URL`: Your GitHub profile URL
   - `LINKEDIN_URL`: Your LinkedIn profile URL
   - `NAME`: Your name
5. Deploy!

The `render.yaml` file is already configured with the necessary settings.

## 🙋‍♂️ Contact

Feel free to connect with me:

- Email: pi.shubham1592@gmail.com
- LinkedIn: https://www.linkedin.com/in/shubhamkumar1592/
- GitHub: https://github.com/shubham1592

## 📄 License

- This project is not open-source. All rights reserved © 2025 Shubham Kumar.

Thanks for visiting!
