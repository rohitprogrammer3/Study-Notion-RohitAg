import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, index) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${index !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-[185px] h-[148px] relative rounded-lg"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className=" w-[407px] h-6 justify-start items-center gap-2 inline-flex">
                <span className="text-yellow-400 text-[16px] font-semibold leading-normal">4.5</span>
                <span className="flex flex-col w-24">
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                </span>
                <span className="text-richblack-500 text-[16px] font-normal leading-normal ">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="w-28 h-12 p-3 rounded-lg border  border-richblack-700 bg-richblack-800 hover:bg-richblack-900 justify-start items-center gap-2 inline-flex"
            >
              <RiDeleteBin6Line className=" text-pink-200 w-[18px] h-[18px] relative" />
              <span className="text-center text-pink-200 text-[16px] font-medium leading-normal">Remove</span>
            </button>
            <p className="text-yellow-400 text-[24px] font-semibold leading-loose">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}