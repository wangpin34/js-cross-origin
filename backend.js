'use strict';

const Hapi = require('hapi');
const Good = require('good');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 8000 
});

// Add the route
server.route({
  method: 'GET',
  path:'/users', 
  config: {
    jsonp: 'callback',
  },
  handler: function (request, reply) {
    console.log('------------');
    console.log(request.query );
    const jsonp = request.query.jsonp;
    const users = [ { id: '1', name: 'Ada'}, { id: '2', name: 'Bob' } ];
    
    if (jsonp) {
      return reply(`${jsonp}(${users})`);
    } else {
      return reply(users);
    }
    
  }
});




server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
          module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {

  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start((err) => {

    if (err) {
      throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});