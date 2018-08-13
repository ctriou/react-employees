# Employee list

Developed as an exercise using React, this is a simple list of employees, each editable

![submission.png](screenshot.png)

## Prerequisites
- node.js version >= `4.0.x`

## Getting Started
1. Clone the repository
2. Run `npm install` in the root of the repository

## Starting/Using the API
1. Run `npm run local`
2. The API will be available at `http://localhost:3000/employees`

### Endpoints
- `GET`: `/employees`
    - Returns an array of all employees
- `POST`: `/employees`
    - Add a new employee
    - Request body should be an employee object (see src/db/employee-data.json for example)
- `PATCH`: `/employees/{id}`
    - Edit an employees details
- `DELETE`: `/employees/{id}`
    - Delete an employee
