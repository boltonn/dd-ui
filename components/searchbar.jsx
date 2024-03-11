'use client'
import { Input } from '@/components/ui/input';

export function SearchBar({ search }) {
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          search(e.target.value);
        }
    }

    return (<form
        onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const text = formData.get('text');
            search(text);
        }}
        className='relative mb-2'
    >
        <Input 
            type="search"
            name="text"
            id="default-search"
            className='h-10 text-sm border rounded-md bg-violet-100 border-violet-200 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-800 dark:bg-violet-950 dark:bg-opacity-40 dark:ring-offset-violet-950 dark:placeholder:text-violet-400 '
            placeholder='Search' 
            onKeyDown={handleKeyDown}
            required
        />
    </form>)
}