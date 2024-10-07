import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="p-2 bg-myindigo">
    <div className='mx-auto w-full max-w-screen-xl'>
      <div className='grid grid-cols-1 gap-4 py-6 lg:py-8 md:grid-cols-4'>
      <div className='flex flex-col items-center'>
        <Image 
          src="/logo.jpg"
          alt='Logo picture'
          width={100}
          height={100}
          className='rounded-full'
        />
        <h2 className='mt-4 font-bold tracking-widest'>Conference App</h2>
        <ul className='flex space-x-4 mt-3'>
            <li><Link href=""> <FaTelegram  className='h-6 w-6 text-blue-900'/> </Link> </li>
            <li><Link href=""> <FaFacebook className='h-6 w-6 text-blue-900'/> </Link></li>
            <li><Link href=""> <FaInstagram  className='h-6 w-6 text-red-800'/> </Link></li>
            <li><Link href=""> <FaYoutube  className='h-6 w-6 text-red-800'/> </Link></li>
          </ul>
      </div>
      <div className="mt-2">
        <h3 className='font-bold mb-4'>SAHIFALAR</h3>
        <ul>
          <li>
            <Link href='/'>Bosh sahifa</Link>
          </li>
          <li className='mt-2'>
            <Link href='/about'>Biz haqimizda</Link>
          </li>
          <li className='mt-2'>
            <Link href='/news'>Yangiliklar</Link>
          </li>
          <li className='mt-2'>
            <Link href='/contact'>Biz bilan bog&apos;lanish</Link>
          </li>
          <li className='mt-2'>
            <Link href='/conferences'>Konferensiyalar</Link>
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <h3 className='font-bold mb-4'>ALOQA UCHUN</h3>
        <ul>
          <li><p>Manzil: Toshkent 100084, AmirTemur shoh ko&apos;chasi 108-uy</p></li>
          <li className='mt-2'><p>Telefon: +998907569874</p></li>
          <li className='mt-2'>E-mail: conference.app@gmail.com</li>
          <li className='mt-2'>Ish tartibi: Dushanba-Juma 9:00-17:00</li>
        </ul>
       </div>
       <div className='mt-2 ml-10'>
       <h3 className='font-bold mb-4'>XARITADA</h3>
      <div>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5255074321644!2d69.28414881054759!3d41.34093017118619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b534175ed31%3A0x52a8f9d9414a2ad8!2z0KLQsNGI0LrQtdC90YLRgdC60LjQuSDRg9C90LjQstC10YDRgdC40YLQtdGCINC40L3RhNC-0YDQvNCw0YbQuNC-0L3QvdGL0YUg0YLQtdGF0L3QvtC70L7Qs9C40Lkg0LjQvNC10L3QuCDQnNGD0YXQsNC80LzQsNC00LAg0LDQuy3QpdC-0YDQsNC30LzQuNC5!5e0!3m2!1sru!2s!4v1727516991092!5m2!1sru!2s"
        width="100%" 
        height="250" 
        allowFullScreen
        loading="lazy"></iframe>
      </div>
       </div>
      </div>
    </div>
    </footer>
    
  );
}

export default Footer;
