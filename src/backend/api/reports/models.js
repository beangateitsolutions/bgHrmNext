let { Schema, model, Types } = require('mongoose');

const reportSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    files: [String],

    employee: {
      type: Types.ObjectId,
      ref: 'Employee',
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ['pending', 'resolved'],
    },

    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { versionKey: false }
);

const Report = model('Report', reportSchema, 'reports');

module.exports = {
  Report,
};
