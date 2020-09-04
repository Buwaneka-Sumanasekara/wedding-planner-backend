# Wedding Planner APP



### Tech
We used following technoligies to develop this module

* [React-JS] - HTML enhanced for web apps!
* [Firebase] - Database / API / Authentication





### Installation

This app requires [Node.js](https://nodejs.org/)  to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd [PrjFolder]/parkit-reactjs
$ npm install
$ npm start
```
  
# Environment - Testing 
To Upload firebase functions for testing enviornemnt
```sh
$ cd [PrjFolder]/firebase-tools
$ firebase use default
$ firebase deploy --only functions
```

# Environment - Production
For production environments...
Deploy functions only

```sh
$ cd [PrjFolder]/firebase-tools
$ firebase use prod
$ firebase deploy --only functions
```

Deploy host only

```sh
$ cd [PrjFolder]/parkit-reactjs
$ cd npm run-script build
$ cd [PrjFolder]/firebase-tools
$ firebase use prod
$ firebase deploy --except functions
$ firebase deploy --only hosting
```


Local testing
```sh
$ cd functions
$ npm run hotReload
$ firebase serve --only functions

OR

$ firebase emulators:start --only functions
$ firebase serve --only functions
```

   [React-Js]: <https://reactjs.org/>
   [Firebase]: <http://firebase.google.com/>
  
