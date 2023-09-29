let { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    client: {
      type: Types.ObjectId,
      ref: 'Client',
    },

    files: {
      type: [String],
    },

    duration: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'cancelled'],
    },

    createdAt: {
      type: Date,
      default: () => new Date(),
    },

    completedAt: Date,
    cancelledAt: Date,
  },
  { versionKey: false }
);

const Project = model('Project', projectSchema, 'projects');

module.exports = {
  Project,
};
