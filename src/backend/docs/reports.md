# 🔐 GET `/reports/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  message?: string;
  employee?: ObjectId('Employee');
  status?: 'pending' | 'resolved';
  withEmployee?: boolean;
  sortBy?: 'createdAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  reports: Report[],
  count: number;
}
```

## Description

- Returns reports as per the given query
- `withEmployee` joins `Employee` collection in it

---

# 🔐 GET `/reports/admins/:reportId`

## Response Body

```ts
{
  report: Report;
}
```

## Description

- Returns report details
- Returns with employee details as well

---

# 🔐 PATCH `/reports/admins/:reportId`

## Request Body

```ts
{
  status: 'resolved';
}
```

## Description

- Update report details
- If report is `resolved`, then it fails

---

# 🔒 GET `/reports`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  message?: string;
  status?: 'pending' | 'resolved';
  sortBy?: 'createdAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  reports: Report[],
  count: number;
}
```

## Description

- Returns reports as per the given query (of that employee only)

---

# 🔒 GET `/reports/:reportId`

## Response Body

```ts
{
  report: Report;
}
```

## Description

- Returns report details

---

# 🔒 POST `/reports`

## Request Body (Form Data)

```ts
{
  message: string;
  files?: File[];
}
```

## Response Body

```ts
{
  report: Report
}
```

## Description

- Create new report
