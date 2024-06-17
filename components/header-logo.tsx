import Image from 'next/image'
import Link from 'next/link'

const HeaderLogo = () => {
  return (
    <div className='flex items-center'>
      <Link href='/'>
        <div className='items-center hidden lg:flex'>
          <Image 
            src='/logo.svg'
            alt='Logo'
            width={28}
            height={28}
          />
          <p className='text-semibold text-2xl text-white ml-2.5'>Finance</p>
        </div>
      </Link>
    </div>
  )
}

export default HeaderLogo
