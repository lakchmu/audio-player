import Koa from 'koa';
import next from 'next';
import Router from 'koa-router';
import session from 'koa-generic-session';
import passport from '../middlewares/passport';
import DynamoDBStore from 'koa-session-dynamodb-store';
// import User from '../models/user';

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

console.log('next:', next);

const options = {
  table: {
    autoCreate: true,
    useTtlExpired: true,
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
  },
  dynamoConfig: {
    region: 'local',
    endpoint: 'http://localhost:8000',
  },
};
import bodyParser from 'koa-bodyparser';

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['secret'];

  server.use(session({
    store: new DynamoDBStore(options),
  }));

  server.use(bodyParser());

  server.use(passport.initialize());
  server.use(passport.session());

  router.post('/api/login', async (ctx:any) => {
    // console.log('Helllllllo', ctx);
    // console.log(ctx.req.body); // your POST params
    // console.log(ctx.params); // URL params, like :id);

    ctx.respond = await passport.authenticate('local', {}, async (err, user) => {
      console.log('Hey: ', user, err);

      if (!user || err) {
        ctx.throw(401, 'Incorrect login/password');
      }

      ctx.login(user, (err) => {
        if (err) {
          ctx.throw(401, err.message);
        }
        ctx.status = 200;
        ctx.body = user;
      });
    })(ctx);
  })

  router.all('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})