import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [videoError, setVideoError] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return

      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )

        setVideoData(filteredVideoData?.[0] || null)
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
        setVideoError(null)
      }
    })()
  }, [
    courseSectionData,
    courseEntireData,
    subSectionId,
    sectionId,
    location.pathname,
  ])

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const subIndex =
      courseSectionData[sectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      )

    return sectionIndex === 0 && subIndex === 0
  }

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const subLength = courseSectionData[sectionIndex].subSection.length

    const subIndex =
      courseSectionData[sectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      )

    return (
      sectionIndex === courseSectionData.length - 1 &&
      subIndex === subLength - 1
    )
  }

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const subSections = courseSectionData[sectionIndex].subSection
    const subIndex = subSections.findIndex(
      (data) => data._id === subSectionId
    )

    if (subIndex !== subSections.length - 1) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${
          subSections[subIndex + 1]._id
        }`
      )
    } else {
      navigate(
        `/view-course/${courseId}/section/${
          courseSectionData[sectionIndex + 1]._id
        }/sub-section/${
          courseSectionData[sectionIndex + 1].subSection[0]._id
        }`
      )
    }
  }

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const subSections = courseSectionData[sectionIndex].subSection
    const subIndex = subSections.findIndex(
      (data) => data._id === subSectionId
    )

    if (subIndex !== 0) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${
          subSections[subIndex - 1]._id
        }`
      )
    } else {
      const prevSection = courseSectionData[sectionIndex - 1]
      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${
          prevSection.subSection[prevSection.subSection.length - 1]._id
        }`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    )
    if (res) dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div className="relative aspect-video">
          <video
            key={subSectionId}
            ref={playerRef}
            src={videoData.videoUrl}
            controls
            autoPlay
            muted
            className="h-full w-full rounded-md"
            onEnded={() => setVideoEnded(true)}
            onError={() => setVideoError("Video failed to load")}
          />

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, black, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
              }}
              className="absolute inset-0 z-[100] grid place-content-center"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl px-4 mx-auto"
                />
              )}

              <IconBtn
                onclick={() => {
                  if (playerRef.current) {
                    playerRef.current.currentTime = 0
                    playerRef.current.play()
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex justify-center gap-4">
                {!isFirstVideo() && (
                  <button onClick={goToPrevVideo} className="blackButton">
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button onClick={goToNextVideo} className="blackButton">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
