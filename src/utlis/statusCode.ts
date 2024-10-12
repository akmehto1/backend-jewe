// statusCodes.js
export const StatusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};




// Here’s a list of common HTTP status codes that you can use when handling various scenarios in an API (like during user registration):

// ### **Informational (100–199)**:
// 1. **100 Continue**: The server has received the request headers, and the client should proceed to send the request body.
// 2. **101 Switching Protocols**: The requester has asked the server to switch protocols, and the server has agreed to do so.

// ### **Success (200–299)**:
// 1. **200 OK**: The request was successful (used for GET, POST, PUT, DELETE, etc.).
// 2. **201 Created**: The request was successful, and a resource has been created (used for successful POST requests).
// 3. **202 Accepted**: The request has been accepted for processing, but the processing is not yet complete.
// 4. **204 No Content**: The request was successful, but there is no content to send back (often used with DELETE requests).

// ### **Redirection (300–399)**:
// 1. **301 Moved Permanently**: The resource has been moved permanently to a new URL.
// 2. **302 Found**: The resource has been found, but temporarily resides at a different URL.
// 3. **304 Not Modified**: There is no need to retransmit the requested resource, as the client’s cached version is up to date.

// ### **Client Errors (400–499)**:
// 1. **400 Bad Request**: The request could not be understood by the server due to malformed syntax.
// 2. **401 Unauthorized**: The request requires user authentication (used for protected resources when authentication fails or is not provided).
// 3. **403 Forbidden**: The server understood the request, but refuses to authorize it (used when permissions are lacking).
// 4. **404 Not Found**: The requested resource could not be found on the server.
// 5. **405 Method Not Allowed**: The request method is not allowed for the resource (e.g., trying to use POST when only GET is allowed).
// 6. **409 Conflict**: The request could not be completed due to a conflict with the current state of the resource (e.g., duplicate email during signup).
// 7. **422 Unprocessable Entity**: The request was well-formed, but the server could not process the instructions (e.g., validation error).

// ### **Server Errors (500–599)**:
// 1. **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.
// 2. **501 Not Implemented**: The server does not support the functionality required to fulfill the request.
// 3. **502 Bad Gateway**: The server received an invalid response from the upstream server.
// 4. **503 Service Unavailable**: The server is currently unable to handle the request due to temporary overloading or maintenance.
// 5. **504 Gateway Timeout**: The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.

// ### Common Status Codes in API Development:
// - **200 OK**: For successful requests (like user data retrieval).
// - **201 Created**: When a new resource is created (like a new user signup).
// - **400 Bad Request**: If the client sends invalid data.
// - **401 Unauthorized**: If the user is not authenticated.
// - **403 Forbidden**: If the user is authenticated but doesn't have permission.
// - **404 Not Found**: If the resource is not found.
// - **409 Conflict**: For conflicts (like duplicate email during registration).
// - **500 Internal Server Error**: For unexpected server errors.

// These status codes help communicate the state of the request between the client and server in a clear and standardized way.