
const corsOpts = {
  origin: 'http://localhost:3000', // Allow only the frontend from localhost:3000 (in dev mode) or my doamin to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow cookies to be sent with requests
};

const corsOptsDev = {
  origin: '*', // For testing purposes, you can allow all origins in dev mode
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export { corsOpts, corsOptsDev };