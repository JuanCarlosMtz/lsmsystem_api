const ProgressService = require ('../services/progress.js');

module.exports = {
    getAllProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.getAllProgress();
            res.status(200).json(progress) 
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },

    getProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.getProgress(req.params.employeeid);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },

    getTotalProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.getTotalProgress(req.params.organizationid);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },

    createProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.createProgress(req.body);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    },

    updateProgress : async (req, res, next) => {
        try {
            const progress = await ProgressService.updateProgress(req.body);
            res.status(200).json(progress)
        } catch (err) {
            res.status(500).json({"message": `Error while getting progress. Err: ${err}`});
        }
    }
};