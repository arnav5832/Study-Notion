import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";


const timeline = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "fully committed to success company"
    },
     {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
          <div className='w-[45%] flex flex-col gap-5'>
              {
                  timeline.map( (element, index) =>{
                      return(
                          <div className='flex flex-row gap-6' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center'>
                              <img src={element.Logo}/>
                            </div>

                            <div>
                              <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                              <p className='text-base'>{element.Description}</p>
                            </div>
                          </div>
                      )
                  })
              }
          </div>

          <div className='relative h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>
            <img src={TimeLineImage} alt="timelineImage" className='shadow-white object-cover h-[400px] lg:h-fit' />

            <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] 
              lg:translate-y-[50%] bg-caribbeangreen-700 top-0 lg:top-auto
              flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10'>
              <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300  lg:px-14 px-7'>
                <p className='text-3xl font-bold w-[75px]'>10</p>
                <p className='text-caribbeangreen-300 text-sm w-[75px]'>Years of Experience</p>
              </div>

              <div className='flex gap-5 items-center px-7  lg:px-14'>
                <p className='text-3xl font-bold w-[75px]'>250</p>
                <p className='text-caribbeangreen-300 text-sm w-[75px]'>Types of Courses</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TimelineSection