# go-wisata-backend
## About This Project

This project is build for rebuilding the existing project from Sebelas Maret University. (Built with Typescript, Express, Prisma);

## Clone project
```
git clone https://github.com/IlhamSetiaji/go-wisata-backend.git
```

## Change direction to project folder
```
cd go-wisata-backend
```

## Copy .env.example to .env
```
cp .env.example .env
```

## Change .env database url to your own database
```
DATABASE_URL="mysql://root:password@localhost:3306/yourdb?schema=public"
```

## Project setup
```
npm install
```

## Migrate the database
```
npx prisma db push
```

## Seed the database
```
npx prisma db seed
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Launch Web
```
http://127.0.0.1:3000/
```

### Launch API
```
http://127.0.0.1:3000/api/
```

