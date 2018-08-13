"use strict";

import React from 'react';
import Axios from 'axios';

import Employee from './employee.js';

class EmployeePanel extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      employees: []
    };

    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addEmptyEmployee = this.addEmptyEmployee.bind(this);
  }

  componentDidMount() {

    Axios.get("/employees")
      .then((response) => {

        this.setState({
          employees: response.data
        })

        this.addEmptyEmployee();
      });
  }

  onDelete(index) {

    var employees = this.state.employees,
        employee = employees[index];

    if (!employee) return;

    // if we're deleting an employee that hasn't been persisted yet, just remove it and render
    if (!employee.id) {

      this.setState({
        employees: this.state.employees.filter((e, i) => i !== index)
      });

      return;
    }

    // don't modify state object, unless API is successful
    employee = Object.assign({}, employee);

    // don't POST our UI concerns to the server
    delete employee.tempId;

    Axios.delete(`/employees/${employee.id}`)
      .then((response) => {

        this.setState({
          employees: this.state.employees.filter((e, i) => i !== index)
        });
      });
  }

  onSave(index) {

    var employees = this.state.employees,
        employee = employees[index];

    if (!employee) return;

    // don't modify state object, unless API is successful
    employee = Object.assign({}, employee);

    var isUpdate = Boolean(employee.id);
    var method = isUpdate ? "patch" : "post";
    var path = isUpdate ? `/employees/${employee.id}` : "/employees";

    // don't POST our UI concerns to the server
    delete employee.tempId;

    delete employee.id; // seems odd the server complains about this

    Axios[method](path, employee)
      .then((response) => {

        employees[index] = response.data;
        this.setState({ employees: employees });
      });
  }

  addEmptyEmployee() {

    var employees = this.state.employees;
    employees.unshift({
      fullName: "",
      DOB: "",
      role: "",
      tempId: new Date().getTime() // UI ONLY - iteration key for unsaved items
    });

    this.setState({
      employees: employees
    })
  }

  render() {
    return (
      <div className="section container">
        <div className="row section-header">Employees</div>
        <div className="row section-body">
          <table className="table employee-panel">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Role</th>
                <th className="employee-edit-container">
                  <i className="fas fa-plus action-button" onClick={this.addEmptyEmployee} />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.employees.map((e, i) => {
                  return <Employee key={e.id || e.tempId} onDelete={() => this.onDelete(i)} onSave={() => this.onSave(i)} employee={e} />;
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

export default EmployeePanel;