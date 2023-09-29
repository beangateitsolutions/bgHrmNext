let { Schema, model, Types } = require('mongoose');

const projectMemberSchema = new Schema(
  {
    project: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    employee: {
      type: Types.ObjectId,
      ref: 'Employee',
    },
    intern: {
      type: Types.ObjectId,
      ref: 'Intern',
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { versionKey: false }
);

const ProjectMember = model(
  'ProjectMember',
  projectMemberSchema,
  'project-members'
);

module.exports = {
  ProjectMember,
};
