#Owl B Baking Backend

## Development
```
//clone from github
git clone https://github.com/turnkeyz/CIS-4375-Project/tree/main/backend.git

//cd into folder and install packages
npm install

//create proper .env file in root folder of the project
//run in development mode
npm run dev
```

## Production/Deployment

After finishing in development environment proceed to Production/Deployment phase.

```
npm run build --clean
npm start
```

## Purpose
The backend serves as a means to communicate with the ms sql server configured in AWS RDS service. This allows queries to be processed for orders, customers, carts, etc.

