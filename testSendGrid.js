// const msg = {
//   to: "leifurcastle@gmail.com", // Change to your recipient
//   from: "birthday.buzzx@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

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
    text: "It's ashley's birthday!",
    send_at: 1617260400,
  };

  const response = await sgMail.send(data);

  if (response.statusCode === 202) {
    console.log("Email scheduled successfully!");
  } else {
    console.log(response.body);
  }
}

sendScheduledEmail();
