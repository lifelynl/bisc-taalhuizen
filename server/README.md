## Conduction APIs

This project doesn't have a database, instead we use APIs that are made available by Conduction to store and fetch data. In order to connect to their APIs you need to get a token from them and set this in `API_KEY` in `server/.env` file.

### Available APIs (with documentation)

The APIs are available in a few separate "components", for example Person, Organisation, Email and Address entities are handled by the **Contacten Catalogus** component ([link](https://taalhuizen-bisc.commonground.nu/api/v1/cc)) and User entity is handled by the **User Component** ([link](https://taalhuizen-bisc.commonground.nu/api/v1/uc)).

-   https://taalhuizen-bisc.commonground.nu/api/v1/uc
-   https://taalhuizen-bisc.commonground.nu/api/v1/cc
-   https://taalhuizen-bisc.commonground.nu/api/v1/edu
-   maybe more, you can search for messages in Slack #\_bisc-taalhuizen that contain `dev.zuid-drecht.nl` and `taalhuizen-bisc.commonground.nu`

### REST vs GraphQL

All actions are available via REST and (from what we've seen) most of them are also available through GraphQL. URL format for the GraphQL endpoint for each component is: https://taalhuizen-bisc.commonground.nu/api/v1/{component}/graphql

We use GraphQL because it seemed to be the easiest way of querying the APIs.

---

## Backend architecture

This is a bit outdated: ~~We now have domain/module directories for Person, Program and User. When starting out with the app that felt like a good way of separating the domains, but maybe Contact, Education and User would be better names since the Conduction APIs are also named that way. Or maybe an entirely different structure would be even better. Please improve.~~

We use repositories to fetch/store data just like we always do, but now the repositories interact with Conduction APIs instead of a Postgres database.

> Frontend app <--> Backend app <--> Conduction APIs

All objects in Conduction databases have an ID that can be represented in 2 ways:

1. Full URI: `https://taalhuizen-bisc.commonground.nu/api/v1/wrc/organizations/12e0cd5a-6f52-4719-b310-4b2b50fcc076`
2. Small ID: `organizations/12e0cd5a-6f52-4719-b310-4b2b50fcc076`

Thoughout our entire app we should use the full URI, only the repositories should change full URI into small ID when neccesary. We want to use the full URI to prevent confusion since both CC and WRC API's can have objects with ID `organizations/XXXX`. We need the full URI to know what kind of object we're dealing with. When interacting with Conduction API's we have to use the full URI when referencing an object from API A in action on API B, for example: on the UC API we can find users by ID and then we use the small ID, but when we find users by personId then we need to use the full URI personId because Person exists in a different API (CC).

Our backend should be completely stateless because it will be hosted in Kubernetes.

---

## Authentication

We should implement our own authenticaton solution between our frontend and our backend. The **User Component** API has a login action, but it is not available through GraphQL, instead we can make a POST request to https://taalhuizen-bisc.commonground.nu/api/v1/uc/login :

```
curl --request POST \
  --url https://taalhuizen-bisc.commonground.nu/api/v1/uc/login \
  --header 'Authorization: <API_KEY token>' \
  --header 'Content-Type: application/json' \
  --data '{"username":"<SOME USERNAME>","password":"<SOME PASSWORD>"}'
```
