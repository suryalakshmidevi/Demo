// src/components/CandidateList.js
import React from 'react';

const CandidateList = ({ candidates, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Candidate List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Aadhar</th>
            <th>Qualification</th>
            <th>Address</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.aadhar}</td>
              <td>{candidate.qualification}</td>
              <td>{candidate.address}</td>
              <td>{candidate.details}</td>
              <td>
                <button onClick={() => onEdit(candidate)}>Edit</button>
                <button onClick={() => onDelete(candidate.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
