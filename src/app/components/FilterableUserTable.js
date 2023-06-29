'use client'
import { useEffect, useState } from 'react';
import UserTable from './UserTable';

export default function FilterableUserTable() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((data) => {
        // data is an object
        console.log('--- data ---', data);
        setData(data);
        setLoading(false);
      })
    }, []);
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data shown...</p>
  
    return (
      <main>
        <UserTable users={data.users}/>
      </main>
    )
  }