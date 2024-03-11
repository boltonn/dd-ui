'use client'
export function SearchBar({ search }) {
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          search(e.target.value);
        }
    }

    return (
    <form
        onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const text = formData.get('text');
            search(text);
        }}
        className='relative mb-2'
    >
        <input 
            type='search'
            name='text'
            id='default-search'
            className='flex w-full h-10 px-3 py-2 text-sm border rounded-md bg-violet-100 border-violet-200 ring-offset-white file:bg-transparent file:text-sm file:font-medium placeholder:text-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-800 dark:bg-violet-950 dark:bg-opacity-40 dark:ring-offset-violet-950 dark:placeholder:text-violet-400 file:bg-violet-500 file:rounded-md file:mr-4 file:border-0 dark:file:bg-violet-950 dark:focus-visible:ring-black'
            placeholder='Search' 
            onKeyDown={handleKeyDown}
            required
        />
    </form>)
}