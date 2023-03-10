# Lostie &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/crococoders/lostie/blob/develop/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/crococoders/lostie/tree/develop/.github/ISSUE_TEMPLATE)

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand. —Martin Fowler

`Lostie` - document search aggregator for those who lost or found any personal document. The main idea is to help people with the search for the documents that they have lost. Currently, we support the following document types: Passport, National ID, Driver License, Bank Card. Please create issue if you have any suggestion for new document type.

## Documentation

- The event storming details are located in [Miro board](https://miro.com/app/board/uXjVP99l3a8=/?share_link_id=985749745364).
<img width="1584" alt="image" src="https://user-images.githubusercontent.com/31484186/217529663-fc4ecc37-368e-46db-be91-988f293ab355.png">

- An information about database tables and relationships you can find [here](https://dbdiagram.io/d/63a0735699cb1f3b55a246b0).

## Tech stack

We decided to implement this project using Monorepo and DDD approach. Here is the tech stack:

- root -> Lerna, Yarn Workspaces, Docker
- backend -> NodeJS, PostgreSQL, Sequelize ORM, Typescript
- telegram-bot -> Grammy, Typescript

## Contributing

The main purpose of this repository is to learn how to code with Domain-Driven Design approach by creating a client-server based application. We will be greatful if we learn with community together. Feel free to contibute. Read below to learn how you can contribute to a project.

- [Bug report](https://github.com/crococoders/lostie/blob/develop/.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature request](https://github.com/crococoders/lostie/blob/develop/.github/ISSUE_TEMPLATE/feature_request.md)
