"use strict";

import React from 'react';

class Employee extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      employee: props.employee,
      editing: !Boolean(props.employee.id)
    };

    this.onEditing = this.onEditing.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {

    this.validateInput();
  }

  validateInput() {

    var employee = this.state.employee;

    this.setState({
      valid: employee.fullName && employee.DOB && employee.role
    });
  }

  onEditing() {

    this.setState({ editing: true });
  }

  onInputChange(e, key) {

    var employee = this.state.employee;
    employee[key] = e.target.value;

    this.setState({ employee: employee }, this.validateInput());
  }

  onSave() {

    if (!this.state.valid) return;

    this.setState({ editing: false });

    this.props.onSave();
  }

  render() {

    var alterButton = null,
        valid = this.state.valid;

    if (this.state.editing) {

      alterButton = <i onClick={this.onSave} className={"fas fa-check action-button" + (!valid ? " action-button-disabled " : "")} />;

    } else if (this.state.employee.id) {

      alterButton = <i className="fas fa-pencil-alt action-button" onClick={this.onEditing} />;
    }

    return (
      <tr className="employee">
        {
          ["fullName", "DOB", "role"].map((key, i) => {

            return (
              <td key={key}>
                {
                  this.state.editing
                    ? <input type="text" required className="form-control" value={this.state.employee[key]} onChange={(e) => this.onInputChange(e, key)} />
                    : this.state.employee[key]
                }
              </td>
            )
          })
        }
        <td className="employee-edit-container">
          {alterButton}
          <i className="fas fa-trash-alt action-button" onClick={this.props.onDelete} />
        </td>
      </tr>
    );
  }
}

export default Employee;