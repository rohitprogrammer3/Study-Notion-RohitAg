import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useEffect } from 'react';
import { formatDate } from '../../../services/formatDate';

const PurchaseHistory = () => {
    const{token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try{
            const res = await getUserEnrolledCourses(token);
            setEnrolledCourses(res);
            console.log("enrolledCourses",res);

        } catch(error) {
            console.log("Error in course fetching")
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    },[]);

//   return (
//     <div className='text-white'>
//        {!enrolledCourses ? "Loading..." : !enrolledCourses.length ? "You have zero courses" : (
//         <div>
//             {enrolledCourses.map((course, index) => (
//                 <div key={index}>
//                     <div>
//                         <div>
//                             {course.courseName}
//                         </div>
//                         <div>{course.price}</div>
//                         <div>{formatDate(course?.purchasedAt)}</div>
//                     </div>
//                 </div>
                
//             ))}
//         </div>
//        )}

//        <div>
       
//        </div>
//     </div>
//   )

  return (
    <>
      <div className="text-3xl text-richblack-50">Purchase History</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not purchased any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Price</p>
            <p className="flex-1 px-2 py-3">Purchased At</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.price}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                {formatDate(course.purchasedAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default PurchaseHistory