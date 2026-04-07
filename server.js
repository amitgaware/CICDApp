const express = require('express');
const app = express();
const PORT = 3000;

// 🔽 Prometheus setup
const client = require('prom-client');

// collect default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

// custom metric: count HTTP requests
const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of requests',
});

// middleware to count every request
app.use((req, res, next) => {
  httpRequests.inc();
  next();
});

// your existing route
app.get('/', (req, res) => {
  res.send('HELLO WORLD!!!');
});

// 🔽 metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// ✅ IMPORTANT: Only start server if NOT in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// ✅ Export app for testing
module.exports = app;
