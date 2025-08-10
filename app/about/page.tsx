
import Navbar from '../components/Navbar';
import { ScrollArea } from "@/components/ui/scroll-area"


import React from 'react'
import Image from 'next/image';

const About = () => {
 
  return (
    <section className='h-full w-full overflow-x-hidden overflow-y-hidden '>
    {/* NAVBAR */}
    <Navbar />


    {/* <LogoAbout /> */}
    <ScrollArea id="container" className='w-full h-screen pt-48 md:py-76 z-[2] px-5 lg:px-72 xl:px-[26rem] 2xl:px-[36rem]'>
      {/* CONTENT 1 */}
      <section className=' max-h-[300px] pb-7 '>
      <h3 className='text-[21px] font-[300] text-white  py-4'>ABOUT US</h3>
      <p className='text-[15px] font-[300] text-white pb-6'>Lotus Med Innovation is an India-focused boutique investment firm. The group possesses strong international ties in New York, Los Angeles, London, Africa, and Asia. The distinguished team is committed to creating cross-border alliances as a self-governing, relationship-driven company. We facilitate access to foreign groups in the rapidly expanding Indian market and help Indian companies invest in international markets. We support foreign investors and funds in setting up niche Indian investment opportunities. We streamline the production, distribution, joint venture, and licensing processes to allow global firms to enter the Indian market with ease and full control.</p>

<h3 className='text-[21px] font-[300] text-white  py-4'>GLOBAL MISSION
</h3>
<p className='text-[15px] font-[300] text-white pb-6'>Healthcare Innovation and Entrepreneurship drive the Lotus Med Innovation team of thought leaders. We seek global opportunities with a social impact in ground-breaking advances and cutting-edge technology to enhance Precision Medicine, Food Systems/Nutrition, Preventative Health, Lifestyle, and Wellbeing. We strive to service our clients with innovative finance opportunities that empower the region and the people they touch—a firm determination to create stronger, sustainable businesses through accelerated operational improvement and transformative growth. <br/><br/>Lotus Med Innovation enables its clients to capitalize on the company&apos;s deeply rooted regional ties and highly discrete work ethic in all interactions and services from beginning to end. The industry&apos;s trusted leading global capital alliance partner; aligning private capital for public good.</p>

   
      </section>

      
      
    </ScrollArea>

    
      
    
    {/* BG */}
    <div className="w-full h-screen">

        {/* BACKGROUND GIF */}
        {/* <Image
        className=" opacity-[18%] z-[1] object-cover"
        src="/la.jpg"
        fill={true}
        objectFit= "fill" 
        alt="replay intro video"
      /> */}

{/* <Image
        className=" opacity-[18%] z-[1] object-cover"
        src="/ad1.jpeg"
        fill={true}
        objectFit= "fill" 
        alt="replay intro video"
      /> */}

<Image
        className=" opacity-[15%] z-[1] object-cover"
        src="/lanewpic.jfif"
        fill={true}
        objectFit= "fill" 
        alt="replay intro video"
      />

{/* <Image
        className=" opacity-[18%] z-[1] object-cover"
        src="/ad3.jpg"
        fill={true}
        objectFit= "fill" 
        alt="replay intro video"
      /> */}
    </div>

  </section>
  )
}

export default About
