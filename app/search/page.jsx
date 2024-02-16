"use client";
import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '@/components/navbar';
import { Input } from '@/components/ui/input';


export default function MainSearchPage() {

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);

  // Create a reference to the worker object.
  const worker = useRef(null);

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL('./worker.js', import.meta.url), {
        type: 'module'
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          setReady(false);
          break;
        case 'ready':
          setReady(true);
          break;
        case 'complete':
          setResult(e.data.output[0])
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current.removeEventListener('message', onMessageReceived);
  });

  const embed = useCallback((text) => {
    if (worker.current) {
      worker.current.postMessage({ text });
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      embed(e.target.value);
    }
  }

  return (
    <div className='flex flex-col items-center w-full mt-1'>
        <Navbar />
        <Input 
            id='search'
            className='w-3/4 h-10 p-2 m-2 bg-purple-100 mt-3 max-w-3xl rounded-md 
            border border-purple-200 px-3 py-2 text-sm ring-offset-white 
            file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-purple-500 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 
            focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
            dark:border-purple-800 dark:bg-purple-950 dark:bg-opacity-40 dark:ring-offset-purple-950 
            dark:placeholder:text-purple-400 dark:focus-visible:ring-purple-300'
            placeholder='Search' 
            onKeyDown={handleKeyDown}
        />

        {ready !== null && (
        <pre className="bg-black p-2 rounded">
            {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
        )}
    </div>
  )
}