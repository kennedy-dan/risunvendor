import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import * as icons from "@/public/svgs/icons";
import useWindowDimension from "@/hooks/useWindowDimension";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/UI/Logo";
import DummyImage from "@/public/images/dummy-image.jpg";
import styles from "./ContributorLayout.module.scss";
import { logOutCustomer } from "@/store/slice/authSlice";

export default function ContributorLayout({ title, children }) {
  const mobileNavRef = useRef(null);
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);

  const { width } = useWindowDimension();
  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.auth);
  // const { data } = useSelector((state) => state.contributor);
  let data
  const { pathname } = useRouter();
  const [activeSub, setActiveSub] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  
  const links = [
    {
      title: "dashboard",
      url: "/",
      icon: <icons.Dashboard />,
    },
    {
      title: "Order",
      url: "/orders",
      icon: <icons.Earnings />,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: <icons.WalletIcon />,
    },
  ];
  
  useOnClickOutside(mobileNavRef, () => setMobileNav(false));

  useEffect(() => {
    if(!token) {
      router.push('/login')
    }
  }, [token])
  
  // Helper function to check if link is active
  const isLinkActive = (linkUrl) => {
    if (linkUrl === "/" && pathname === "/") return true;
    if (linkUrl !== "/" && pathname.startsWith(linkUrl)) return true;
    return false;
  };

  return (
    <section className="flex min-h-screen bg-gray-50">
      {width > 720 && (
        <>
          <div
            style={{ width: "calc((100vw - 1600px)/2)" }}
            className="fixed top-0 left-0 -z-[1] h-screen bg-gray-100"
          />
          <nav className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-200 flex flex-col shadow-sm">
            <div className="p-6">
              <Logo />
            </div>
            <ul className="flex-1 px-4 py-6 space-y-3"> {/* Increased space-y-1 to space-y-3 */}
              {links?.map((link) => (
                <Fragment key={link.url}>
                  <li className="w-full">
                    <Link 
                      href={link.url} 
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isLinkActive(link.url) 
                          ? 'bg-primary-50 text-primary-600 shadow-sm border-l-4 border-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={` transition-colors ${
                        isLinkActive(link.url) ? 'text-primary-600' : ''
                      }`}>
                        {link.icon}
                      </span>
                      <span className="capitalize text-lg px-3 font-medium">{link.title}</span>
                      {isLinkActive(link.url) && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                      )}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
            <div className="mt-auto p-4 pb-6 pt-6 border-t border-gray-100"> {/* Added border-top for separation */}
              <button
                onClick={() => {
                  dispatch(logOutCustomer());
                  router.push("/login");
                }}
                className="w-full text-xl text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          </nav>
        </>
      )}
      
      {width <= 720 && (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center shadow-sm">
          <Logo />
          {!mobileNav && (
            <ChevronDown
              className="w-6 h-6 ml-auto stroke-gray-600 cursor-pointer"
              onClick={() => setMobileNav(true)}
            />
          )}
          {mobileNav && (
            <ChevronUp
              className="w-6 h-6 ml-auto stroke-gray-600 cursor-pointer"
              onClick={() => setMobileNav(false)}
            />
          )}
          <AnimatePresence>
            {mobileNav && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{ type: "tween" }}
                ref={mobileNavRef}
                className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg overflow-hidden"
              >
                {links?.map((link) => (
                  <Fragment key={link.url}>
                    <li
                      className={`border-b border-gray-100 last:border-b-0 ${
                        isLinkActive(link.url) ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setMobileNav(false)}
                    >
                      <Link 
                        href={link.url} 
                        className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                          isLinkActive(link.url) 
                            ? 'text-primary-600 font-semibold' 
                            : 'text-gray-700'
                        }`}
                      >
                        <span className={`w-5 h-5 ${
                          isLinkActive(link.url) ? 'text-primary-600' : ''
                        }`}>
                          {link.icon}
                        </span>
                        <span className="capitalize font-medium">{link.title}</span>
                        {isLinkActive(link.url) && (
                          <span className="ml-auto text-xs text-primary-600">●</span>
                        )}
                      </Link>
                    </li>
                  </Fragment>
                ))}
                <li className="border-t border-gray-200 mt-2"> {/* Added margin-top for separation */}
                  <button
                    onClick={() => {
                      dispatch(logOutCustomer());
                      router.push("/login");
                    }}
                    className="w-full text-lg text-left px-6 py-4 text-red-600 font-medium"
                  >
                    Log out
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      )}
      
      <div className={`flex-1 ${width > 720 ? 'ml-[280px]' : 'mt-[64px]'}`}>
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 capitalize">{title}</h1>
          <div>
            <Link href='/profile' className='flex items-center space-x-3 group'>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                <Image
                  src={data?.user?.profile_image || DummyImage}
                  alt="user"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {user?.name || 'User'}
                </h3>
                <span className="text-lg text-gray-500">Vendor</span>
              </div>
            </Link>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </section>
  );
}

function ChevronUp(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

function ChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}