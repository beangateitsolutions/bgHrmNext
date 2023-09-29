# 🌍 POST `/auth/admins/login`

## Request Body

```ts
{
  email: string;
  password: string;
}
```

## Response Body

```ts
{
  token: string;
}
```

## Description

- Returns login token

---

# 🌍 POST `/auth/employees/login`

## Request Body

```ts
{
  email: string;
  password: string;
}
```

## Response Body

```ts
{
  token: string;
}
```

## Description

- Returns login token
- Also update `lastLogin` of the employee

---

# 🔒 POST `/auth/employees/logout`

## Description

- Update `lastLogout` of the employee