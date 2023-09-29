let { Schema, model } = require('mongoose');

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Admin = model('Admin', adminSchema, 'admins');

const employeeSchema = new Schema(
  {
    employeeId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    disabledReason: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },

    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },

    lastLogin: Date,
    lastLogout: Date,
    emailOtp: String,
    emailOtpExpiry: Date,
    disabled: Boolean,
    disableReason: String,
    disabledAt: Date,
  },
  { versionKey: false }
);

employeeSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

employeeSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Employee = model('Employee', employeeSchema, 'employees');

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    image: String,

    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { versionKey: false }
);

const Client = model('Client', clientSchema, 'clients');

const internSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    image: String,
    endAt: Date,
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { versionKey: false }
);

internSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

internSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Intern = model('Intern', internSchema, 'interns');

const miscSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    latestEmployeeId: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Misc = model('Misc', miscSchema, 'misc');

module.exports = {
  Admin,
  Employee,
  Client,
  Intern,
  Misc,
};
