# 💰 Finance App
Your partner for you finance health 💚

![Finance App](/.github/screenshots/cover.png "Finance App")

## :page_with_curl:  Description
If you want an app to manage your bakings, bills, accounts and trasactions, welcome. Here you can:
- Create an account as you want with Clerk.
- Manage transactions, accounts and categories.
- Import transactions from csv file.
- Take a look on the overview charts.
- Filter data for a period.
 
## :gear: Tech Stack
[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![next](https://skillicons.dev/icons?i=next "next")](https://nextjs.org/ "next") [![tailwind](https://skillicons.dev/icons?i=tailwind "tailwind")](https://tailwindcss.com/ "tailwind")  [![postgres](https://skillicons.dev/icons?i=postgres "postgres")](https://www.postgresql.org/ "postgres") [![vercel](https://skillicons.dev/icons?i=vercel "vercel")](https://vercel.com// "vercel") 

## 💻 How to run
1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Install the project dependencies using `npm install` or other similar.
4. Create `.env.local` file in root directory.
5. Contents of `.env.local` (.env.example):
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL="postgresql://<username>:<password>@<neon_host>/<dbname>?sslmode=require"

NEXT_PUBLIC_APP_URL=http://localhost:3000
```
5. Set up a Neon PostgreSQL Database
   - If you don't have a Neon PostgreSQL database, create one.
   - Obtain the database URL, which typically looks like `postgresql://<username>:<password>@<host>:<port>/<database-name>`.
6. Set up a Clerk App Authentication
  - Create or use your account on clerk and create an application.
  - Go to API Keys section and get the required keys.
7. The others env values you can just a copy.
8. Run `npm run db:migrate` for apply the migrations.
9. Open terminal and run `npm run dev` or similars. 
10. You can`npm run db:seed` for populate your database.


## :rocket: Follow Me

[![GitHub followers](https://img.shields.io/github/followers/pedrojorge148?style=social&label=Follow&maxAge=2592000)](https://github.com/pedrojorge148 "Follow Me") [![Linkedin Badge](https://img.shields.io/badge/-Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pedrojorge258/)](https://www.linkedin.com/in/pedrojorge258/)  [![Instagram Badge](https://img.shields.io/badge/-Instagram-purple?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/pedrojrg_)](https://www.instagram.com/pedrojrg_/)

## 📝 License

This project uses MIT License. You can see the file [LICENSE](LICENSE) for more details.

  ---