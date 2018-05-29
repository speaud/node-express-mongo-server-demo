import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as testCtrl from "./controllers/Test.ctrl";

// Express is a routing and middleware web framework
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle

// Creates and configures an Express
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance
  constructor() {
    this.express = express();
    this.middleware();
    this.controllers();
  }

  // Configure Express middleware
  private middleware(): void {
    // TODO: dev only
    this.express.use(logger('dev'));
    //
    this.express.use(bodyParser.json());
    //
    this.express.use(bodyParser.urlencoded({ extended: false }));


    this.express.use('/', (req, res, next) => {
      console.log('middleware for / path', Date.now())
      next()
    })

    this.express.use('/test', (req, res, next) => {
      console.log('middleware for /test path', req.method)
      next()
    })    
  }

  // Configure API endpoints.
  private controllers(): void {
    // app = express()
    // app.METHOD(PATH, HANDLER)
    // METHOD - get, post, put, delete

    /*

    // create chainable route handlers for a route path

    app.route('/book')
      .get((req, res) => {})
      .post((req, res) => {})
      .put((req, res) => {})
      .delete((req, res) => {})

    */

    //this.express.get('/test', testCtrl.testDefault);
    this.express.route('/test')
      .get(testCtrl.testDefault);
  }

  /*
  private modules

    // express.Router class is used to create modular, mountable route handlers
    // includes complete middleware and routing system
    // router = express.Router()

    // middleware that is specific to this router
    router.use(function timeLog (req, res, next) {
      console.log('Time: ', Date.now())
      next()
    })
    // define the home page route
    router.get('/', function (req, res) {
      res.send('Birds home page')
    })
    // define the about route
    router.get('/about', function (req, res) {
      res.send('About birds')
    })    

    module.exports = router

    -

    app.use('/birds', birds)

  */

}

export default new App().express;
