import Link from 'next/link'
import Image from 'next/image'

export default function NavLogo({ className }) {
  return (
    <div className={className}>
      <Link href="/">
        <a>
          <Image
            src="/logo.png"
            alt="logo-theses-share"
            width={35}
            height={30}
          />
        </a>
      </Link>
    </div>
  )
}
