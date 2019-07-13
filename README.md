
## File Structure and Treatment
1. For all reusable components, must be placed in `/components`
2. For all that related to pages wrapper components (container), must be placed in `/pages`
3. For utilities related such as helper functions and reusable classnames, must be placed in `/utils`
(I used utilities classname to prevent any duplicated style rules and reduce css files)

## How to interact with app
1. Choose your pokemon character names, should be hovered when you moving around the cursor
2. When you click one of the character, the detail must be popped up with a modal dialog
3. If you don't see any character that you looking for, just scroll down, it should fetch as an infinite whenever you reached the bottom of the page

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.