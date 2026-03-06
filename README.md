# Bachelor-Project-BAO304

Start up procedure

Install Docker Desktop from:[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

Any time you want to run the backend, make sure Docker Desktop is running in the background

Go to the root folder of the entire project in the terminal ( \Bachelor-Project-BAO304 )
Run:
```bash
docker-compose up --build -d
```

This can take some time, maybe a couple minutes.
Check "Containers" in the Docker Desktop application, each service should have a green box next to it

To stop the services run:
```bash
docker-compose down
```

To stop the services and wipe the databases, instead run:
```bash
docker-compose down -v
```

to run frontend:
from root use the following command
```bash
cd frontend && npm run dev
```
