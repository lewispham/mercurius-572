const fastify = require("fastify");
const mercurius = require("mercurius");

const app = fastify();

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`

const resolvers = {
  Query: {
    add: async (_, { x, y }) => {
        return x + y;
    }
  }
}

app.register(mercurius, {
  schema,
  resolvers,
  errorFormatter: (result) => {
    let statusCode = 500;
    console.log("ERRORS", result.errors);
    if (result.errors) {
        const firstError = result.errors[0];
        if (firstError.extensions) {
            statusCode = firstError.extensions.statusCode;
        }
    }
    return {
        statusCode,
        response: result
    };
}
})

app.get('/', async function (req, reply) {
  const query = '{ add(x: 2, y: 2) }'
  return reply.graphql(query)
})

app.listen(4000);