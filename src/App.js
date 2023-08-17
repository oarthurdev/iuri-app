import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const storedNames = localStorage.getItem('names');
    if (storedNames) {
      setNames(JSON.parse(storedNames));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names));
  }, [names]);

  const addName = () => {
    if (newName.trim() !== '') {
      setNames([...names, newName]);
      setNewName('');
    }
  };

  const editName = (index, updatedName) => {
    if (updatedName !== null && updatedName.trim() !== '') {
      const updatedNames = [...names];
      updatedNames[index] = updatedName;
      setNames(updatedNames);
    }
  };

  const deleteName = (index) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedNames = [...names];
    const [movedName] = updatedNames.splice(sourceIndex, 1);
    updatedNames.splice(targetIndex, 0, movedName);
    setNames(updatedNames);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  return (
    <div className="container text-center mt-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={newName}
          onKeyPress={handleKeyPress}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Novo Nome"
        />
        <button className="btn btn-primary mt-2" onClick={addName}>
          Adicionar
        </button>
      </div>
      <ul className="list-group">
        {names.map((name, index) => (
          <li
            key={index}
            className="list-group-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {name}
            <button
              className="margin-left btn btn-sm btn-secondary ml-2 my-1"
              onClick={() => editName(index, prompt('Novo nome:', name))}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="margin-left btn btn-sm btn-danger ml-2 my-1"
              onClick={() => deleteName(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
