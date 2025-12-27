# Backend API Documentation 🔧

## Authentication

**How it works**
- Tokens are issued on registration/login and returned in the response as `token`. On login, a cookie named `token` is also set.
- To authenticate requests, send the token either as a cookie named `token` or as an HTTP header `Authorization: Bearer <token>`.
- Protected endpoints (user/captain profile, ride creation, map endpoints) require a valid token. Missing, invalid, or blacklisted tokens receive **401 Unauthorized** responses.

> Note: Validation errors are returned with status `400` and an `errors` array from `express-validator`.

---

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
  "token" : "<jwt-token>"
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
  "token": "<jwt-token>"
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

The request body must be valid JSON and include the following fields;

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
    },
    "socketId": null
  },
  "token": "<jwt-token>"
}
```

---

### `/captains/login` Endpoint

**Description**
Authenticates a captain using email and password and returns an access token on success (a cookie named `token` is also set).

**HTTP Method**
`POST`

---

### Request Body

- `email` (string) — **required**, must be a valid email address
- `password` (string) — **required**

---

### Responses

**200 OK** ✅

- Login successful. Example body:

```json
{
  "message": "Captain logged in successfully",
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
    },
    "socketId": null
  },
  "token": "<jwt-token>"
}
```

Note: A cookie named `token` is also set with the same value returned in the response.
---

### `/captains/profile` Endpoint

**Description**
Returns the authenticated captain's profile information.

**HTTP Method**
`GET`

---

### Responses

**200 OK** ✅
- Returns the authenticated captain's profile. Requires a valid authentication token (sent as a cookie `token` or in the `Authorization: Bearer <token>` header).

Example body:

```json
{
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
    },
    "socketId": null
  }
}
```

---

### `/captains/logout` Endpoint

**Description**
Logs out the authenticated captain and invalidates their current session/token.

**HTTP Method**
`GET`

---

### Responses

**200 OK** ✅
- Logout successful; token invalidated.

Example body:

```json
{ "message": "Captain logged out successfully" }
```

---

## Map Routes 🗺️

### `/maps/get-coordinates` Endpoint

**Description**
Returns latitude/longitude and a formatted address for a provided address string.

**HTTP Method**
`GET`

### Query Parameters

- `address` (string) — **required**, minimum **3** characters

### Responses

**200 OK** ✅

Returns coordinates and the formatted address.

Example body:

```json
{
  "lat": 6.5244,
  "lng": 3.3792,
  "formattedAddress": "Eko Atlantic, Lagos, Nigeria"
}
```

---

### `/maps/get-distance-time` Endpoint

**Description**
Returns distance and estimated travel time between two addresses.

**HTTP Method**
`GET`

### Query Parameters

- `origin` (string) — **required**, minimum **3** characters
- `destination` (string) — **required**, minimum **3** characters

### Responses

**200 OK** ✅

Example body:

```json
{
  "distance": { "text": "12.3 km", "value": 12300 },
  "time": { "text": "20 mins", "value": 1200 },
  "status": "OK"
}
```

---

### `/maps/get-suggestions` Endpoint

**Description**
Returns Google Places Autocomplete predictions for a partial query.

**HTTP Method**
`GET`

### Query Parameters

- `input` (string) — **required**, minimum **3** characters

### Responses

**200 OK** ✅

Returns an array of autocomplete prediction objects as returned by the Google Places API (see `services/map.service.js` for integration details).

Example body:

```json
[
  {
    "description": "Victoria Island, Lagos, Nigeria",
    "place_id": "...",
    "structured_formatting": { "main_text": "Victoria Island", "secondary_text": "Lagos, Nigeria" }
  }
]
```

---

## Ride Routes 🚕

### `/rides/create` Endpoint

**Description**
Creates a new ride request. Fare is calculated based on distance/time and the chosen vehicle type.

**HTTP Method**
`POST`

### Request Body

- `pickup` (string) — **required**
- `destination` (string) — **required**
- `vehicleType` (string) — **required**, one of `"car"`, `"auto"`, `"bike"`

### Responses

**201 Created** ✅

Returns the created ride object (note: `otp` is stored on the model with `select: false` and is not returned by default).

Example body:

```json
{
  "_id": "<ride-id>",
  "user": "<user-id>",
  "pickup": "Ikeja City Mall",
  "destination": "Victoria Island",
  "fare": 842.5,
  "status": "pending",
  "createdAt": "2025-12-27T...",
  "updatedAt": "2025-12-27T..."
}
```

---