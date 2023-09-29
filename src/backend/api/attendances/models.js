let { Schema, model, Types } = require('mongoose');

const attendanceSchema = new Schema(
  {
    employee: {
      type: Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    start: {
      type: Date,
      default: () => new Date(),
    },
    end: Date,

    createdOn: {
      type: Date,
      default: () => {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return today;
      },
    },
  },
  { versionKey: false }
);

const Attendance = model('Attendance', attendanceSchema, 'attendances');

module.exports = {
  Attendance,
};
