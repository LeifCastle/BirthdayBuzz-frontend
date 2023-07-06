'use client'
import { useEffect, useState } from 'react';
import UserTable from './UserTable';

export default function Home() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        // data is an object
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