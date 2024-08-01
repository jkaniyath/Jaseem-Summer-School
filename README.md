# Jaseem-Summer-School

# Summer School Java Script 2024

# Project Overview
The purpose of this test plan is to outline the testing strategy for the front-end functionalities of the e-commerce website [Sign in ]. The primary focus is on validating the user login process, product browsing, adding items to the cart, checking out items from the cart, and successfully logging out.

# Setup and Installation
## Prerequisites
* Node.js (version 12 or higher)
* npm (Node Package Manager)
* VS Code
* Cypress
* Install Git


## npm scripts

### To Initialize project
npm init -y

### To install cypress
npm install cypress --save-dev

### Code formatting

This project uses 'prettier' package to format code. Run the following command to format all files:
"npx prettier . --write"

### To start Cypress
npx cypress open

### Code structure
- **cypress/**: The main directory for Cypress tests and configurations.
  - **coe-webstore/**: Contains end-to-end tests (e2e.cy.js) for the main project, including scenarios for logging in, adding items to the cart, checking out, and successfully logging out.
  - **ready-to-automate/**: Contains extra test cases which includes Login with unregistered creditials, Apply discount, Edit phone number functionalities.
  - **pageElements/**: Contains all class files for page elements and supporting functions for cypress files.
  - **screenshots/**: Contains screenshots of failed tests.
  - **support/**: Contains helper functions,and custom commands.

### You can access all the source code in the GitHub account. [github link](https://github.com/jkaniyath/Jaseem-Summer-School/tree/main)



