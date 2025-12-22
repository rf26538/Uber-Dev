# Backend API Documentation 🔧

## `/users/register` Endpoint

**Description**
Registers a new user by creating an account with the provided information.

**HTTP Method**
`POST`

---

### Request Body

The request body must be valid JSON and include the following fields; validation rules are enforced by `express-validator` in `user.routes.js`:

- `fullname` (object)
  - `firstname` (string) — **required**, minimum **3** characters
  - `lastname` (string) — optional, minimum **3** characters if provided
- `email` (string) — **required**, must be a valid email address
- `password` (string) — **required**, minimum **8** characters

### Responses

**201 Created** ✅

- User was created successfully.

Example body:

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  },
  "token" : "bbb23hdsvbhhbdbbb"
}

```

---

## `/users/login` Endpoint

**Description**
Authenticates a user with email and password and returns an access token on success.

**HTTP Method**
`POST`

---

### Request Body

The request body must be valid JSON and include the following fields:

- `email` (string) — **required**, must be a valid email address
- `password` (string) — **required**, minimum **8** characters

**Example request**

```json
{
  "email": "jane.doe@example.com",
  "password": "s3cureP@ssw0rd"
}
```

---

### Responses

**200 OK** ✅

- Authentication successful. Returns a JSON object with a token and a sanitized user object.

Example body:

```json
{
  "message": "Login successful",
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  },
  "token": "bbb23hdsvbhhbdbbb"
}
```
