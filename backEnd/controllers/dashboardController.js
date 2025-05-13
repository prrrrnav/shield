const User = require('../models/User');
const Report = require('../models/Report');
const Warning = require('../models/Warning');
const Fir = require('../models/Fir');

// Get victim dashboard (progress, reports, warnings, FIR status)
const getDashboard = async (req, res) => {
    try {
        const { victimId } = req.query;

        if (!victimId) {
            return res.status(400).json({ message: 'Victim ID is required' });
        }

        // Fetch the victim's data
        const victim = await User.findById(victimId);
        if (!victim) {
            return res.status(404).json({ message: 'Victim not found' });
        }

        // Fetch all reports related to the victim
        const reports = await Report.find({ victim: victimId });

        // Fetch all warnings for the harassers associated with the victim's reports
        const warnings = await Warning.find({ harasser: { $in: reports.map(report => report._id) } });

        // Check if an FIR has been lodged for the victim
        const fir = await Fir.findOne({ victim: victimId, status: 'Filed' });

        // Prepare dashboard data
        const dashboardData = {
            victimId,
            victimName: victim.name,
            totalReports: reports.length,
            totalWarnings: warnings.length,
            reports: reports.map(report => ({
                description: report.description,
                status: report.status,
                evidences: report.evidences,
            })),
            firStatus: fir ? fir.status : 'No FIR filed yet',
            firDetails: fir ? fir.firDetails : 'No FIR details available',
            warnings: warnings.map(warning => ({
                reason: warning.reason,
                explanation: warning.harasserExplanation || 'No explanation provided',
                dateIssued: warning.createdAt,
            }))
        };

        return res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    getDashboard
};
