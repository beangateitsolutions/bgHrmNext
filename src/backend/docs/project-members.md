# 🔐 GET `/project-members/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  project?: ObjectId('Project');
  withProject?: boolean;
  employee?: ObjectId('Employee');
  withEmployee?: boolean;
  intern?: ObjectId('Intern');
  withIntern?: boolean;
  sortBy?: 'createdAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  projectMembers: ProjectMember[];
  count: number;
}
```

## Description

- Returns project-members as per the given query
- `withProject`, `withEmployee` and `withIntern` joins the corresponding collection and returns nested data

---

# 🔐 POST `/project-members/admins`

## Request Body

```ts
{
  project: ObjectId('Project');
  employee?: ObjectId('Employee');
  intern?: ObjectId('Intern');
}
```

## Response Body

```ts
{
  projectMember: ProjectMember;
}
```

## Description

- Create new project member
- Check if that member already exist for that project

---

# 🔐 DELETE `/project-members/admins/:projectMemberId`

## Response Body

```ts
{
  message: 'project member deleted successfully';
}
```

## Description

- Delete a project member

---

# 🔒 GET `/project-members`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  project?: ObjectId('Project');
  withProject?: boolean;
  withEmployee?: boolean;
  withIntern?: boolean;
  sortBy?: 'createdAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  projectMembers: ProjectMember[],
  count: number;
}
```

## Description

- Returns project-members as per the given query
- `withProject`, `withEmployee` and `withIntern` joins the corresponding collection and returns nested data
