import express from 'express';
import {
  createProposal,
  getProposalsByCraftsmanId,
  getProposalsByJobId,
  acceptProposal,
  addRatingToUser,
} from '../controllers/proposal-controller.js';
import checkCraftsmanRole from '../middlewares/check-craftsman-role-mw.js';
import checkClientRole from '../middlewares/check-client-role-mw.js';

const router = express.Router();

// POST /api/proposals
router.post('/', checkCraftsmanRole, createProposal);

// GET /api/proposals/craftsman
router.get('/craftsman', checkCraftsmanRole, getProposalsByCraftsmanId);

// GET /api/proposals/job/:id
router.get('/job/:id', checkClientRole, getProposalsByJobId);

router.patch('/accept/:proposalId', checkClientRole, acceptProposal);

router.post('/:id/addrating', addRatingToUser);

export default router;
