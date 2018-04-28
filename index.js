require('dotenv').config();

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post('/api/email', (req, res) => {
  if (
    !req.body.email ||
    !req.body.numbers ||
    !req.body.facts
  ) {
    res.statusCode = 500;
    return res.json({
      errors: ['Failed to send the email']
    });
  }
  // Set up the SendGrid helper
  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('natanio@gmail.com');
  var to_email = new helper.Email(req.body.email);
  var subject = 'Your Factto Lotto numbers and facts!';
  var numbers = req.body.numbers.join(', ');
  var facts = Object.values(req.body.facts).join('\n');
  var content = new helper.Content('text/plain', `Hello from Factto Lotto!\n\n Your numbers are:\n ${numbers}\n\n The facts for these numbers are:\n ${facts}.`);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    if (error) {
      res.statusCode = 500;
      return res.json({
        errors: ['Failed to send the email']
      });
    }
    res.statusCode = 201;
    return res.json({
      success: 'Email was successfully sent.'
    })
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Number generator listening on ${port}`);