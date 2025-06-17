import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai"
import { IoIosArrowDropdownCircle } from "react-icons/io"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const location = useLocation()
  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // 🔁 Fetch categories from API
 useEffect(() => {
  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Categories API response data:", response.data);  // <-- Add this line here
      setSubLinks(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
    setLoading(false);
  };

  fetchSubLinks();
}, []);


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    {/* Dropdown */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p>Loading...</p>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((subLink, index) => (
                          <Link to={`/catalog/${subLink.name.toLowerCase().replace(/\s+/g, "-")}`} key={index} className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                            <p className="text-sm text-richblack-800 font-semibold capitalize">
                              {subLink.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p>No categories found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right-side items */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {!token && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token && <ProfileDropdown />}
        </div>

        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar

