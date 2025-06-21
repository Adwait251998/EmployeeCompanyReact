function EmployeeList({ employeeList, handleSelectChange }) {
  return (
    <select
      name="EmployeeId"
      className="form-select"
      onChange={handleSelectChange}
    >
      <option>Select</option>
      {employeeList.map((employeeList) => {
        return (
          <option value={employeeList.employeeId}>{employeeList.name}</option>
        );
      })}
    </select>
  );
}

export default EmployeeList;
