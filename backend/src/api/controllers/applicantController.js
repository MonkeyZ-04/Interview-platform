class ApplicantController {
    async createApplicant(req, res) {
        // Logic to create a new applicant
        try {
            // Extract applicant data from request body
            const applicantData = req.body;
            // Save applicant to the database (implementation not shown)
            const newApplicant = await Applicant.create(applicantData);
            return res.status(201).json(newApplicant);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating applicant', error });
        }
    }

    async getApplicants(req, res) {
        // Logic to retrieve all applicants
        try {
            const applicants = await Applicant.find(); // Fetch all applicants from the database
            return res.status(200).json(applicants);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving applicants', error });
        }
    }

    async getApplicantById(req, res) {
        // Logic to retrieve a single applicant by ID
        try {
            const { id } = req.params;
            const applicant = await Applicant.findById(id); // Fetch applicant by ID
            if (!applicant) {
                return res.status(404).json({ message: 'Applicant not found' });
            }
            return res.status(200).json(applicant);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving applicant', error });
        }
    }

    async updateApplicant(req, res) {
        // Logic to update an existing applicant
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedApplicant = await Applicant.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedApplicant) {
                return res.status(404).json({ message: 'Applicant not found' });
            }
            return res.status(200).json(updatedApplicant);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating applicant', error });
        }
    }

    async deleteApplicant(req, res) {
        // Logic to delete an applicant
        try {
            const { id } = req.params;
            const deletedApplicant = await Applicant.findByIdAndDelete(id);
            if (!deletedApplicant) {
                return res.status(404).json({ message: 'Applicant not found' });
            }
            return res.status(204).send(); // No content to send back
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting applicant', error });
        }
    }
}

module.exports = new ApplicantController();