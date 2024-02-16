import Navbar from '@/components/navbar';

export default function typeLayout({
    children
}) {
    return (
        <div className='w-full h-screen'>
            <Navbar />
            {children}
        </div>
    );
}