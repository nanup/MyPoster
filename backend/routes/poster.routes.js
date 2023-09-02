const express = require('express');
const { check } = require('express-validator');

const verifyJwt = require('../middleware/verifyJwt.middleware');

const posterRouter = express.Router();
const postersController = require('../controllers/poster.controllers');

posterRouter.get('/:posterId', postersController.getPosterByPosterId);
posterRouter.get('/user/:userId', postersController.getPostersByUserId);

posterRouter.use(verifyJwt);

posterRouter.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('year').isLength({ min: 4, max: 4 }),
    check('imageUrl').not().isEmpty(),
  ],
  postersController.postPoster
);

posterRouter.patch(
  '/:posterId',
  [
    check('title').not().isEmpty(),
    check('year').isLength({ min: 4, max: 4 }),
    check('imageUrl').not().isEmpty(),
  ],
  postersController.patchPosterById
);

posterRouter.delete('/:posterId', postersController.deletePosterById);

module.exports = posterRouter;
