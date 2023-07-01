'use client'
import { useEffect, useState } from 'react';
import PostTable from './PostTable';

export default function FilterablePostTable() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:8000/posts')
      .then((res) => res.json())
      .then((data) => {
        // data is an object
        console.log('--- posts ---', data);
        setData(data);
        setLoading(false);
      })
    }, []);
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data shown...</p>
  
    return (
      <main>
        <PostTable posts={data.posts}/>
      </main>
    )
  }