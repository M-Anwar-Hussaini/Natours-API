import Tour from '../models/tourModel.js';

export const getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // 1) Filtering
    let queryObj = { ...req.query };
    const excluded = ['page', 'sort', 'limit', 'fields'];
    excluded.forEach((e) => delete queryObj[e]);
    const queryString = JSON.stringify(queryObj).replace(
      /\b(lt|lte|gt|gte)\b/g,
      (match) => `$${match}`,
    );
    queryObj = JSON.parse(queryString);
    // 2) Advanced Filtering
    console.log(queryObj);
    const query = Tour.find(queryObj);
    const tours = await query;

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'The tour was successfully deleted',
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
