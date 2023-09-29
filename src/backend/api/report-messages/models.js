let { Schema, model, Types } = require('mongoose');

const reportMessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    files: [String],

    report: {
      type: Types.ObjectId,
      ref: 'Report',
      required: true,
    },

    sentBy: {
      type: String,
      required: true,
      enum: ['admin', 'employee'],
    },

    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { versionKey: false }
);

const ReportMessage = model(
  'ReportMessage',
  reportMessageSchema,
  'report-messages'
);

module.exports = {
  ReportMessage,
};
