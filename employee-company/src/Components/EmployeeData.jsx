import axios from "axios";
import { useState } from "react";

function EmployeeData({ setRefreshKey, employeeData }) {
  function handleDelete(recordId) {
    axios
      .post(`https://localhost:7201/Employee/DeleteRecord/${recordId}`)
      .then((response) => {
        setRefreshKey((prev) => prev + 1);
        alert("Record deleted");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employeeData.map((data) => (
          <tr id={data.id}>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.phone}</td>
            <td>{data.companyName}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => handleDelete(data.employeeCompanyId)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        <tr></tr>
      </tbody>
    </table>
  );
}

export default EmployeeData;
