import { type } from "@testing-library/user-event/dist/type";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CompanyList from "./Components/CompanyList";
import EmployeeList from "./Components/EmployeeList";
import EmployeeData from "./Components/EmployeeData";
import LoadingScreen from "./Components/LoadingScreen";
function App() {
  const [companyList, setCompanyList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeData, setEmployeeData] = useState([
    {
      employeeId: null,
      name: null,
      email: null,
      phone: null,
      companyName: null,
    },
  ]);
  const [isLoading, SetLoading] = useState(false);
  const [companyEmployee, setCompanyEmployee] = useState({
    EmployeeId: null,
    CompanyId: null,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSelectChange(e) {
    setCompanyEmployee({
      ...companyEmployee,
      [e.target.name]: Number(e.target.value),
    });
  }

  useEffect(() => {
    const FetchCompanyList = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7201/Company/FetchCompanyList"
        );

        setCompanyList(response.data.companyList);
      } catch (error) {
        setServerError(true);
      }
    };

    const FetchEmployeeList = async () => {
      try {
        var response = await axios.get(
          "https://localhost:7201/Employee/FetchEmployeeList"
        );

        setEmployeeList(response.data.employeeList);
      } catch (error) {
        setServerError(true);
      }
    };

    const FetchEntireData = async () => {
      try {
        SetLoading(true);
        var response = await axios.get(
          "https://localhost:7201/Employee/FetchEmployeeDataWithCompany"
        );

        SetLoading(false);
        setEmployeeData(response.data);
      } catch (error) {
        setServerError(true);
      }
    };

    FetchCompanyList();
    FetchEmployeeList();
    FetchEntireData();
  }, [refreshKey]);
  const [serverError, setServerError] = useState(false);
  async function LinkUserToSelectedCompany() {
    try {
      const response = await axios.post(
        "https://localhost:7201/Employee/AssignEmployeeCompany",
        companyEmployee,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Message:" + response.data.message);
    } catch (error) {
      console.error("Employee list fetch failed:", error.message);
      alert("Unable to connect to server. Please try again later.");
    }
  }
  return (
    <div className="App">
      <div className="">
        {serverError && (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 mb-3"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
            <div>
              🚨 <strong>Server Error:</strong> Unable to connect. Please try
              again later.
            </div>
          </div>
        )}
        <div className="mb-4">
          <h2>Link Employee to a company</h2>
        </div>
        <div className="mb-4">
          <div className="text-start mb-2">Company List</div>
          <CompanyList
            handleSelectChange={handleSelectChange}
            companyList={companyList}
          >
            {" "}
          </CompanyList>
        </div>
        <div className="mb-3">
          <div className="text-start mb-2">Employee List</div>
          <EmployeeList
            handleSelectChange={handleSelectChange}
            employeeList={employeeList}
          ></EmployeeList>
        </div>

        <button className="btn btn-primary" onClick={LinkUserToSelectedCompany}>
          Link Employee
        </button>
      </div>
      <div className="styled-table">
        {isLoading ? (
          <LoadingScreen></LoadingScreen>
        ) : (
          <EmployeeData
            setRefreshKey={setRefreshKey}
            employeeData={employeeData}
          ></EmployeeData>
        )}
      </div>
    </div>
  );
}

export default App;
