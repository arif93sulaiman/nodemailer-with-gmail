var http = require('http');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var port = 3030;

var app = express();
//static folder
app.use('/public',express.static(path.join(__dirname, 'public')));

//view engine setup
//to view static template in views directories
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/send', (req, res) => {

	const letter = `
		<h1>Email From Node Mailer</h1>

		<h3>Details Contacts</h3>
		<ul>
			<li>Name: ${req.body.name}</li><br>
			<li>Email: ${req.body.mail}</li><br>
			<li>Subject: ${req.body.subject}</li>
		</ul>
		<br>
		<p>Messages: ${req.body.message}</p>
	`;

	let transporter = nodeMailer.createTransport ({
	    service: 'Gmail',
	    /*port: 587,
	    secure: false, // use TLS*/
	    auth: {
	        user: '*****@gmail.com',
	        pass: '******'
	    },
	    tls: {
	        // do not fail on invalid certs
	        rejectUnauthorized: false
	    }
	});

	// setup email data with unicode symbols
    let mailOptions = {
        from: '"Arif Nodejs 👻" <nodejstest@gmail.com>', // sender address
        to: '******@gmail.com', // list of receivers
        subject: 'Nodejs Sent Email ✔', // Subject line
        text: 'Lets Make it Happened', // plain text body
        html: letter // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

});


app.listen(port, () => {console.log(`Server Running at Port = ${port}..`)});

