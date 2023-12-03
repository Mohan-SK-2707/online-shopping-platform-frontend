import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8080/TrackandTrace/api/getAllCustomerDetails";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <table id='customers'>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Company Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Login Count</th>
          <th>Role</th>
          <th>Active status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.companyName}</td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.loginCount}</td>
            <td>{user.role.roleType}</td>
            <td>{user.delete === true ? 'Inactive' : 'Active'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
