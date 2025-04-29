const Warning = require('../models/Warning');
const User = require('../models/User');

exports.giveWarning = async (req, res) => {
    try {
        const { harasserId, reason } = req.body;

        const warning = new Warning({
            harasser: harasserId,
            reason
        });

        await warning.save();

        const warningCount = await Warning.countDocuments({ harasser: harasserId });

        let message = `Warning issued successfully. Total warnings: ${warningCount}`;

        if (warningCount >= 3) {
            message += ' ❗ Eligible for FIR filing.';
        }

        res.status(201).json({ message, warningCount });
    } catch (error) {
        res.status(500).json({ message: 'Failed to issue warning.', error });
    }
};
