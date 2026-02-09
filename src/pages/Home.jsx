import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>
        {/*section 1 */}
        <div className='max-w-[--max-w-content] relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
           
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-1.25 group-hover:bg-richblack-900'>
                        <p>Become An Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower your Future With
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-12 shadow-[10px_-5px_50px_-5px]'>
                <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1 */}
            <div className='text-4xl font-semibold'>
                <CodeBlocks position={"lg:flex-row"} heading={<div>Unlock Your <HighlightText text={"coding potential"}/> with our online courses</div>}
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        btnText:"Try it yourself",
                        linkto:"/signup",
                        active: true
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active: false
                    }
                }
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codeColor={"text-yellow-25"}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* code section 2 */}
            <div className='text-4xl font-semibold'>
                <CodeBlocks position={"lg:flex-row-reverse"} heading={<div className="w-full text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
                </div>}
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active: true
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active: false
                    }
                }
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codeColor={"text-white"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>

            <ExploreMore/>
        </div>

        {/* section 2 */}
        <div className='bg-puregreys-5 text-richblack-700'>
            <div className='homepage_bg h-77.5'>

                    <div className='w-11/12 max-w-[--max-w-content] flex flex-col items-center justify-between gap-5 mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex gap-3 items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div className='flex gap-3 items-center'>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>

            </div>

            <div className='w-11/12 max-w-[--max-w-content] flex flex-col items-center justify-between gap-7 mx-auto'>
                
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a 
                        <HighlightText text={"Job that is in Demand"}/>
                    </div>

                    <div className='flex flex-col w-[40%] gap-10 items-start'>
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to
                        be a competitive specialist requires more than professional
                        skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn More
                        </div>
                    </CTAButton>
                    </div>
                </div>

                <TimelineSection/>
                <LearningLanguageSection/>
                
            </div>

           
        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-[--max-w-content] flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white '>
            <InstructorSection/>
            <h2 className='text-center text-4xl font-semibold mt-10'>Review from other Learners</h2>
            <ReviewSlider />
            {/* review slider */}
            
        </div>


        {/* section 4 */}
        
        <Footer/>
        
    </div>
  )
}

export default Home