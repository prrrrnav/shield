const FIR = require('../models/Fir');

exports.lodgeFIR = async (req, res) => {
    try {
        const { victimId, accusedId, firDetails, victimConsent } = req.body;

        if (!victimConsent) {
            return res.status(400).json({ message: 'Victim consent required to lodge FIR.' });
        }

        const newFIR = new FIR({
            victim: victimId,
            accused: accusedId,
            firDetails,
            lodgedByAdmin: req.user.id,
            victimConsent,
            status: 'Pending'
        });

        await newFIR.save();

        res.status(201).json({ message: 'FIR lodged successfully.', fir: newFIR });
    } catch (error) {
        res.status(500).json({ message: 'Failed to lodge FIR.', error });
    }
};
