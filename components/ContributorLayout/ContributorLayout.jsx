import { useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
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

export default function ContributorLayout({ title, children }) {
  const mobileNavRef = useRef(null);
  const { width } = useWindowDimension();
  // const { user } = useSelector((state) => state.auth);
  // const { data } = useSelector((state) => state.contributor);
  let user
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
    // { title: "profile", url: "/contributor/profile", icon: <icons.Profile /> },
    {
      title: "Wallet",
      url: "/wallet",
      icon: <icons.SubContributor />,
    },
  ];
  useOnClickOutside(mobileNavRef, () => setMobileNav(false));

  return (
    <section className={styles.container}>
      {width > 720 && (
        <>
          <div
            style={{ width: "calc((100vw - 1600px)/2)" }}
            className="fixed top-0 left-0 -z-[1] h-screen bg-[var(--bg-tertiary)]"
          />
          <nav className={styles["desktop-nav"]}>
            <Logo />
            <ul>
              {links?.map((link) => (
                <Fragment key={link.url}>
                  <li className={` text-[14px]  ${pathname === link.url ? styles.active : null}`}>
                    <Link href={link.url}>
                      {link.icon}
                      {link.title}
                    </Link>
                    {/* {link.sub &&
                      (activeSub ? (
                        <ChevronUp
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSub(null);
                          }}
                          className="absolute w-6 h-6 -translate-y-1/2 right-8 top-1/2"
                        />
                      ) : (
                        <ChevronDown
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSub(link.url);
                          }}
                          className="absolute w-6 h-6 -translate-y-1/2 right-8 top-1/2"
                        />
                      ))} */}
                  </li>
                  {link.sub &&
                    true &&
                    // activeSub === link.url &&
                    link.sub.map((sub) => (
                      <li
                        className={pathname === sub.url ? styles.active : null}
                        key={link.sub.url}
                        onClick={() => setActiveSub(null)}
                        style={{
                          backgroundColor: "#27272a",
                          // borderRadius: '6px'
                        }}
                      >
                        <Link
                          className="!py-4 !pl-28 text-[1.3rem]"
                          href={sub.url}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                </Fragment>
              ))}
            </ul>
            <Link
              href="/contributor/terms-and-conditions"
              className="mt-auto mb-4 ml-4 text-xl text-red-600 hover:underline"
            >
              Terms of service
            </Link>
          </nav>
        </>
      )}
      {width <= 720 && (
        <nav className={styles["mobile-nav"]}>
          <Logo />
          {!mobileNav && (
            <ChevronDown
              className="w-10 h-10 ml-auto stroke-white"
              onClick={() => setMobileNav(true)}
            />
          )}
          {mobileNav && (
            <ChevronUp
              className="w-10 h-10 ml-auto stroke-white"
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
              >
                {links?.map((link) => (
                  <Fragment key={link.url}>
                    <li
                      className={pathname === link.url ? styles.active : null}
                      style={link.sub ? { position: "relative" } : null}
                      onClick={() => setMobileNav(false)}
                    >
                      <Link href={link.url}>
                        {link.icon}
                        {link.title}
                      </Link>
                      {link.sub &&
                        (activeSub ? (
                          <ChevronUp
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSub(null);
                            }}
                            className="absolute w-6 h-6 bg-red-700 -translate-y-1/2 right-8 top-1/2"
                          />
                        ) : (
                          <ChevronDown
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSub(link.url);
                            }}
                            className="absolute w-6 h-6 -translate-y-1/2 right-8 top-1/2"
                          />
                        ))}
                    </li>
                    {link.sub &&
                      activeSub === link.url &&
                      link.sub.map((sub) => (
                        <li
                          key={link.sub.url}
                          onClick={() => setActiveSub(null)}
                          className="bg-zinc-800"
                        >
                          <Link
                            className="!py-4 !pl-32 text-[1.3rem]"
                            href={sub.url}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                  </Fragment>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      )}
      <div>
        <header>
          <h1>{title}</h1>
            <div>
          <Link href='/profile' className='flex space-x-3' >

            <Image
              src={data?.user?.profile_image || DummyImage}
              alt="user"
              width={40}
              height={40}
            />
            <h3>
              {user?.first_name}
              <br />
              <span>Contributor</span>
            </h3>
          </Link>

          </div>
        
        </header>
        <div>{children}</div>
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
      strokeWidth={4}
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
      strokeWidth={4}
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
