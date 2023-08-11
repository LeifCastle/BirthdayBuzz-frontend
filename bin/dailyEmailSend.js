#! /app/bin/node

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendScheduledEmail() {
  const data = {
    from: {
      email: "birthday.buzzx@gmail.com",
      name: "Birthday Buzz",
    },
    to: [
      {
        email: "leifurcastle@gmail.com",
        name: "Mr User",
      },
    ],
    subject: "Birthday Reminder!",
    text: "It's your birthday!",
    //send_at: 1617260400,
  };

  const response = await sgMail.send(data);

  if (response.statusCode === 202) {
    console.log("Email scheduled successfully!");
  } else {
    console.log(response.body);
  }
}

sendScheduledEmail();