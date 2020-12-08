const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT
const smpt_login = process.env.SMPT_LOGIN
const smpt_passvord = process.env.SMPT_PASSWORD

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smpt_login, // generated ethereal user
    pass: smpt_passvord, // generated ethereal password
  },
})

app.get('/', (req, res) => {
  res.send('The server is running | ฅ(^◕ᴥ◕^)ฅ')
})

app.post('/send-message', async (req, res) => {

  let {name, email, subject, message} = req.body.values

  let info = await transporter.sendMail({
    from: 'Portfolio site vzyabs@gmail.com',
    to: 'vladzyaba@gmail.com',
    subject: subject,
    html: `<div>
    <div>Name: <b>${name}</b></div>
    <div>Email: <b>${email}</b></div>
    <div>message: <p>${message}</p></div>
</div>`,
  })

  res.send('send message')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
