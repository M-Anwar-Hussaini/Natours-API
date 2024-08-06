import { Schema, model } from 'mongoose';
import validator from 'validator';
// import slugify from 'slugify';

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name.'],
      unique: true,
      validate: {
        validator: function (val) {
          validator.isAlpha(val);
        },
      },
      maxlength: [
        40,
        'A tour name must have less than or equal then 40 characters',
      ],
      minlength: [
        10,
        'A tour name must have more than or equal then 10 characters',
      ],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration.'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size.'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty.'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating must be above 1.0'],
      max: [5, 'A rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'The disount amount {VALUE} must be less that the price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    images: [String],
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document Middleware: runs before .save() and .create()

/*
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', function (next) {
  console.log('The second pre middleware is running');
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  console.log('The document saved successfully');
  next();
});
*/

// QUERY MIDDLWARE:
/*
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  console.log(`The query took ${Date.now() - this.start} milliseconds.`);
  next();
});
*/

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});

export default model('Tour', tourSchema);
