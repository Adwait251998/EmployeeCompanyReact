import { type } from "@testing-library/user-event/dist/type";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [companyDetails, setCompanyDetails] = useState({
    CompanyName: "",
    City: "",
  });

  const handleCompanyForm = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://localhost:7201/Company/AddCompany",
      companyDetails,
      { headers: { "Conten-Type": "application/json" } }
    );

    const data = response.data;
    alert(data.message || "Form submitted!");
  };

  return (
    <div className="App">
      <form className="formContainer" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="CompanyName" class="form-label">
            Enter Company name:
          </label>
          <input
            type="text"
            class="form-control"
            name="CompanyName"
            onChange={handleCompanyForm}
          />
        </div>
        <div class="mb-3">
          <label for="City" class="form-label">
            Enter City
          </label>
          <input
            type="text"
            class="form-control"
            name="City"
            onChange={handleCompanyForm}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
