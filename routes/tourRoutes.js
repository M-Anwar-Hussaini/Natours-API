import express from 'express';
import {
  getAllTours,
  checkID,
  checkBody,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
