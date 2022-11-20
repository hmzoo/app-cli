const app = require('./server');
console.log("ok",app.listen)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});