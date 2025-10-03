import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 py-6 limit-width">
      <Link href="/">
        <Image
          src="/tushar-sign.png"
          alt="Tushar Gaurav"
          width={150}
          height={50}
          className="h-8 transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,165,0,0.8)] hover:brightness-110 hover:animate-pulse"
        />
      </Link>
      <div className="flex gap-4 text-sm">
        <Link href="/">Archive</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}
