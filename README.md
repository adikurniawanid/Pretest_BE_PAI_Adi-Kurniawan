## Pretest_BE_PAI_Adi-Kurniawan

## Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/13454122/2s935iumZM)

## Entity Relationship Diagram

```mermaid
erDiagram
    Conditions {
        varchar name
        integer id
    }

    Farms {
        varchar publicId
        varchar plant
        integer amount
        integer locationId
        integer conditionId
        integer userId
        timestamp  createdAt
        timestamp  updatedAt
        integer id
    }

    Locations {
        varchar province
        varchar city
        varchar district
        double lat
        double lon
        integer id
    }

    SequelizeMeta {
        varchar name
    }

    UserTokens {
        varchar refreshToken
        varchar forgotPasswordToken
        timestamp forgotPasswordTokenExpiredAt
        integer userId
    }

    Users {
        varchar publicId
        varchar name
        varchar email
        varchar password
        timestamp createdAt
        timestamp updatedAt
        integer id
    }

    Farms }|--||  Conditions : conditionId-id
    Farms  }|--||  Locations : locationId-id
    Farms  }|--||  Users : userId-id
    UserTokens  ||--||  Users : userId-id
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/adikurniawanid/Pretest_BE_PAI_Adi-Kurniawan.git
```

Go to the project directory

```bash
  cd express-secondhand-api
```

Install dependencies

```bash
  npm install
```

Create the database

```bash
  sequelize db:create
```

Migration the database

```bash
  sequelize db:migrate
```

Seeding the database

```bash
  sequelize db:seed:all
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DEV_DB_USERNAME`
`DEV_DB_PASSWORD`
`DEV_DB_NAME`
`DEV_DB_HOST`

`TEST_DB_USERNAME`
`TEST_DB_PASSWORD`
`TEST_DB_NAME`
`TEST_DB_HOST`

`DATABASE_URL`

`BCRYPT_SALT`

`JWT_SECRET_KEY`
`JWT_REFRESH_SECRET_KEY`
`JWT_EXPIRATION`
`JWT_REFRESH_EXPIRATION`

## Public API

[BMKG](https://data.bmkg.go.id/)
[BMKG-IMPORTER](https://ibnux.github.io/BMKG-importer/#pakai-langsung)

## Preview

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/13454122/2s935iumZM)

| {{API_URL}}/v1/farm/:publicId                      | {{API_URL}}/v1/farm                                  | {{API_URL}}/v1/auth/register                            |
| -------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| ![endpoint get farm](public/previewImages/get.jpg) | ![endpoint list farm](public/previewImages/list.jpg) | ![endpoint register](public/previewImages/register.jpg) |

## Tech Stack

**Server:** Node, Express, PostgreSQL
