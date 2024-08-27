import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import intro_video from '../assets/intro_video.mp4'
import {TypeAnimation} from 'react-type-animation';
import StatsComponent from '../components/StatsComponent';

function Home(){
    return(
        <div>
            {/* Section-1 */}

            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between'>

                <Link to='/signup'>
                    <div className='rounded-full mx-auto w-[270px] h-[44px] bg-indigo-600 flex justify-evenly items-center text-white'>
                        <p>Become a Surrogate Mother</p>
                        <FaArrowRight/>
                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold mt-4'>
                    Together We Make <span className='font-bold text-rose-300'>Parenthood Possible ....</span>
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-200'>
                    <p>
                    Start, grow, complete your family journey. We offer personalized surrogacy support and matching services. Find the perfect path to parenthood.
                    </p>
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <Link to='https://www.msn.com/en-us/lifestyle/parenting/what-is-surrogacy-and-how-does-it-work/ar-AA1mmIal'>
                        <button className='w-[136px] h-[48px] bg-yellow-50 rounded-md'>
                            Learn More
                        </button>
                    </Link>

                    <Link to='/login'>
                        <button className='w-[136px] h-[48px] bg-indigo-600 text-white rounded-md'>
                            Start Now
                        </button>
                    </Link>
                </div>
                
                <div className='shadow-blue-200 mx-3 my-12'>
                    <video
                    muted
                    loop
                    autoPlay
                    >
                    <source src={intro_video} type='video/mp4'/>
                    </video>
                </div>

            </div>

            {/* section-2 */}

            <div className='flex flex-row mx-auto w-11/12 items-center justify-center'>

                <div className='text-center text-5xl font-semibold mt-[-100px]'>Education About<span className='font-bold text-rose-300'> Surrogacy ....</span></div>

                <div className='w-[55%] flex flex-col gap-2 font-bold pr-2 h-[280px] text-xl'>
                    <TypeAnimation
                        sequence={[
                            'Understanding Surrogacy : Surrogacy is a method of assisted reproduction where a woman carries and gives birth to a child for another individual or couple, known as the intended parents. It can be a complex and deeply personal journey, and understanding the various aspects of surrogacy is essential for anyone considering this path to parenthood.',
                            1000,
                            'Medical Procedures : Surrogacy involves several medical procedures, including in vitro fertilization (IVF) to create embryos, embryo transfer to the surrogates uterus, and prenatal care throughout the pregnancy. Understanding these procedures and their implications is essential for all parties involved.',
                            1000,
                            'Emotional and Psychological Support : Surrogacy can be emotionally challenging for both intended parents and surrogates. Its important to have access to counseling and support services to navigate the emotional complexities of the surrogacy journey.',
                            1000,
                            'Financial Considerations : Surrogacy can be a significant financial investment, involving costs such as medical expenses, legal fees, compensation for the surrogate, and agency fees. Understanding the financial aspects of surrogacy and planning accordingly is crucial.',
                            1000,
                            'Ethical Considerations : Ethical considerations surrounding surrogacy include issues related to autonomy, exploitation, and the rights of all parties involved. Its essential to approach surrogacy with careful consideration of ethical principles and values.',
                            1000,
                        '']}
                        repeat={Infinity}
                        cursor={true}
                        speed={75}
                        omitDeletionAnimation={true}
                    />
                </div>

            </div>

            {/* section-3 */}
            {/* stats and numbers */}

            <StatsComponent/>

            {/* section-5 */}
            {/* testimonial slider */}

            <div className='flex flex-col justify-between items-center w-full h-[200px] mt-12'>
                <div className='text-3xl font-semibold'>Reviews From Parents & Mothers</div>
                <div>Testimonial Slider will be added here linked with BE</div>
            </div>

            {/* section-6 */}
            {/* footer */}

            <footer className='w-full h-[200px] bg-rose-300 flex flex-row justify-evenly items-center text-white'>
                <div className='flex font-bold gap-3'>
                    <div>Home</div>
                    <div>Education</div>
                    <div>Contact Us</div>
                </div>

                <div className='font-bold'>
                    Made With ❤️ by: sahihai_67
                </div>
            </footer>

        </div>
    )
}

export default Home;