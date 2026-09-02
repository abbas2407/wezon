import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useMagnetic } from '@/hooks/useMagnetic';

const BrandMail = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M2 5H22V19H2V5Z" />
    <path d="M2 5L12 12L22 5" />
  </svg>
);

const BrandPhone = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M7 2H17V22H7V2Z" />
    <path d="M11 18H13" />
  </svg>
);

const BrandPin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M12 22L20 10L12 2L4 10L12 22Z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);

const ContactLink = ({ icon: Icon, text, href }: { icon: any, text: string, href: string }) => {
  const ref = useMagnetic();
  return (
    <a
      // @ts-ignore
      ref={ref}
      href={href}
      className="flex items-center gap-4 font-sora font-medium text-[14px] text-white/60 hover:text-white transition-all duration-300 hover:translate-x-[8px] py-2 w-fit"
      data-cursor="hover"
    >
      <div className="text-white/40 flex items-center justify-center">
        <Icon size={18} />
      </div>
      {text}
    </a>
  );
};

export function ProjectCTA() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const blob1X = useSpring(useTransform(mouseX, [0, window.innerWidth || 1000], [-20, 20]), { stiffness: 50, damping: 20 });
  const blob1Y = useSpring(useTransform(mouseY, [0, window.innerHeight || 1000], [-20, 20]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="contact" className="relative bg-black px-6 md:px-12 lg:px-[max(5vw,40px)] py-[120px] overflow-hidden">
      {/* Background Blob */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-white rounded-full mix-blend-screen filter blur-[100px] opacity-[0.03] pointer-events-none"
        style={{ x: blob1X, y: blob1Y }}
      />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* Left Col */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-text text-white/40 mb-6"
          >
            — LET'S WORK TOGETHER
          </motion.div>
          
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-sora font-extrabold text-[clamp(40px,5.5vw,72px)] text-white mb-6"
          >
            Have A Project In Mind?
          </motion.h2>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-inter font-normal text-[17px] text-white/50 max-w-[400px] mb-12"
          >
            Stop managing manual bottlenecks.<br />
            Enter the Zone with we✦zon.
          </motion.p>

          <div className="flex flex-col gap-2">
            <ContactLink icon={BrandMail} text="hello@wezon.agency" href="mailto:hello@wezon.agency" />
            <ContactLink icon={BrandPhone} text="+91 XXXXX XXXXX" href="tel:+910000000000" />
            <ContactLink icon={BrandPin} text="Hyderabad, India" href="#" />
          </div>
        </div>

        {/* Right Col */}
        <div className="w-full lg:w-[50%] pt-8 lg:pt-0">
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white font-sora font-normal text-[15px] placeholder-white/30 focus:border-white transition-colors duration-300"
              data-cursor="text"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white font-sora font-normal text-[15px] placeholder-white/30 focus:border-white transition-colors duration-300"
              data-cursor="text"
            />
            <select 
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white/30 font-sora font-normal text-[15px] focus:border-white focus:text-white transition-colors duration-300 appearance-none"
              data-cursor="hover"
              defaultValue=""
            >
              <option value="" disabled className="text-black">Project Type</option>
              <option value="uiux" className="text-black">UI/UX Design</option>
              <option value="web" className="text-black">Website Development</option>
              <option value="app" className="text-black">Web / Mobile App</option>
              <option value="marketing" className="text-black">Digital Marketing</option>
              <option value="other" className="text-black">Other</option>
            </select>
            <textarea 
              placeholder="Message" 
              rows={4}
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white font-sora font-normal text-[15px] placeholder-white/30 focus:border-white transition-colors duration-300 resize-none"
              data-cursor="text"
            />
            <div className="pt-4">
              <Button variant="white" className="w-full py-4" magnetic={true}>
                Send Message
              </Button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
