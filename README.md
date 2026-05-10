# Bachelor-Project-BAO304

Start up procedure

Put material (pdf, powerpoint files) that will be used for context into a folder
(you might need to create the folder yourself) under:
backend/canvas/courseMaterial/{name-of-your-course}

```bash
The following environment filest are required to start the application:
  frontend/.env
  frontend/.env.production

  Add lectures and other files into a folder named after the course code and put it into:
  backend/canvas/courseMaterial

  backend/gateway/src/main/resources
  application-env.yml

  backend/chat/src/main/resources
  application-env.yml

  backend/settings/src/main/resources
  application-env.yml

  backend/user/src/main/resources
  application-env.yml

  Rootfolder of the project (same as docker-compose.yml)
  .env
```

For development, we used PJ100-1 lecture slides and placed them into:
backend/canvas/courseMaterial/PJ100-1

Install Docker Desktop from: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

**Note**!

Kristiana sensors or users using IT managed computers, please note that you might need to request admin password from IT during installation of Docker Desktop in order to use virtualization in Docker. If Virtualization is not enabled the docker compose might not build resulting in an error.

Any time you want to run the backend, make sure Docker Desktop is running in the background

Go to the root folder of the entire project in the terminal ( \Bachelor-Project-BAO304 )
Run:

```bash
docker-compose --env-file .env up --build -d
```

This can take several minutes, especially for a first-time setup.
Check "Containers" in the Docker Desktop application, each service should have a green box
next to it and memory usage on any service should be above 0% when startup is complete.

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
cd frontend
npm i
npm run dev
```

Run the whole project from root directory

```
docker-compose up --build -d
cd frontend
npm i
npm run dev
```

Once the project has started you can transfer the data from canvas-service to chat-service.
First you will need to zip your target folder.

Confirm your folder is in the correct location with:

GET http://localhost:8010/api/canvas/allCourses

Now you can zip and transfer the .zip-folder using the API-call below, this can take several minutes:

GET http://localhost:8010/api/chat/downloadZip/courseId/{courseId}

if you are using the example course that would be:

GET http://localhost:8010/api/chat/downloadZip/courseId/PJ6100-1

Now the material should show up under backend/chat/downloads in a .zip folder
It will be unzipped and put into a folder matching the name of the .zip folder under backend/chat/courseMaterial

This process is meant to simulate the canvas-service getting lecture slides from the Canvas API and is split up into multiple parts
to better demonstrate the process. This process can take several minutes and is only meant to be done once per course you want in
the vector-database.

Only this last step needs to be repeated on a new docker-compose up:

Now you need to upload the lecture files to the local vector-db, this should not take to long:

GET http://localhost:8010/api/chat/uploadFromCourseMaterials/courseId/PJ6100-1

Now you can request the AI to reference data in the lecture slides, images in the files are not working at this stage
