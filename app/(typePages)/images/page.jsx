"use client";
import { useState, useEffect, useRef, useCallback } from 'react'
// import { Input } from '@/components/ui/input';
import { SearchBar } from '@/components/searchbar';
import ImageUploader from './ImageUploader';


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
      worker.current = new Worker(new URL('./imageWorker.js', import.meta.url), {
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

  // const embed = useCallback((text) => {
  //   if (worker.current) {
  //     worker.current.postMessage({ text });
  //   }
  // }, []);

  const embed = useCallback((img) => {
    if (worker.current) {
      worker.current.postMessage({ img });
    }
  }, []);


  return (
    <div className='flex flex-col items-center w-full mt-1'>
        <div className='w-3/4 max-w-3xl px-3 py-1 mt-3'>
          {/* <SearchBar search={embed} /> */}
          <ImageUploader search={embed}/>
          
        </div>
        {ready !== null && (
        <pre className="p-2 bg-black rounded">
            {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
        )}
    </div>
  )
}