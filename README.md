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

# Landing
![Landing](https://user-images.githubusercontent.com/47708181/147025843-7712d86d-ad25-4546-b484-29b7be2ee662.png)
![Recipes](https://user-images.githubusercontent.com/47708181/147025973-c6e7eb1d-4dc2-4406-8658-1ba9d1370584.png)
![Add Recipe](https://user-images.githubusercontent.com/47708181/147026085-48f53336-96ed-482d-b497-307474821b9b.png)
![Recipe](https://user-images.githubusercontent.com/47708181/147026092-0ff6618a-8726-4c90-b299-d292f6a57fdd.png)
![Profile](https://user-images.githubusercontent.com/47708181/147026099-fff41ced-3f5c-4be7-b2fb-f8e7de8c1182.png)
![Login](https://user-images.githubusercontent.com/47708181/147026106-029a1731-c35a-429b-a570-1e0afd1d2a91.png)
![Sign In](https://user-images.githubusercontent.com/47708181/147026479-ae1a91cd-0500-4aff-84bd-b29a3efd60e0.png)
