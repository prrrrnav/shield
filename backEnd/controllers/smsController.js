const axios = require('axios');

const sendSMS = async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: '⚠️ Mobile number and message are required.' });
  }

  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message: message,
        language: 'english',
        flash: 0,
        numbers: number.toString(),
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({
      success: true,
      message: '✅ SMS sent successfully!',
      data: response.data,
    });
  } catch (error) {
    console.error('SMS send error:', error.response?.data || error.message);
    res.status(500).json({
      error: '❌ Failed to send SMS',
      details: error.response?.data || error.message,
    });
  }
};

module.exports = { sendSMS };
