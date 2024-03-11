"use client";
import { useState, useEffect, useRef, useCallback } from 'react'
import { SearchBar } from '@/components/searchbar';
import ImageUploader from './ImageUploader';
import ImageGallery from './ImageGallery';
import Progress from './Progess';


export default function ImageSearchPage() {

  // Keep track of the classification result and the model loading status.
  const [embedding, setEmbedding] = useState(null);
  const [ready, setReady] = useState(null);
  const [searchType, setSearchType] = useState('text');
  const [progressItems, setProgressItems] = useState([]);

  // Create a reference to the worker object.
  const worker = useRef(null);

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    console.log('searchType', searchType)
    // if (!worker.current) {
    if (searchType === 'text') {
      worker.current = new Worker(new URL('./textWorker.js', import.meta.url), {
        type: 'module'
      });
    } else {
      worker.current = new Worker(new URL('./imageWorker.js', import.meta.url), {
        type: 'module'
      });
    }
    // }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          setReady(false);
          setProgressItems(prev => [...prev, e.data]);
          break;
        
        case 'progress':
          // Model file progress: update one of the progress items.
          setProgressItems(
            prev => prev.map(item => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress }
              }
              return item;
            })
          );
        break;

        case 'done':
        // Model file loaded: remove the progress item from the list.
        setProgressItems(
          prev => prev.filter(item => item.file !== e.data.file)
        );
        break;

        case 'ready':
          setReady(true);
          break;

        case 'complete':
          setEmbedding(e.data.output[0])
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current.removeEventListener('message', onMessageReceived);
  }, [searchType]);

  // one function to embed where x can be text or image
  const embed = useCallback((data) => {
    if (worker.current) {
      worker.current.postMessage(data);
    }
  }, [embedding]);


  return (
    <div className='flex flex-col items-center w-full mt-1'>
        <div className='w-3/4 max-w-3xl px-3 py-1 mt-3'>
          <div className=''>
            {/* a button for text or image search based on searchType */}
            <div className='flex items-center ml-2 text-sm justify-left'>
              <button 
                className={`z-10 rounded-sm ${searchType === 'text' ? 'bg-violet-950 border-2 border-violet-950 text-white' : 'bg-white dark:bg-black text-violet-800 border-2 border-violet-950'}`}
                onClick={() => setSearchType('text')}
              >
                <p className='px-1'>Text</p>
              </button>
              <button 
                className={`z-10 rounded-sm ${searchType === 'image' ? 'bg-violet-950 border-2 border-violet-950 text-white' : 'bg-white dark:bg-black text-violet-800 border-2 border-violet-950'}`}
                onClick={() => setSearchType('image')}
              >
                <p className='px-1'>Image</p>
              </button>
            </div>
            {searchType === 'text' 
              ? <SearchBar search={embed} />
              : <ImageUploader search={embed} />
            }
          </div>          
        </div>
        {
          ready
          ? (
            !embedding
            ? "Running inference..."
            : <ImageGallery key={embedding} embedding={embedding} setEmbedding={setEmbedding} />
          ) : (
            <div className='w-full'>
              {progressItems.map((data, i) => (
                <Progress 
                  className='w-1/2 my-1'
                  key={i} 
                  progress={data.progress} 
                  text={data.file} 
                />
              ))}
            </div>
          )
        }
    </div>
  )
}