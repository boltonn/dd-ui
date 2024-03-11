"use client";
import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { Label } from "@/components/ui/label"
import { SearchBar } from '@/components/searchbar';
import ImageUploader from './ImageUploader';
import ImageGallery from './ImageGallery';
import DownloadFileProgress from './DownloadFileProgress';


export default function ImageSearchPage() {

  // Keep track of the classification result and the model loading status.
  const [embedding, setEmbedding] = useState(null);
  const [ready, setReady] = useState(null);
  const [searchType, setSearchType] = useState('image');
  const [progressItems, setProgressItems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Create a reference to the worker object.
  const worker = useRef(null);

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
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

        // case 'running':
        //   setIsRunning(true);
        //   break;

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
  }, []);


  return (
    <div className='flex flex-col items-center w-full mt-1'>
        <div className='w-3/4 max-w-3xl px-3 py-1 mt-3'>
          <div className='mt-3'>
            {searchType === 'text' 
              ? <SearchBar search={embed} />
              : <ImageUploader search={embed} />
            }
          </div>          
        </div>
        <div className='flex justify-center w-full mt-3'>
          <Label>Search by Text</Label>
          <div className="inline-flex items-center mx-3 mb-2">
            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
              <input defaultChecked id="switch-1" type="checkbox"
                className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-violet-gray-100 checked:bg-violet-500 peer-checked:border-violet-500 peer-checked:before:bg-violet-500" 
                onClick={() => setSearchType(searchType === 'text' ? 'image' : 'text')}  
              />
              <label htmlFor="switch-1"
                className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-violet-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-violet-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-violet-500 peer-checked:before:bg-violet-500">
                <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                  data-ripple-dark="true"></div>
              </label>
            </div>
          </div>
          <Label>Search by Image</Label>
        </div>
        {
          ready 
          ? (
            !embedding 
            ? "Running inference..."
            : <ImageGallery embedding={embedding} setEmbedding={setEmbedding} />
          ) : (
            <Fragment>
              {progressItems.map((data, i) => (
                <DownloadFileProgress key={i} value={data.progress} text={data.file} />
              ))}
            </Fragment>
          )
        }
    </div>
  )
}