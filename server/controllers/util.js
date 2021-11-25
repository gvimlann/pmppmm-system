import AWS from "aws-sdk";

export const sendEmail = async (req, res) => {
  console.log("Send Email");
  res.json({ success: true });
};
