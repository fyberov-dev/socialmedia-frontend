# iti0302-2024-project

## Social Media

## Project introduction

Our social media platform is a modern community-driven application designed for users to engage in meaningful conversations, share posts, and participate in multiple group discussions, resembling features from platforms like Reddit.

### Key Features:
- Dynamic Chat System: Users can join and create multiple chats to discuss specific topics. Chats are managed by a creator and can have multiple participants. 
- Interactive Feed: Users can publish posts containing content, which other users can engage with through comments. 
- Role Management: The platform allows assigning specific roles to users, supporting administrative and moderation functionalities. 
- User-Centric Design: Each user has a personal profile with unique attributes, such as username, email, and secure password storage. 
- Community Engagement: Posts and comments form the backbone of community interactions, with timestamps for tracking the flow of discussions. 
- Scalable Structure: The database design ensures scalability, with many-to-many relationships (e.g., users and roles, users and chats) for flexible growth.

---
Backend:

* Springboot
* Jpa
* PostgreSQL
* Liquibase
* Mockito

Frontend:

* Vue
* Vite
* Pinia
* Tailwindcss
* DaisyUI
* Axios

## Getting started

### Prerequisities

- Nodejs
- Docker

### Startup using terminal

Clone the project:
```shell
git clone git@github.com:fyberov-dev/socialmedia-frontent.git
```

Install packages:
```shell
npm install
```

Launch the project:
```shell
npm run dev
```


### Build project

```shell
npm run build
```

### Startup using docker

Create network if it doesn't exist

```shell
docker network create backend
```

Launch docker
```shell
docker compose up
```
