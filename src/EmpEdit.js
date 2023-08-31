import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [empdata, setEmpData] = useState({});
    const [tempData, setTempData] = useState({});
    
    // Fetch employee data from the API when the component mounts
    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                setEmpData(resp);
                setTempData(resp); // Initialize tempData with current data
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]);

    // Update temporary data when input fields change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempData(prevTempData => ({
            ...prevTempData,
            [name]: value,
        }));
    };

    // Navigate back to employee details without saving changes
    const handleCancel = () => {
        navigate("/employee/detail/" + empid);
    };

    // Apply temporary changes and navigate back to employee details
    const handleSave = () => {
        setEmpData(tempData); // Apply temporary changes to the UI
        navigate("/employee/detail/" + empid);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card mt-4" style={{ textAlign: "left" }}>
                        <div className="card-title">
                            <h2>Edit Employee</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    name="employee_name"
                                    value={tempData.employee_name || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Employee Salary</label>
                                <input
                                    name="employee_salary"
                                    value={tempData.employee_salary || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Employee Age</label>
                                <input
                                    name="employee_age"
                                    value={tempData.employee_age || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <button onClick={handleSave} className="btn btn-success">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="btn btn-danger">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpEdit;
