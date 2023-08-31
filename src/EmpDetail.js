import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.messemployee_age);
        })
    }, [empid]);
    return (
        <div className="container">
            <div className="card mt-4" style={{ textAlign: "left" }}>
                <div className="card-title">
                    <h2>Employee details</h2>
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <strong>ID:</strong> {empdata.id} <br />
                                    <strong>Employee Name:</strong> {empdata.employee_name} <br />
                                    <strong>Salary:</strong> {empdata.employee_salary} <br />
                                    <strong>Employee Age:</strong> {empdata.employee_age}
                                </td>
                                <td>
                                    {empdata.profile_image && (
                                        <img src={`http://localhost:8000${empdata.profile_image}`} alt="Profile" />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link className="btn btn-danger" to="/">Back to Listing</Link>
                </div>
            </div>
        </div>
    );
};
export default EmpDetail;