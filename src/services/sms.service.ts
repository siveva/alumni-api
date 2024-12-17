import twilio from 'twilio';

const accountSid = "AC2f2d3e1f420aa7bcbf80aaf04fcd72b9";
const authToken = "252b06849aebd6871e6c5f9afe6bb198";
const from = "+12562554441";

export const sentTwilioSms = async (to: string, message: string) => {
  const client = twilio(accountSid, authToken);
  const response = await client.messages.create({
      body: message,
      from: from ,
      to: "+63" + to
  });
console.log('Message sent:', response.sid);
}