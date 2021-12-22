# Description
This pages is a social network to share recipes. The users can register and start following users they find interesting.

# Technologies
All the code in this page is made with **Typescript**.

### Backend
The backend of this page is a **GraphQL** server made with **NodeJS** and **Apollo Server**. The querys and resolvers are made with the [TypeGrapqhQL](https://typegraphql.com) 
library. Authentication is made with **JWT**. To upload photos the server use **Cloudinary** as a host. All the data is saved in a **Postgres** database.

### Frontend
The fronted is made in **React** with **NextJS** framework from Server Side Rendering. All the styles are made by me with **Sass** modules. The comunication between the 
client and the server is made with **Apollo Client** for React. Also I use [GraphQL Code Generator](https://www.graphql-code-generator.com) to automatically generate
all my Types, Mutations and Querys. The validation for the forms is made with **Formik** and **Yup**. Also I use [Sweet Alerts](https://sweetalert2.github.io/) to 
show success, error and loading modals.
