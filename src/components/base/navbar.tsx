import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Image src="/tushar-sign.png" alt="Tushar Gaurav" width={150} height={150} />
      <div className="flex gap-4 text-sm">
        <Link href="/">Archive</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}
