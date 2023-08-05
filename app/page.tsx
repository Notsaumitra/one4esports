import Image from 'next/image'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className='text-center'>
      <section>
        <div className="flex justify-center">
        <Image className='rounded-full' width={500} height={500} src={"/ONE4ESPORTS.jpg"} alt='logo_One4Esports'/>
        </div>
      <p className='text-2xl font-black text-blue-600'>Coming Soon...</p>
      </section>
      <Footer />
    </main>
  )
}
