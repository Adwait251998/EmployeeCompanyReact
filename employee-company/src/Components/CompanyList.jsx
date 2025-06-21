function CompanyList({ companyList, handleSelectChange }) {
  return (
    <select
      name="CompanyId"
      className="form-select"
      onChange={handleSelectChange}
    >
      <option>Select</option>
      {companyList.map((company) => {
        return <option value={company.id}>{company.companyName}</option>;
      })}
    </select>
  );
}

export default CompanyList;
