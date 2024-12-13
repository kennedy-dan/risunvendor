import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CheckMark, EyeOff, EyeOn } from "@/public/svgs/icons";
import {
  _registerCustomer,
} from "@/store/slice/authSlice";
import { ClipLoader } from "react-spinners";
import { Select, ConfigProvider } from "antd/lib";
// import { ConfigProvider } from "antd/lib";

import locations, { compare } from "@/data/location";
import Image from "next/image";
import Link from "next/link";
import LogoWhite from "@/public/images/logo-white.png";
// import Select from "react-select";
import { toast } from "react-toastify";
import styles from "@/styles/auth/auth.module.scss";

const CustomerSignup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cities, setCities] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    type: "",
    personnel_name: "",
    business_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    country: "",
    state: "",
    city: "",
    street: "",
    personnel_role: ""
  });
  const customSelectStyles = {
    control: () => ({
      display: "flex",
      border: "1px solid #ccc",
      height: "4rem",
      borderRadius: 24.2162,
      background: "#f0f0f0",
    }),
    menuList: (provided) => ({
      ...provided,
      textTransform: "capitalize",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
    }),
    singleValue: (provided) => ({
      ...provided,
      textTransform: "capitalize",
      margin: 0,
    }),
    multiValue: (provided) => ({
      ...provided,
      textTransform: "capitalize",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: 13,
    }),
    valueContainer: (provided) => ({
      ...provided,
      fontSize: "100%",
      padding: "0 22.7027px",
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: 0,
      color: "#9BA3AF",
    }),
  };

  const country_list = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  function updateFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(_registerCustomer(formData));
  }

  function resetFormDisplay() {
    setForm1(false);
    setForm2(false);
    setForm3(false);
  }

  useEffect(() => {
    locations.map((location) => {
      if (location.state === formData.state) {
        const sort = location.lgas.sort(compare);
        return setCities(sort);
      }
    });

    if (formData.state === undefined) {
      setCities(null);
      setFormData({
        ...formData,
        state: "",
        city: "",
      });
    }
  }, [formData.state]);

  useEffect(() => {
    if (user) {
      resetFormDisplay();
      setSuccess(true);
    }
  }, [user]);

  // useEffect(() => {
  //   if (token) router.push("/");
  // }, [token]);

  const customTheme = {
    select: {
      backgroundColor: "red", // Set your desired background color here
    },
  };
  return (
    <div
      className={`flex justify-center bg-[url('/images/signupbg.jpg')] bg-cover bg-center  `}
    >
      <div className={`bg-primary ${styles.container}  py-40 px-16 w-[790px]`}>
        {form1 && (
          <form
            className=" w-full"
            onSubmit={(e) => {
              e.preventDefault();
              resetFormDisplay();
              setForm2(true);
            }}
          >
            <div className="justify-center flex">
              <span className={styles.active}>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <h2 className="font-semibold text-center tracking-tight ">
              Create Account
            </h2>
            <p className="font text-gray-600 text-[16px] px-6 tracking-tighter">
              {" "}
             
            </p>
            <fieldset>
              <input
                name="business_name"
                className="text-[16px] text-gray-500 font-semibold outline-none "
                type="name"
                placeholder="Business name"
                value={formData.business_name}
                onChange={updateFormData}
                required
              />
            </fieldset>
            <fieldset>
              <input
                name="first_name"
                className="text-[16px] text-gray-500 font-semibold outline-none "
                type="name"
                placeholder="First name"
                value={formData.first_name}
                onChange={updateFormData}
                required
              />
            </fieldset>
            <fieldset>
              <input
                name="last_name"
                className="text-[16px] text-gray-500 font-semibold outline-none "
                type="name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={updateFormData}
                required
              />
            </fieldset>
            <fieldset>
              <input
                name="email"
                className="text-[16px] text-gray-500 font-semibold outline-none "
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={updateFormData}
                required
              />
            </fieldset>
            <fieldset>
              <input
                name="password"
                type={inputType1}
                placeholder="Password"
                className="text-[16px] text-gray-500 font-semibold outline-none "
                value={formData.password}
                onChange={updateFormData}
                required
              />
              {inputType1 === "password" && (
                <EyeOn onClick={() => setInputType1("text")} />
              )}
              {inputType1 === "text" && (
                <EyeOff onClick={() => setInputType1("password")} />
              )}
            </fieldset>
            <fieldset>
              <input
                name="password_confirmation"
                type={inputType2}
                placeholder="Confirm password"
                value={formData.password_confirmation}
                className="text-[16px] text-gray-500 font-semibold outline-none "
                onChange={updateFormData}
                required
              />
              {inputType2 === "password" && (
                <EyeOn onClick={() => setInputType2("text")} />
              )}
              {inputType2 === "text" && (
                <EyeOff onClick={() => setInputType2("password")} />
              )}
            </fieldset>
            <button className="text-4xl">Proceed</button>

            <section className="flex justify-between items-center py-16">
              <div className="bg-gray-400 h-[0.5px] w-full"></div>
              <div className="px-4">
                <p className="text-3xl">OR</p>
              </div>
              <div className="bg-gray-400 h-[0.5px] w-full"></div>
            </section>

            <section>
              {" "}
              <div className="w-full text-black border border-black text-3xl tracking-tighter text-center py-6 ">
                Sign in With Google
              </div>
            </section>

            <p className="text-center tracking-tight text-[16px] mt-9">
              Already have an account?{" "}
              <span className="text-blue-600   mt-4">Log in</span>
            </p>
          </form>
        )}
        {form2 && (
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              resetFormDisplay();
              if (formData.country === "") {
                toast.error("Please input the country");
                setForm3(false);
                setForm2(true);
              } else {
                setForm3(true);
              }
            }}
          >
            <div className="justify-center flex">
              <span
                className={styles.active}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  resetFormDisplay();
                  setForm1(true);
                }}
              >
                1
              </span>
              <span className={styles.active}>2</span>
              <span>3</span>
            </div>
            <h2 className="font-semibold text-center tracking-tight ">
              Create Account
            </h2>
            <p className="font text-gray-600 text-[16px] px-6 tracking-tighter">
              {" "}
           
            </p>
            <fieldset>
              <input
                type="text"
                placeholder="Vendor type"
                name="type"
                className="text-[16px] text-[#6B7280]  font-[700] outline-none "
                required
                value={formData.type}
                onChange={updateFormData}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                placeholder="Personnel name"
                required
                name="personnel_name"
                className="text-[16px]  font-[700] outline-none "
                value={formData.personnel_name}
                onChange={updateFormData}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                placeholder="Personnel role"
                required
                name="personnel_role"
                className="text-[16px]  font-[700] outline-none "
                value={formData.personnel_role}
                onChange={updateFormData}
              />
            </fieldset>
            <fieldset>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedFontWeight: 600,
                    },
                  },
                  // ...customTheme,
                  token: {
                    borderRadius: 0,
                    controlHeight: 60,
                    colorBgContainer: "#f0f0f0",
                    fontSize: 16,
                    // optionSelectedFontWeight: 300
                  },
                }}
              >
                <Select
                  // styles={customSelectStyles}
                  id="country"
                  placeholder="Country "
                  showSearch
                  className={` w-full ${styles.customSelect}`}
                  // className=" "
                  options={country_list.map((country) => ({
                    value: country,
                    label: country,
                  }))}
                  onChange={(e) => {
                    console.log(e);
                    setFormData({
                      ...formData,
                      country: e || "",
                    });
                  }}
                  required={true}
                  isClearable
                  style={{ backgroundColor: "red" }}
                />
              </ConfigProvider>
            </fieldset>
            <button className="text-4xl">Proceed</button>
            {/* <span>
            <Link
              href="/"
              onClick={() => dispatch(setCustomerModalDisplay(true))}
            >
              Login!
            </Link>{" "}
            if you already have an account.
          </span> */}
          </form>
        )}

        {form3 && (
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="justify-center flex">
              <span
                className={styles.active}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  resetFormDisplay();
                  setForm1(true);
                }}
              >
                1
              </span>
              <span
                className={styles.active}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  resetFormDisplay();
                  setForm2(true);
                }}
              >
                2
              </span>
              <span>3</span>
            </div>
            <h2 className="font-semibold text-center tracking-tight ">
              Create Account
            </h2>
            <p className="font text-gray-600 text-[16px] px-6 tracking-tighter">
              {" "}
             
            </p>
            <fieldset>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedFontWeight: 600,
                    },
                  },
                  // ...customTheme,
                  token: {
                    borderRadius: 0,
                    controlHeight: 60,
                    colorBgContainer: "#f0f0f0",
                    fontSize: 16,
                    // optionSelectedFontWeight: 300
                  },
                }}
              >
                <Select
                  styles={customSelectStyles}
                  id="state"
                  placeholder="State"
                  className={` w-full ${styles.customSelect}`}
                  showSearch
                  options={locations?.map((location) => ({
                    value: location.state,
                    label: location.state,
                  }))}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state: e || "",
                    })
                  }
                  isClearable
                  classNamePrefix="react-select"
                />
              </ConfigProvider>
            </fieldset>
            <fieldset>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedFontWeight: 600,
                    },
                  },
                  // ...customTheme,
                  token: {
                    borderRadius: 0,
                    controlHeight: 60,
                    colorBgContainer: "#f0f0f0",
                    fontSize: 16,
                    // optionSelectedFontWeight: 300
                  },
                }}
              >
                <Select
                  styles={customSelectStyles}
                  id="city"
                  placeholder="City"
                  showSearch
                  className={` w-full ${styles.customSelect}`}
                  options={cities?.map((city) => ({
                    value: city,
                    label: city,
                  }))}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e || "",
                    })
                  }
                  isClearable
                  isDisabled={formData.state === ""}
                  classNamePrefix="react-select"
                />
              </ConfigProvider>
            </fieldset>
            <fieldset>
              <input
                type="text"
                placeholder="Address"
                name="street"
                value={formData.street}
                onChange={updateFormData}
                className="text-[16px]"
              />
            </fieldset>
            <button className="text-4xl">
              {loading ? <ClipLoader color="#ffffff" size={12} /> : "Sign Up"}
            </button>
            {/* <span>
            <Link
              href="/"
              onClick={() => dispatch(setCustomerModalDisplay(true))}
            >
              Login!
            </Link>{" "}
            if you already have an account.
          </span> */}
          </form>
        )}
        {success && (
          <form className="w-full h-screen ">
            <div className="flex justify-center">
              <CheckMark />
            </div>
            <h2 className="font-semibold text-center tracking-tight ">
              Account creation successful
            </h2>
         
            {/* <button type="button" className='text-4xl' >Resend link</button> */}
            <button  className="text-4xl mt-2">
              <Link href="/login">Login</Link>
            </button>
               {/* <p className="text-center tracking-tight text-[16px] mt-9">
              Havent received verification link?{" "}
              <div type="" className="text-blue-600    mt-4">Resend</div>
            </p> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerSignup;
