// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [editingCandidate, setEditingCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleSave = (candidate) => {
    setCandidates((prevCandidates) => {
      if (editingCandidate) {
        return prevCandidates.map((c) =>
          c.id === candidate.id ? candidate : c
        );
      }
      return [...prevCandidates, candidate];
    });
    setEditingCandidate(null);
  };

  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/candidates/${id}`);
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div>
      
      <CandidateForm candidateToEdit={editingCandidate} onSave={handleSave} />
      <hr />
      <CandidateList
        candidates={candidates}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
