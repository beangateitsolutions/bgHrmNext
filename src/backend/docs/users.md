# 🔒 GET `/employees`

## Response Body

```ts
{
  employee: Employee;
}
```

## Description

- Returns employee profile
- Will fail if account is disabled

---

# 🔒 PATCH `/employees`

## Request Body (Form Data)

```ts
{
  password?: string;
  image?: File;
}
```

## Response Body

```ts
{
  message: string;
  token?: string;
}
```

## Description

- Update employee details
- If password is given, it will return the token as per new password so that frontend can update the token immediately
- Also delete the previous image if exist

---

# 🔐 POST `/employees/admins`

## Request Body (Form data)

```ts
{
  name: string;
  phone: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  image: File;
}
```

## Response Body

```ts
{
  employee: Employee;
}
```

## Description

- Create a employee account with given data
- Also update the Misc collection with latest Id

---

# 🔐 GET `/employees/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  employeeId?: number;
  name?: string;
  email?: string;
  gender?: 'male' | 'female';
  disabled?: boolean;
  sortBy?: 'employeeId' | 'name' | 'email' | 'createdAt' | 'updatedAt' | 'lastLogin' | 'lastLogout';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  employees: Employee[],
  count: number;
}
```

## Description

- Returns employees as per the given query

---

# 🔐 PATCH `/employees/admins/:employeeId`

## Request Body (Form Data)

```ts
{
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  image?: File;
}
```

## Response Body

```ts
{
  message: string;
}
```

## Description

- Update employee information

---

# 🔐 DELETE `/employees/admins/:employeeId`

## Request Body

```ts
{
  disableReason: string;
}
```

## Response Body

```ts
{
  message: string;
}
```

## Description

- Disables an active employee

---

# 🔐 GET `/clients/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  _id?: ObjectId('Client');
  name?: string;
  email?: string;
  gender?: 'male' | 'female';
  phone?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  clients: Client[],
  count: number;
}
```

## Description

- Returns clients as per the given query

---

# 🔐 GET `/clients/admins/:clientId`

## Response Body

```ts
{
  client: Client;
}
```

## Description

- Returns client profile

---

# 🔐 POST `/clients/admins`

## Request Body

```ts
{
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  image?: File;
}
```

## Response Body

```ts
{
  client: Client;
}
```

## Description

- Create new client
- Check if a client with this email/phone already exist

---

# 🔐 PATCH `/clients/admins/:clientId`

## Request Body

```ts
{
  name?: string;
  phone?: string;
  email?: string;
  gender?: 'male' | 'female';
  image?: File;
}
```

## Description

- Update client details

---

# 🔐 DELETE `/clients/admins/:clientId`

## Response Body

```ts
{
  message: 'client deleted successfully';
}
```

## Description

- Delete a client

---

# 🔐 GET `/interns/admins`

## Request Query

```ts
{
  limit?: number;
  page?: number;
  _id?: ObjectId('Intern');
  name?: string;
  email?: string;
  phone?: string;
  gender?: 'male' | 'female';
  sortBy?: 'name' | 'endAt' | 'createdAt' | 'updatedAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
  interns: Intern[],
  count: number;
}
```

## Description

- Returns interns as per the given query

---

# 🔐 GET `/interns/admins/:internId`

## Response Body

```ts
{
  intern: Intern;
}
```

## Description

- Returns intern profile

---

# 🔐 POST `/interns/admins`

## Request Body

```ts
{
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  image: File;
}
```

## Response Body

```ts
{
  intern: Intern;
}
```

## Description

- Create new intern
- Check if a intern with this email/phone already exist

---

# 🔐 PATCH `/interns/admins/:internId`

## Request Body

```ts
{
  name?: string;
  phone?: string;
  email?: string;
  gender?: 'male' | 'female';
  image?: File;
  endAt?: Date;
}
```

## Description

- Update intern details

---

# 🔐 DELETE `/interns/admins/:internId`

## Response Body

```ts
{
  message: 'intern deleted successfully';
}
```

## Description

- Delete an intern
