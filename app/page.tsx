import Image from 'next/image'

export default function Home() {
  return (
    <main className='text-center'>
      <section>
      <Image className='rounded-full' width={500} height={500} src={"/ONE4ESPORTS.jpg"} alt='logo_One4Esports'/>
      <p className='text-2xl font-black text-blue-600'>Coming Soon...</p>
      </section>
    </main>
  )
}
