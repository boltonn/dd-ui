"use client";
import { Input } from '@/components/ui/input';

export default function ImageUploader({ search }){

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // create file url
        const fileUrl = URL.createObjectURL(file);
        // send file to the search function
        search(fileUrl);

    }
    
    return (
        <div className='relative mb-2'>
            <Input 
                type="file"
                name="image"
                id="image"
                className='h-10 text-sm border rounded-md bg-violet-100 border-violet-200 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-800 dark:bg-violet-950 dark:bg-opacity-40 dark:ring-offset-violet-950 dark:placeholder:text-violet-400 dark:focus-visible:ring-violet-500'
                placeholder='Upload Image'
                onChange={handleImageChange}
                required
            />
        </div>
    )
}