# 🌟 Cloud Code Studio
🚀 Overview
Cloud Code Studio is a cutting-edge, cloud-based development environment designed to provide developers with a seamless and powerful coding experience. Whether you're writing JavaScript, managing files, or using a Linux terminal, Cloud Code Studio offers all the tools you need, right in your browser.

## ✨ Key Features
- Run Code: Execute your Language code instantly within the integrated terminal.
- File Management: Create, edit, and delete files with a simple and vs code friendly interface.
- Linux Terminal: Access a fully functional terminal with the power of Linux, all within your browser.
- AI-Assisted Coding: Improve your code with real-time AI suggestions and enhancements, boosting productivity and code quality with Google Gemini.

## 🛠️ Technology Stack
- Frontend & Backend: Built using Next.js and Node js.
- Containerization: Leveraging Docker to provide isolated, on-demand environments for each user.
- AI Integration: Google Gemini.

## System Design
## Why Scalable
Docker containers are spun up dynamically for each user session. When a user clicks the "Start Coding" button, a new Docker container is created, providing an isolated environment with its own terminal and file system.

## Run Locally if my deployed link not working
### Prerequisites
- Node js
- Download Node js from https://nodejs.org/en
- Docker desktop and Engine
- Downlaod docker desktop from https://www.docker.com/products/docker-desktop/
- Download docker engine form https://docs.docker.com/engine/install/


## Installation
- Clone repo -> Open frontend -> Open terminal within the same folder -> run ```` npm i ```` 
- Now open backend folder -> open terminal within the same folder -> run ```` npm i ```` 
- Now open your docker desktop app and it will start your docker container
- Now open windows terminal and run ````docker pull yesutkarshverma/container:v1.0 ````
- - It may takes time depending upon on your internet connection as docker image size is around 1.5 gb
- do not close docker desktop app throughout the process
- Now go back to frontend and open terminal and run ```` npm run dev ```` 
- Now go back to backend and open terminal and run ```` node app.js ```` 
- now type http://localhost:3000/ on chrome and run your app


