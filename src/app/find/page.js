'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from "@/components/page_header";
import NewEntry from '@/components/BuzzList/NewEntry';

export default function Find() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000/account";

  useEffect(() => {
    if (input) {
      axios.get(`${BASE_URL}/searchUsers?query=${input}`)
        .then(response => {
          setResults(response.data);
          setError(null);
        })
        .catch(err => {
          setError('Failed to fetch users');
          console.error(err);
        });
    } else {
      setResults([]);
    }
  }, [input]);

  // const handleEnterKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     setSelectedUsers(results);
  //   }
  // };

  const addToBuzzlist = (user) => {
    if (!selectedUsers.some(selected => selected._id === user._id)) {
      setSelectedUsers(prevUsers => [...prevUsers, user]);
      axios.post(`${BASE_URL}/addToBuzzlist`, { userData: user })
      // .then(response => {
      //   if (response.data.success) {
      //     alert(`You added ${user.firstName} ${user.lastName} to your Buzzlist!`);
      //   } else {
      //     alert('Failed to add the user to the Buzzlist.');
      //   }
      // })
      // .catch(err => {
      //   console.error(err);
      // //   alert('An error occurred while adding the user to the Buzzlist.');
      // });
    } else {
      alert(`${user.firstName} ${user.lastName} is already in your Buzzlist!`);
    }
  };

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <PageHeader />
      <div className="container mx-auto mt-10 px-4">
        <input
          type="text"
          placeholder="Search for users..."
          value={input}
          onChange={e => setInput(e.target.value)}
          // onKeyPress={handleEnterKeyPress}
          className="p-2 border rounded text-black"
        />
        <button className="ml-2 bg-green-500 text-white rounded px-2 py-1" onClick={openModal}>Add to Buzzlist</button>
        {input && (
          <div className="relative">
            <div className="absolute top-full left-0 mt-2 w-full border bg-white rounded shadow-xl z-10">
              {results.map(user => (
                <div key={user.id} className="p-4 border-b">
                  <p className="text-black">{user.firstName} {user.lastName}</p>
                  <button onClick={() => addToBuzzlist(user)} className="mt-2 bg-blue-500 text-white rounded px-2 py-1">
                    Show User Information
                  </button>
                </div>
              ))}
              {error && <p className="p-4 text-red-500">{error}</p>}
            </div>
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Selected Users</h2>
          {selectedUsers.map(user => (
            <div key={user.id} className="p-4 border rounded mb-4 bg-white">
              <h3 className="text-black">{user.firstName} {user.lastName}</h3>
              <p className="text-black">Email: {user.email}</p>
              <p className="text-black">Phone: {user.phone}</p>
              <p className="text-black">Birthday: {user.birthday}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for New Entry */}
      {showModal && (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-start pt-8 bg-black bg-opacity-50 z-50">
    <div className="bg-gray-800 p-8 rounded-md shadow-xl max-w-xl w-full">
      <button onClick={closeModal} className="float-right">X</button>
      <NewEntry /* ... props you need for NewEntry ... */ />
    </div>
  </div>
)}
    </>
  );
}
