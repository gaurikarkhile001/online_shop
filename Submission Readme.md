# Online Shop – Hackathon Phase 1 Submission

## Overview
Welcome to my submission for **Hackathon Phase 1**! This repository contains a fully functional e-commerce application, demonstrating foundational **DevOps** skills in **Git & GitHub, Linux, and Docker**.

This project focuses on:
- **Git & GitHub:** Version control, branching, and collaboration.
- **Linux:** Command-line operations, system administration, and security.
- **Docker:** Multi-stage builds, production-ready containers, and deployment.
- **Cloud Deployment:** Hosting on AWS EC2 with security best practices.

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
git clone https://github.com/gaurikarkhile001/online_shop.git
cd online_shop
```

### Creating a Feature Branch
```sh
git checkout -b gauri
```

### Committing Changes
```sh
git add .
git commit -m "Implemented chatbot and fixed admin panel issues"
```

### Pushing Changes to GitHub
```sh
git push origin gauri
```

### Creating a Pull Request (PR)
- Open GitHub and navigate to the repository.
- Create a new Pull Request (PR) and provide a meaningful description.
- Merge changes after review.

---

## Linux Commands Used

### Command Line Proficiency
```sh
# Navigate to project directory
cd /path/to/project

# Check Git status
git status

# View logs for debugging
tail -f /var/log/nginx/access.log

# Run the application locally
npm start

# Change file permissions
chmod +x script.sh

# Monitor running processes
ps aux | grep node

# Check memory usage
free -h

# List open network ports
netstat -tulnp
```

### System Administration Enhancements
- **User Permissions:** Ensured secure user access control using `chmod` and `chown`.
- **Process Monitoring:** Used `top`, `htop`, and `ps` to track application resource consumption.
- **Automated Scripts:** Implemented Bash scripts to streamline deployment tasks.
- **Log Management:** Utilized `journalctl` and `logrotate` for effective log handling.

---

## Docker Containerization

### Multi-Stage Production-Ready Dockerfile
```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package.json package-lock.json ./
RUN npm install --only=production
EXPOSE 5173
CMD ["npm", "start"]
```

### Building and Running the Container
```sh
docker build -t online-shop .
docker run -p 3000:3000 online-shop
```

### Managing Containers
```sh
# Check running containers
docker ps

# Stop a container
docker stop online-shop

# Remove a container
docker rm online-shop
```

---

## Cloud Deployment on AWS EC2

### Steps to Deploy
1. **Launch an EC2 Instance**
   - Choose an Ubuntu 22.04 AMI.
   - Select appropriate instance type (e.g., t2.micro for testing).
2. **SSH into Instance**
   ```sh
   ssh -i key.pem ubuntu@<EC2_PUBLIC_IP>
   ```
3. **Install Docker**
   ```sh
   sudo apt update && sudo apt install -y docker.io
   ```
4. **Run the Application**
   ```sh
   docker run -d -p 80:3000 online-shop
   ```
5. **Verify Deployment**
   - Open `http://3.252.146.56:5173/` in a browser.

---

## Security Enhancements

### Firewall Configuration
```sh
# Enable UFW firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny all other traffic
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### Additional Security Measures
- **SSL/TLS Encryption:** Set up HTTPS using Let's Encrypt.
- **Secure Database Access:** Restrict database connections to specific IPs.
- **Least Privilege Principle:** Use non-root users for running the application.
- **Regular Security Patching:** Automate updates with `unattended-upgrades`.

---

## Next Steps
✅ Deploy the application to **AWS**.
✅ Enhance **security and performance optimizations**.

---

💡 **Feel free to contribute, suggest improvements, or report any issues!** 🚀

