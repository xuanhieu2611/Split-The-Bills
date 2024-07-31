# Split The Bills

## A full stack web application that stores and equally divides shared bills among group members

This is my personal project which stores users' monthly bills and split them equally across all members. This is mainly used in a household or group of friends where everyone share their electrics, gas, groceries, dining out, etc.

- Constructed **React.js** and **Tailwind** to create a friendly-users responsive front end, navigate between pages using **React-router-dom** and authentication using **JWT** and **Cookie-parser**
- Built a backend server using **Node.js** that provides REST API endpoints to process, and store users’ bills in thedatabase
- Utilized **OpenAI’s API** to process uploaded images from users to get lists of items and total price of the bills automatically
- Leveraged SQL databases using **MySQL** and **Aiven** as a host to store and make complex SQL queries such as
  Aggregation with Group By/Having, and multiple Join statements to retrieve data about users’ transactions

## Try this at [split-the-bills-hieu.vercel.app](https://split-the-bills-hieu.vercel.app/)
