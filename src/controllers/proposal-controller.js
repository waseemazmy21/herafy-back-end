import Proposal from '../models/proposal.js';
import User from '../models/user.js';
import Job from '../models/job.js';

export const createProposal = async (req, res) => {
  try {
    const { jobId, message, proposedBudget } = req.body;
    const craftsmanId = req.craftsmanId;

    // Check if the job exists and is open
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json('Job not found');
    }

    if (job.status !== 'open') {
      return res.status(400).json('Job is not open for proposals');
    }

    const proposal = new Proposal({
      craftsmanId,
      jobId,
      message,
      proposedBudget,
    });

    await proposal.save();

    res.json('Proposal submitted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all proposals of a craftsman
export const getProposalsByCraftsmanId = async (req, res) => {
  try {
    const craftsmanId = req.craftsmanId;
    const proposals = await Proposal.find({ craftsmanId: craftsmanId });
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json('Internal Server Error');
  }
};

// Get all proposals for a job
export const getProposalsByJobId = async (req, res) => {
  try {
    const jobId = req.params.id;
    const proposals = await Proposal.find({ jobId: jobId }).populate(
      'craftsmanId',
      'name'
    );
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json('Internal Server Error');
  }
};

// Accept a proposal
export const acceptProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;

    // Find the proposal to be accepted
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json('Proposal not found');
    }

    // Find the job related to the proposal
    const job = await Job.findById(proposal.jobId);
    if (!job) {
      return res.status(404).json('Job not found');
    }

    // Update the job status to 'closed'
    job.status = 'closed';
    await job.save();

    // Update the accepted proposal status to 'accepted'
    proposal.status = 'accepted';
    await proposal.save();

    // Update all other proposals for the same job to 'rejected'
    await Proposal.updateMany(
      { jobId: proposal.jobId, _id: { $ne: proposalId } },
      { status: 'rejected' }
    );

    res.json('Proposal accepted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
