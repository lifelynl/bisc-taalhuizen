# BiSC Taalhuizen Platform

Welcome to the BiSC Taalhuizen Platform, a comprehensive management solution designed specifically for Taalhuizen (Language Houses). This platform offers a user-friendly interface for Taalhuizen coordinators, volunteers, students, and course providers, streamlining the process of managing language learning and integration courses.

## Key Features

-   _Student Management_: Easily manage student profiles, track their progress, and view their course assignments. Our platform provides Taalhuizen with the tools to efficiently oversee student information and learning journeys.
-   _Volunteer Coordination_: Volunteers are the backbone of Taalhuizen. Our platform facilitates the management of volunteer profiles, their availability, and assignments to various roles or tasks, ensuring that the support for students is organized and effective.
-   _Course Management_: Taalhuizen coordinators can browse, select, and manage courses offered by various providers. This feature allows for the seamless allocation of courses to students, ensuring they receive the education that best suits their needs.
-   _Provider Portal_: Course Providers have dedicated access to manage their course offerings, view incoming students, and assign them to appropriate courses. This direct link between Taalhuizen and Providers ensures a smooth transition for students embarking on their learning paths.
-   _Student-Provider Redirection_: A unique feature of the BiSC Taalhuizen Platform is the ability for Taalhuizen to redirect students to Course Providers. This ensures that students are matched with courses that align with their learning requirements and goals.

## Getting Started

To begin using the BiSC Taalhuizen Platform, please follow these steps:

-   _Registration_: Taalhuizen coordinators, volunteers, and course providers need to register on the platform to gain access to their respective modules.
-   _Profile Setup_: After registration, users can set up their profiles, including relevant information that will help in the management and coordination of courses and volunteers.
-   _Course and Student Management_: Start adding courses, managing student profiles, and coordinating with volunteers and course providers through the intuitive dashboard.
-   _Support and Feedback_: Our platform is designed to be intuitive and user-friendly. However, should you need support or wish to provide feedback, our team is ready to assist.

The BiSC Taalhuizen Platform is your all-in-one solution for managing language education and integration efforts. Whether you are a Taalhuis coordinator, a volunteer, a student, or a course provider, our platform is designed to facilitate your role in the education process. Welcome aboard, and let's work together towards a future where language education is accessible and efficient for all.

## Contributing to the source code

### System prerequisites

-   [nvm][1]
-   [docker][2]
-   [vscode][3] (recommended)

### Recommended Tools

A database managment tool such as [TablePlus](https://tableplus.com/) for inspecting the database.

<br />

### 1. Install dependencies & setup

-   for client, `cd client && nvm use && npm install`
-   for server, `cd server && nvm use && npm install --legacy-peer-deps`

### 2. Setup environment settings for the server

#### .env

`cd server && npm run copyenv`

### 3. Startup (local)

For quick start with [itermocil][3] from the root, run `npm start`.

Otherwise, for:

-   client -> `cd client && npm start`
-   server -> `cd server && npm run start:debug`
-   services (database, mailcatcher) -> `cd server && npm run start-services`

```bash
cd client && npm start # To start the frontend
cd server && npm start:debug # To start the backend
cd server && npm start:services # To start the nest application

# wait until nest app is running
cd client && npm run codegen # To generate graphql stuff
cd server && npm run codegen # To generate graphql stuff
```

Go to [http://localhost:3000](http://localhost:3000) to view the app in the browser.

#### Database migrations

Once the server is running, migrations can be run with the following command:

`cd server && npm run mikro:migration:up`

##### Resetting

If the migration:up command above is erroring, or if you need to start from a fresh state, run `cd server && npm run mikro:migration:fresh`. This script will also trigger the initial seed mentioned below.

##### Creating

-   To create a blank migration run `cd server && npm run mikro:migration:create`.
-   To create a migration for the schema diff, run `cd server && npm run mikro:migration:generate`.

In the migrations folder, edit the auto generated name to include a description of the migration's purpose. Formation should be `Migration*timestamp*-description-of-migration-purpose.ts`

##### Seeding

If you don't have a production db dump & would like to seed the db with a root user & bisc organization, run `cd server && npm run initial-seed` which will:

-   create a test user with `root@bisc.nl` as email/username & `password` as password
-   insert postal codes needed for language house use

### Database dump and restore

Before dumping and restoring, make sure your local database container is running. This allows you to use its pg_dump and pg_restore commands. This has no relation to your running database: the arguments control where from/to the data is dumped/restored. Run your local container by running:

    $ cd server
    $ npm run start-services

The container's name should be `bisc-top_postgres_1`.

#### Dump command

The `/backups` directory in this repository is gitignored, so you can use that directory to keep your database dumps.

For remote dumps:

    $ docker exec -i bisc-top_postgres_1 pg_dump --host=[hostname] --username=[db-username] -v -Fc [db-name] > backups/[date]-[env].dump

For local dumps:

    $ docker exec -i bisc-top_postgres_1 pg_dump --username=postgres -v -Fc bisc-top > backups/[date]-local.dump

The password of the local database can be found in `/server/.env`.

#### Restore command

Please note: the `-c` arguments cleans the database before restoring.

For remote restores:

    $ docker exec -i bisc-top_postgres_1 pg_restore --host=[hostname] --username=[db-username] -c -v --no-owner -d [db-name] < [source-dump-file]

For local restores:

    $ docker exec -i bisc-top_postgres_1 pg_restore --username=postgres -c -v --no-owner -d bisc-top < [source-dump-file]

### Deployment

Deployments are done through Lifely’s internal CI/CD pipelines via Jenkins. For further insight into the configuration and the triggered tasks, refer to the devops directory. If you need a version deployed to any of the live environments, contact ops or the team leads.

---

[1]: https://github.com/nvm-sh/nvm
[2]: https://www.docker.com/
[3]: https://code.visualstudio.com/
[4]: https://github.com/TomAnthony/itermocil
