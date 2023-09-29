# Admin

```ts
{
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}
```

# Employee

```ts
{
  _id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: 'male' | 'female';
  image: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  lastLogout?: Date;
  emailOtp?: string;
  emailOtpExpiry?: Date;
  disabled?: boolean;
  disableReason?: string;
  disabledAt?: Date;
}
```

# client

```ts
{
  _id: ObjectId;
  name: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  image?: Image;
  createdAt: Date;
}
```

# Intern

```ts
{
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  image: string;
  endAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

# Attendance

```ts
{
  _id: string;
  employee: ObjectId('Employee');
  start: Date;
  end?: Date;
  createdOn: Date;
}
```

# Project

```ts
{
  _id: ObjectId;
  title: string;
  description: string;
  client?: ObjectId('Client');
  files?: string[];
  duration: number; // in days
  status:'pending'|'completed'|'cancelled';
  createdAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}
```

# ProjectMember

```ts
{
  _id: ObjectId;
  project: ObjectId('Project');
  employee?: ObjectId('Employee');
  intern?: ObjectId('Intern');
  createdAt: Date;
}
```

# Report

```ts
{
  _id: ObjectId;
  message: string;
  files?: File[];
  employee: ObjectId('Employee');
  status: 'pending' | 'resolved';
  createdAt: Date;
}
```

# ReportMessage

```ts
{
  _id: string;
  message: string;
  files?: File[];
  report: ObjectId('Report');
  sentBy: 'admin' | 'employee';
  createdAt: Date;
}
```

# Misc

```ts
{
  _id: 'unique';
  latestEmployeeId: number;
}
```
