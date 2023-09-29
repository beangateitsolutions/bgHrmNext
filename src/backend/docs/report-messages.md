# 🔐 GET `/report-messages/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  report: ObjectId('Report');
}
```

## Response Body

```ts
{
  reportMessages: ReportMessage[];
  count: number;
}
```

## Description

- sortBy will always be `createdAt`
- sortOrder will always be `descending`
- Returns report messages as per the given query

---

# 🔐 POST `/report-messages/admins`

## Request Body (Form Data)

```ts
{
  message: string;
  files?: File[];
  report: ObjectId('Report');
}
```

## Response Body

```ts
{
  reportMessage: ReportMessage;
}
```

## Description

- Create new reportMessage

---

# 🔒 GET `/report-messages`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  report: ObjectId('Report');
}
```

## Response Body

```ts
{
  reportMessages: ReportMessage[];
  count: number;
}
```

## Description

- sortBy will always be `createdAt`
- sortOrder will always be `descending`
- Returns report messages as per the given query
- That report must belong to that employee

---

# 🔒 POST `/report-messages`

## Request Body (Form Data)

```ts
{
  message: string;
  files?: File[];
  report: ObjectId('Report');
}
```

## Response Body

```ts
{
  reportMessage: ReportMessage;
}
```

## Description

- Create new reportMessage