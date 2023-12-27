const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars').engine;

const app = express();

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  res.render('response', { message: 'Cảm ơn bạn đã đăng ký!' });
});

app.get('/feedback', (req, res) => {
  res.render('feedback');
});

app.post('/feedback', (req, res) => {
  let message = 'Cảm ơn phản hồi của bạn.';
  if (req.body.satisfaction === 'Not Satisfied') {
    message += ' Xin lỗi vì sự bất tiện này.';
  }
  res.render('response', { message: message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}\n`+`Server is running on http://localhost:${port}/feedback`));
