'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import FilterableUserTable from './components/FilterableUserTable';

// we are going to be fetching data from our API and displaying it on
// the page

export default function Home() {
  // state is what the data is representing in realtime
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [age, setAge] = useState(null);
  const [name, setName] = useState('Dylan');

  useEffect(() => {
    fetch('http://localhost:8000/')
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
    <main className={styles.main}>
      <p>{data.message}</p>
      <FilterableUserTable />
    </main>
  )
}
