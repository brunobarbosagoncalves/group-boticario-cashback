import nodemailer from "nodemailer"

const SYSTEM_DOMAIN = process.env.SYSTEM_DOMAIN
const SYSTEM_NAME = process.env.SYSTEM_NAME
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL_SECURE = process.env.EMAIL_SECURE

export const getMailOptionsDefault = (_) => ({
  attachments: [],
  headers: {},
  from: `no-reply@${SYSTEM_NAME}_${SYSTEM_DOMAIN}.com.br`,
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  text: "",
  html: "",
})

export default function sendEmail(mailOptions) {
  const mailConfig = {
    ...getMailOptionsDefault(),
    ...mailOptions,
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })

  return new Promise((resolve, reject) =>
    transporter.sendMail(mailConfig, (err, info) => (err ? reject(err) : resolve(info)))
  )
}
