# Interview Scheduler
A application where an user can create, edit and delete interview appointments.  
This project was built with the project boilerplate: https://github.com/lighthouse-labs/scheduler/.  
The boilerplate was generated using [create-react-app](https://create-react-app.dev/).

## Table of Content

- [Live Demo](#live-demo)
- [Final Product](#final-product)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)

## Live Demo
https://scheduler-sc.netlify.app/

## Final Product

### Create appointment
![create](./docs/create.gif)
A user can book an interview in an empty appointment slot.

### Edit appointment
![](./docs/.gif)
Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.

### Cancel appointment
![](./docs/.gif)
A user can cancel an existing interview.
A user is presented with a confirmation when they attempt to cancel an interview.

### Update all clients
![](./docs/.gif)
The client application communicates with a WebSocket server.  
When a user books or cancels an interview, all connected users see the update in their browser. Number of spots are also updated.

### Navigation Bar
![nav-bar](./docs/nav-bar.gif)
A user can switch between weekdays.

### Handle empty input(s)
![input-error](./docs/input-error.gif)
A user cannot book an interview if the name is empty or no interviewer is selected.

### Handling Errors
A user is shown an error if an interview cannot be saved or deleted. When the user presses the close button of the error they are returned to the Form or Show view.

#### Create appointment
![](./docs/.gif)

#### Edit appointment
![edit-error](./docs/edit-error.gif)

#### Cancel appointment
![](./docs/.gif)

## Dependencies
- [React](https://reactjs.org/): library for building the user interface
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API): send a message to all connected clients when the data is updated
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/): convert JSX syntax
- [axios](https://axios-http.com/): fetch data with API
- [Storybook](https://storybook.js.org/): manually test components in isolation
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/): run entire application in development mode
- [Jest](https://jestjs.io/): run unit or integration tests from the command line
- [Testing Library](https://testing-library.com/) - contains helper functions for testing (such as the `render` function)
- [Cypress](https://www.cypress.io/): run automated end-to-end tests in the browser
- [prop-types](https://github.com/facebook/prop-types): runtime type checking for React props

## Getting Started

1. Clone this repository onto your local device.
2. Clone the [server repository](https://github.com/scc416/scheduler-api) onto your local device, follow the instructions on its `README.md`.
3. Install dependencies using the `npm install` command.
4. Run Webpack Development Server using the `npm start` command.

### Testing Commands
- Run Jest Test Framework using the `npm test` command.
- Run  Storybook Visual Testbed using the `npm run storybook` command.
- Run Cypress with `npm run cypress` command.

## File Structure
<pre>
📦scheduler
 ┣ 📂.circleci
 ┃ ┗ 📜config.yml
 ┣ 📂.storybook
 ┃ ┣ 📜addons.js
 ┃ ┣ 📜config.js
 ┃ ┗ 📜webpack.config.js
 ┣ 📂cypress
 ┃ ┣ 📂downloads
 ┃ ┣ 📂fixtures
 ┃ ┃ ┗ 📜example.json
 ┃ ┣ 📂integration
 ┃ ┃ ┣ 📜appointments.spec.js
 ┃ ┃ ┗ 📜navigation.spec.js
 ┃ ┣ 📂plugins
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📂support
 ┃ ┃ ┣ 📜commands.js
 ┃ ┃ ┗ 📜index.js
 ┣ 📂public
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜add.png
 ┃ ┃ ┣ 📜close.png
 ┃ ┃ ┣ 📜edit.png
 ┃ ┃ ┣ 📜lhl.png
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜status.png
 ┃ ┃ ┗ 📜trash.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┗ 📜manifest.json
 ┣ 📂src
 ┃ ┣ 📂__mocks__
 ┃ ┃ ┗ 📜axios.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Appointment
 ┃ ┃ ┃ ┣ 📜Confirm.js
 ┃ ┃ ┃ ┣ 📜Empty.js
 ┃ ┃ ┃ ┣ 📜Error.js
 ┃ ┃ ┃ ┣ 📜Form.js
 ┃ ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┃ ┣ 📜Show.js
 ┃ ┃ ┃ ┣ 📜Status.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┗ 📜styles.scss
 ┃ ┃ ┣ 📂__tests__
 ┃ ┃ ┃ ┣ 📜Application.test.js
 ┃ ┃ ┃ ┣ 📜Appointment.test.js
 ┃ ┃ ┃ ┣ 📜Button.test.js
 ┃ ┃ ┃ ┣ 📜DayListItem.test.js
 ┃ ┃ ┃ ┗ 📜Form.test.js
 ┃ ┃ ┣ 📜Application.js
 ┃ ┃ ┣ 📜Application.scss
 ┃ ┃ ┣ 📜Button.js
 ┃ ┃ ┣ 📜Button.scss
 ┃ ┃ ┣ 📜DayList.js
 ┃ ┃ ┣ 📜DayListItem.js
 ┃ ┃ ┣ 📜DayListItem.scss
 ┃ ┃ ┣ 📜InterviewerList.js
 ┃ ┃ ┣ 📜InterviewerList.scss
 ┃ ┃ ┣ 📜InterviewerListItem.js
 ┃ ┃ ┗ 📜InterviewerListItem.scss
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📜selectors.js
 ┃ ┃ ┗ 📜selectors.test.js
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂__tests__
 ┃ ┃ ┃ ┗ 📜useVisualMode.test.js
 ┃ ┃ ┣ 📜useApplicationData.js
 ┃ ┃ ┣ 📜useFormData.js
 ┃ ┃ ┗ 📜useVisualMode.js
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜animations.scss
 ┃ ┃ ┣ 📜mixins.scss
 ┃ ┃ ┣ 📜reset.scss
 ┃ ┃ ┣ 📜typography.scss
 ┃ ┃ ┗ 📜variables.scss
 ┃ ┣ 📜index.js
 ┃ ┣ 📜index.scss
 ┃ ┗ 📜setupTests.js
 ┣ 📂stories
 ┃ ┗ 📜index.js
 ┣ 📜.env.development
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜cypress.json
 ┣ 📜jsconfig.json
 ┣ 📜netlify.toml
 ┣ 📜package-lock.json
 ┗ 📜package.json
</pre>