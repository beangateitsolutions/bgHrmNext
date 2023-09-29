# 🔐 GET `/attendances/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  employee?: ObjectId('Employee');
  start?: Date;
  end?: Date;
  withEmployee?: boolean;
  sortBy?: 'start' | 'end' | 'createdOn';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  attendances: Attendance[],
  count: number;
}
```

## Description

- Returns attendances as per the given query
- `withEmployee` joins `Employee` collection in it

---

# 🔒 GET `/attendances`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  start?: Date;
  end?: Date;
  sortBy?: 'start' | 'end' | 'createdOn';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  attendances: Attendance[],
  count: number;
}
```

## Description

- Returns attendances as per the given query (of that employee only)

---

# 🔒 POST `/attendances`

## Response Body

```ts
{
  attendance: Attendance
}
```

## Description

- Create new attendance
- Check if an attendance with that day already exist
- Reject if the timing is greater than `10:30 IST`

---

# 🔒 PATCH `/attendances/:attendanceId`

## Response Body

```ts
{
  message: 'todays attendance completed'
}
```

## Description

- Update end time
- If end time already set, then fails
