import Navbar from '@/components/navbar';

export default function typeLayout({
    children
}) {
    return (
        <div className='w-full h-screen mt-1'>
            <Navbar />
            {children}
        </div>
    );
}