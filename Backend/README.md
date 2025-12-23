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

---

## `/users/profile` Endpoint

**Description**
Returns the authenticated user's profile information.

**HTTP Method**
`GET`

---

### Responses

**200 OK** ✅
- Returns the authenticated user's sanitized profile. Requires a valid authentication token (sent as a cookie `token` or in the `Authorization: Bearer <token>` header).

Example body:

```json
{
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

---

## `/users/logout` Endpoint

**Description**
Logs out the authenticated user and invalidates their current session/token.

**HTTP Method**
`GET`

---

### Responses

**200 OK** ✅
- Logout successful; token invalidated.

Example body:

```json
{ "message": "Logged out successfully" }
```

---

## Captain Routes 🚗

### `/captains/register` Endpoint

**Description**
Registers a new captain (driver) including vehicle information and returns an authentication token on success.

**HTTP Method**
`POST`

---

### Request Body

The request body must be valid JSON and include the following fields; validation rules are enforced by `express-validator` in `captain.routes.js`:

- `fullname` (object)
  - `firstname` (string) — **required**, minimum **3** characters
  - `lastname` (string) — optional, minimum **3** characters if provided
- `email` (string) — **required**, must be a valid email address
- `password` (string) — **required**, minimum **8** characters
- `phone` (string) — **required**
- `vehicle` (object)
  - `color` (string) — **required**, minimum **3** characters
  - `plate` (string) — **required**, minimum **3** characters
  - `capacity` (integer) — **required**, minimum **1**
  - `vehicleType` (string) — **required**, one of `bike`, `car`, `auto`

---

### Responses

**201 Created** ✅

- Captain created successfully. Example response body:

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "_id": "<captain-id>",
    "fullname": { "firstname": "John", "lastname": "Smith" },
    "email": "john.smith@example.com",
    "phone": "0700000000",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "bbb23hdsvbhhbdbbb"
}
```

---
