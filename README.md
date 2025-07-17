# HermesDB

HermesDB is an open-source project made for fun, learning, and sharing. Its goal is to let anyone—individuals or businesses—query their databases using natural language, without technical knowledge, and receive answers.

## What does HermesDB do?

HermesDB allows you to interact with your databases in two main ways:

1. **Querying the database structure:**  
   You can upload your database schema file (for example, a SQL file with your table definitions). This schema is provided as context to the AI, so you can ask questions about your database structure—such as what tables exist, what relationships are present, and more.

2. **Querying data in natural language:**  
   If you want to query actual data, just provide your database connection URL. From there, you can ask questions in natural language; the AI will generate the corresponding SQL query, execute it against your database, and return the results in a human-friendly format.

## Technologies Used

- **Frontend:** React
- **Backend:** Nest.js
- **AI Engine:** sqlcoder:7b-q4_K_S Chat model

## Main Contributors

This project has been mainly managed and developed by **Luis Alexander Peraza Corobo**, leading the project and primarily building the frontend, and **Oswaldo**, who took charge of the backend.

Special thanks to my teammates—and above all, friends—for their small (and not so small) contributions:

- **Anass El Jabiry Kaddir:** Designed the website icon and helped research the AI model.
- **Daniel Pérez Valverde:** Suggested using SQLCoder as the AI model and proposed several optimization ideas.
- **Juan Jose Lamas Ferrer:** Helped clarify the frontend design.
- **Ruben:** Assisted us in understanding the AI in greater depth.

Beyond the technical side, thank you all for being my friends and for sharing laughs, stories, and good times on Discord while working on this project.

---

**If you want to know more about the installation process, please refer to the README files in the `frontend` and `backend` folders.**

Feel free to contribute, suggest ideas, or just use HermesDB to make your database queries easier and more natural!