# Online Shop – Hackathon Phase 1 Submission

## Overview
Welcome to my submission for **Hackathon Phase 1**! This repository contains a fully functional e-commerce application, demonstrating foundational **DevOps** skills in **Git & GitHub, Linux, and Docker**.

This project focuses on:
- **Git & GitHub:** Version control, branching, and collaboration.
- **Linux:** Command-line operations and system administration.
- **Docker:** Containerization best practices and deployment readiness.

---

## Tasks & Implementations

### 1. Chatbot Implementation (`Chatbot.jsx`)
- Created a chatbot component to assist users with common queries.
- Integrated the chatbot UI seamlessly into the application.
- Ensured responsiveness for mobile and desktop users.

### 2. Admin Panel Fixes (`Admin.jsx`)
- Fixed `updateProduct` function to properly update product details.
- Improved `deleteProduct` function by adding a confirmation prompt.

### 3. Font Size Adjustments
- Standardized font sizes for better readability across the application.
- Applied consistent typography using CSS.

### 4. CSS Improvements
- Enhanced UI/UX for **Admin** and **Store** pages.
- Improved margins, padding, and layout consistency.

### 5. Cart Functionality Fix
- Fixed issue where clicking the cart icon was not updating the state.
- Debugged and resolved React state management issues.

### 6. Search Feature
- Implemented a search bar to allow users to find products efficiently.
- Used `useState` and `filter()` for real-time searching.

### 7. Filter Feature
- Added filtering options for product categories and pricing.
- Improved user experience by enabling dynamic product filtering.

---

## Git & GitHub Workflow

### Cloning the Repository
```sh
git clone <repository_url>
cd <repository_name>
```

### Creating a Feature Branch
```sh
git checkout -b feature/chatbot
```

### Committing Changes
```sh
git add .
git commit -m "Implemented chatbot and fixed admin panel issues"
```

### Pushing Changes to GitHub
```sh
git push origin feature/chatbot
```

### Creating a Pull Request (PR)
- Open GitHub and navigate to the repository.
- Create a new Pull Request (PR) and provide a meaningful description.
- Merge changes after review.

---

## Linux Commands Used
```sh
# Navigate to project directory
cd /path/to/project

# Check Git status
git status

# View logs for debugging
tail -f /var/log/nginx/access.log

# Run the application locally
npm start
```

---

## Docker Containerization

### Dockerfile
```dockerfile
# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port and run the app
EXPOSE 3000
CMD ["npm", "start"]
```

### Building and Running the Container
```sh
docker build -t online-shop .
docker run -p 3000:3000 online-shop
```

### Checking Running Containers
```sh
docker ps
```

### Stopping and Removing Containers
```sh
docker stop <container_id>
docker rm <container_id>
```

---

## Next Steps
✅ Deploy the application to **AWS** or **Heroku**.  
✅ Implement **CI/CD pipelines** for automated deployment.  
✅ Enhance **security and performance optimizations**.  

---

💡 **Feel free to contribute, suggest improvements, or report any issues!** 🚀
