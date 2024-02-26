import Link from 'next/link';
import Image from 'next/image';


export default function Brand() {
    return (
        <Link href="/">
            <div className='relative flex items-center justify-between w-auto cursor-pointer'>
                <Image
                    src="/logo.png"
                    width={42}
                    height={42}
                    alt="Logo"
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                />
                <h1 className="pl-3 text-lg font-bold inter-var">Valence</h1>
            </div>
        </Link>
    )
}