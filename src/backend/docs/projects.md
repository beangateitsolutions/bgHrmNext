# 🔐 GET `/projects/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  _id?: ObjectId('project');
  key?: string;
  client?: ObjectId('Client');
  withClient?: boolean;
  status?: 'pending' | 'completed' | 'cancelled';
  sortBy?: 'duration' | 'createdAt' | 'completedAt' | 'cancelledAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  projects: Project[];
  count: number;
}
```

## Description

- Returns projects as per the given query
- key will search from `title` and `description`
- `withClient` joins Client collection

---

# 🔐 GET `/projects/admins/:projectId`

## Response Body

```ts
{
  project: Project;
}
```

## Description

- Returns project details
- Returns with client details as well

---

# 🔐 POST `/projects/admins`

## Request Body (Form Data)

```ts
{
  title: string;
  description: string;
  client?: ObjectId('Client');
  files?: File[];
  duration: number;
}
```

## Response Body

```ts
{
  project: Project;
}
```

## Description

- Create new project

---

# 🔐 PATCH `/projects/admins/:projectId`

## Request Body

```ts
{
  title?: string;
  description?: string;
  duration?: number;
  status?: 'completed' | 'cancelled';
}
```

## Description

- Update project details
- If project is `completed`, `cancelled`, then it fails

---

# 🔒 GET `/projects`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  _id?: number;
  key?: string;
  withClient?: boolean;
  status?: 'pending' | 'completed' | 'cancelled';
  sortBy?: 'duration' | 'createdAt' | 'completedAt' | 'cancelledAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  projects: Project[];
  count: number;
}
```

## Description

- Returns projects as per the given query
- key will search from title and description
- `withClient` joins Client collection

---

# 🔒 GET `/projects/:projectId`

## Response Body

```ts
{
  project: Project;
}
```

## Description

- Returns project details
- Returns with client details as well
