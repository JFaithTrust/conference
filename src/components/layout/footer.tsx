import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="p-2 bg-indigo-400">
   <div className="mx-auto w-full max-w-screen-xl">
      <div className="grid grid-cols-1 gap-8  py-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col  items-center ml-8 sm:ml-14 sm:items-center md:items-start">
            <Image 
              src="/logo.jpg"
              alt="Logo picture"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h2 className="mt-4 font-bold text-center md:text-left">Conference App</h2>
            <ul className="flex space-x-4 mt-3">
              <li><Link href=""><FaTelegram className="h-6 w-6 text-blue-700" /></Link></li>
              <li><Link href=""><FaFacebook className="h-6 w-6 text-blue-700" /></Link></li>
              <li><Link href=""><FaInstagram className="h-6 w-6 text-red-700" /></Link></li>
              <li><Link href=""><FaYoutube className="h-6 w-6 text-red-700" /></Link></li>
            </ul>
          </div>

    
          <div className="flex flex-col items-center sm:ml-14 md:mx-10  sm:items-center md:items-start  order-2 md:order-5 lg:order-2">
            <h3 className="font-bold mb-4 text-center md:text-left">SAHIFALAR</h3>
            <ul className="text-center md:text-left">
              <li className="mt-2"><Link href="/">Bosh sahifa</Link></li>
              <li className="mt-2"><Link href="/about">Biz haqimizda</Link></li>
              <li className="mt-2"><Link href="/news">Yangiliklar</Link></li>
              <li className="mt-2"><Link href="/contact">Biz bilan bog&apos;lanish</Link></li>
              <li className="mt-2"><Link href="/conferences">Konferensiyalar</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center  sm:items-center md:mx-16 md:items-start order-3 lg:mx-10">
            <h3 className="font-bold mb-4 text-center md:text-left">ALOQA UCHUN</h3>
            <ul className="text-center md:text-left">
              <li><p>Manzil: Toshkent 100084, AmirTemur shoh ko&apos;chasi 108</p></li>
              <li className="mt-2"><p>Telefon: +998907569874</p></li>
              <li className="mt-2">Email: conference@gmail.com</li>
              <li className="mt-2">Ish tartibi: Dushanba-Juma 9:00-17:00</li>
            </ul>
          </div>

          <div className="flex flex-col items-center  sm:mx-10 sm:items-center md:items-start md:mx-8 order-4 md:order-2 lg:order-4">
            <h3 className="font-bold mb-4 text-center md:text-left">XARITADA</h3>
            <div className="w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5255074321644!2d69.28414881054759!3d41.34093017118619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b534175ed31%3A0x52a8f9d9414a2ad8!2z0KLQsNGI0LrQtdC90YLRgdC60LjQuSDRg9C90LjQstC10YDRgdC40YLQtdGCINC40L3RhNC-0YDQvNCw0YbQuNC-0L3QvdGL0YUg0YLQtdGF0L3QvtC70L7Qs9C40Lkg0LjQvNC10L3QuCDQnNGD0YXQsNC80LzQsNC00LAg0LDQuy3QpdC-0YDQsNC30LzQuNC5!5e0!3m2!1sru!2s!4v1727516991092!5m2!1sru!2s"
                width="100%" 
                height="180" 
                allowFullScreen
                loading="lazy"
                className="rounded-lg w-full md:w-2/3 md:h-40 lg:w-full lg:h-52">
                </iframe>
            </div>
          </div>

        </div>
      </div>
    </footer>
    
  );
}

export default Footer;
