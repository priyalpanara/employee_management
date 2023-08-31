import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmpListing.css";

const EmpListing = () => {
    const [empdata, setEmpData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);

    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    };

    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    };

    const RemoveFunction = (id) => {
        if (window.confirm("Do you want to remove?")) {
            setEmpData(prevEmpData => prevEmpData.filter(item => item.id !== id));
        }
    };

    useEffect(() => {
        fetch("http://localhost:8000/employee")
            .then((res) => res.json())
            .then((data) => {
                setEmpData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handleRowClick = (id) => {
        navigate("/employee/detail/" + id);
    };

    const handleSearchClick = () => {
        setSearchClicked(true);
    };

    const filteredEmpData = empdata.filter((item) =>
        searchClicked ? item.id.toString().includes(searchId) : true
    );

    const handleCheckboxChange = (event, id) => {
        event.stopPropagation();
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDeleteSelected = () => {
        if (window.confirm("Do you want to remove selected items?")) {
            setEmpData((prevEmpData) =>
                prevEmpData.filter((item) => !selectedIds.includes(item.id))
            );
            setSelectedIds([]);
        }
    };

    return (
        <div className="container">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button
                    className="btn btn-outline-secondary "
                    type="button"
                    onClick={handleSearchClick}
                >
                    Search
                </button>
            </div>
            <div className="card">
                <div className="card-title"></div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/employee/create" className="btn btn-success">
                            Add New (+)
                        </Link>
                        <button
                            onClick={handleDeleteSelected}
                            className="btn btn-danger"
                            disabled={selectedIds.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedIds(filteredEmpData.map((item) => item.id));
                                            } else {
                                                setSelectedIds([]);
                                            }
                                        }}
                                    />
                                </th>
                                <th>ID</th>
                                <th>Employee Name</th>
                                <th>Salary</th>
                                <th>Age</th>
                                <th>Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmpData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="emp-card"
                                    onClick={() => handleRowClick(item.id)}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCheckboxChange(e, item.id);
                                            }}
                                        />
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.employee_name}</td>
                                    <td>{item.employee_salary}</td>
                                    <td>{item.employee_age}</td>
                                    <td>
                                        {item.profile_image && (
                                            <img
                                                src="https://xsgames.co/randomusers/assets/avatars/male/31.jpg"
                                                alt="Profile"
                                            />
                                        )}
                                    </td>
                                    <td className="button-column">
                                        <div className="btn-group">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    LoadDetail(item.id);
                                                }}
                                                className="btn btn-primary"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    LoadEdit(item.id);
                                                }}
                                                className="btn btn-success"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    RemoveFunction(item.id);
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;
