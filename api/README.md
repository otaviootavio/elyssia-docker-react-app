# Elypay

## 🚧 Under construction 🛠️💡

Ely Pay leverages the robust and flexible capabilities of [ElysiaJS](https://elysiajs.com/) to offer an efficient solution for managing financial transactions, particularly in scenarios where bills need to be split among multiple individuals.

## Development

To start the development server run:

```bash
bun run dev
```

Seed the database ( currently stored on memory runtime)

```bash
bun run seed
```

```bash
bun run test
```

Open http://localhost:3000/ with your browser to see the result.

## See the swagger!

```bash
bun run dev
```

Then access `http://localhost:3000/swagger`

### Prisma

We are using Prisma.

### Set up postgres

It is configured to connect with postres. Setup the docker:

```bash
docker compose up postgres
```

Access the docker and setup database:
Start the db on dockercompose

```bash
docker exec -it <image-id> bash
```

```bash
bunx prisma generate
```

```bash
bunx prisma migrate dev
```

```bash
bunx prisma db push
```

### Known error:

[Bun doesn't run prisma generate or prisma migrate inside docker containers or WSL](https://github.com/oven-sh/bun/issues/5320)
Solution: use only the docker postgres and run the app locally. To dockerize the application there is some work arround at dockerfile.

[Error occurred during query execution: ConnectorError code:26000](https://github.com/prisma/prisma/issues/21531)
Solution: add `pgbouncer=true` at the end of `DATABASE_URL`

[Cloud run + mysql + prisma](https://stackoverflow.com/questions/76853144/how-to-connect-a-mysql-database-from-node-js-prisma-running-on-google-cloud-run)

### Building to dev

```bash
docker build --pull -t elypay-dev .
```

```bash
docker run -d -p 3000:3000 elypay-dev
```
