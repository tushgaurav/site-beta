import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/tushar-sign.png" alt="Tushar Gaurav" width={150} height={50} />
    </div>
  )
}
