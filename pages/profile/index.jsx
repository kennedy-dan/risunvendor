import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import DummyImage from "@/public/images/dummy-image.jpg";
import ContributorLayout from "@/components/ContributorLayout";
import styles from "@/styles/contributor/profile/index.module.scss";
// import { Modal } from "antd";
import { toast } from "react-toastify";
import { EyeOff, EyeOn, LeftArrow } from "@/public/svgs/icons";

// import {
//   _getContributorData,
//   _updateContributorData,
// } from "store/slice/contributorSlice";
// import {
//   updateAccountInformation,
//   updatePassword,
//   uploadProfile,
//   uploadProfileImage,
// } from "services/customer";
export default function Index() {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.contributor);
//   const fetcher = (url) => axios.get(url).then(({ data }) => data.data);
let data
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [about, setAbout] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    confirmNewPassword: "",
    newPassword: "",
  });
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [inputType3, setInputType3] = useState("password");
//   const { data: bankingDetails } = useSWR(
//     "/contributor/account-details",
//     fetcher
//   );
  const [active, setActive] = useState("profile");
  const [openprev, setPrev] = useState(false);

  const [bankData, setBankData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    street: "",
  });

  function updateBankData(e) {
    const { value, name } = e.target;
    setBankData({
      ...bankData,
      [name]: value,
    });
  }

  function updatePasswordData(e) {
    const { value, name } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  useEffect(() => {
    // dispatch(_getContributorData());
  }, []);

  useEffect(() => {
    setProfileData({
      firstName: data?.user?.first_name,
      lastName: data?.user?.last_name,
      email: data?.user?.email,
      gender: data?.user?.gender,
      // country: data?.user_bio.country,
      // state: data?.user_bio.state,
      // city: data?.user_bio.city,
      // street: data?.user_bio.street,
    });
  }, [data]);

  function handleProfileUpdate(e) {
    e.preventDefault();
    const payload = {
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      email: profileData.email,
      gender: profileData.gender,
      country: profileData.country,
      state: profileData.state,
      city: profileData.city,
      street: profileData.street,
    };
    toast.promise(uploadProfile(payload), {
      pending: "Updating Profile",
      success: {
        render() {
        //   dispatch(_getContributorData());
          return "Profile Updated";
        },
      },
    });
  }
  function uploadPhoto() {
    const formData = new FormData();
    formData.append("image", photo);
    toast.promise(uploadProfileImage(formData), {
      pending: "Uploading Photo",
      success: {
        render() {
        //   dispatch(_getContributorData());
          setPhotoUrl(null);
          return "Photo Uploaded";
        },
      },
    });
  }

  function updateProfileData(e) {
    const { value, name } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  }

  const sendUpdate = () => {
    console.log("done");
    dispatch(_updateContributorData({ profile_overview: about }));
  };

  function handleBankUpdate(e) {
    e.preventDefault();
    const payload = {
      bank_name: bankData.bankName,
      account_name: bankData.accountName,
      account_number: bankData.accountNumber,
      // bank_sort_code: 6172450185,
    };
    toast.promise(updateAccountInformation(payload), {
      pending: "Updating Account",
      success: {
        render() {
          // dispatch(_getContributorData());
          return "Account Updated";
        },
      },
    });
  }

  function handlePasswordUpdate(e) {
    e.preventDefault();
    const payload = {
      old_password: passwordData.oldPassword,
      password: passwordData.newPassword,
      password_confirmation: passwordData.confirmNewPassword,
    };
    toast.promise(updatePassword(payload), {
      pending: "Updating Password",
      success: {
        render() {
          setPasswordData({
            oldPassword: "",
            confirmNewPassword: "",
            newPassword: "",
          });
          // dispatch(_getContributorData());
          return "Password Updated";
        },
      },
    });
  }
  const account = (
    <div className="px-4 ">
      <div className="border border-1 py-7 px-[50px] rounded-2xl">
        <div className="space-y-4">
          <p className="text-gray-500 text-[15px] font-semibold ">
            BANK DETAILS
          </p>
          <div>
            <p className="text-[14px]">Bank Name</p>
            <input
              className="outline-none border border-1 px-3 text-[15px] border-gray-600 rounded-2xl w-full py-7 "
              // value={bankingDetails?.bank_name}
              type="text"
              id="bankName"
              name="bankName"
              value={bankData.bankName}
              onChange={updateBankData}
            />
          </div>

          <div>
            <p className="text-[14px]">Account number</p>
            <input
              className="outline-none border border-1 px-3 text-[15px] border-gray-600 rounded-2xl w-full py-7 "
              // value={bankingDetails?.account_number}
              type="text"
              name="accountNumber"
              value={bankData.accountNumber}
              onChange={updateBankData}
            />
          </div>

          <div>
            <p className="text-[14px]">Account name</p>
            <input
              className="outline-none border border-1 px-3 text-[15px] border-gray-600 rounded-2xl w-full py-7 "
              // value={bankingDetails?.account_name}
              type="text"
              name="accountName"
              value={bankData.accountName}
              onChange={updateBankData}
            />
          </div>
        </div>
        <div className="flex justify-end my-7">
          <button
            onClick={handleBankUpdate}
            className="bg-[#2f4858] text-white w-[12rem] text-[14px] py-4 "
          >
            Edit Details
          </button>
        </div>
      </div>
      <div>
        <div
          // {...motionProps}
          // onSubmit={handlePasswordUpdate}
          className="border border-1 py-7 px-[50px] rounded-2xl"
          // className={styles["change-password"]}
        >
          <fieldset className="mt-4">
            <label className="text-[14px]" htmlFor="oldPassword">
              Old Password
            </label>
            <div className="relative">
              <input
                type={inputType1}
                id="oldPassword"
                name="oldPassword"
                className="outline-none border border-1 px-3 text-[15px] border-gray-600 rounded-2xl w-full py-7 "
                value={passwordData.oldPassword}
                onChange={updatePasswordData}
              />
              <div className="absolute left-[90%] top-8 ">
                {inputType1 === "password" && (
                  <EyeOn onClick={() => setInputType1("text")} />
                )}
                {inputType1 === "text" && (
                  <EyeOff onClick={() => setInputType1("password")} />
                )}
              </div>
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <label className="text-[14px]" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                type={inputType2}
                name="newPassword"
                value={passwordData.newPassword}
                className="outline-none border border-1 px-3 text-[15px] border-gray-600 rounded-2xl w-full py-7 "
                onChange={updatePasswordData}
              />
              <div className="absolute left-[90%] top-8 ">
                {inputType2 === "password" && (
                  <EyeOn onClick={() => setInputType2("text")} />
                )}
                {inputType2 === "text" && (
                  <EyeOff onClick={() => setInputType2("password")} />
                )}
              </div>
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <label className="text-[14px]" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={inputType3}
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                className="outline-none border border-1 px-3 text-[15px] border-gray-600 rounded-2xl w-full py-7 "
                onChange={updatePasswordData}
              />
              <div className="absolute left-[90%] top-8 ">
                {inputType3 === "password" && (
                  <EyeOn onClick={() => setInputType3("text")} />
                )}
                {inputType3 === "text" && (
                  <EyeOff onClick={() => setInputType3("password")} />
                )}
              </div>
            </div>
          </fieldset>
          <div className="flex justify-end my-7">
            <button
              onClick={handlePasswordUpdate}
              className="bg-[#2f4858] text-white w-[12rem] text-[14px] py-4 "
            >
              Save changes{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const profile = (
    <div className="px-4 ">
      <div className="border border-1 py-7 px-8 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={data?.user?.profile_image || DummyImage}
              alt="user"
              width={200}
              height={200}
              className="h-[100px] w-[100px] rounded-full "
            />
            <div>
              <p className="md:text-[16px] font-bold">
                {`${data?.user?.first_name} ${data?.user?.last_name}`}
                {/* <span>
                    <LocationMarker />
                    Ogun state, Nigeria
                  </span> */}
              </p>
              <b className="text-[#eb5757]">Contributor</b>
            </div>
          </div>
          <div>
            <button
              onClick={() => setPrev(true)}
              className="bg-[#2f4858] text-white w-[12rem] text-[14px] py-4 "
            >
              Edit Details
            </button>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-500 uppercase md:text-[16px] ">
            About
          </p>
          <div className="mt-3">
            <p>{data?.contributor_data?.profile_overview}</p>
          </div>
        </div>
        <div className="mt-16">
          <p className="font-semibold text-gray-500 uppercase md:text-[16px] ">
            CONTACT INFORMATION
          </p>
          <p className="text-[13px] mt-3">
            Phone :
            <span className="font-bold text-[#2f4858] pl-4">
              {data?.user?.phone_number}
            </span>
          </p>
          <p className="text-[13px] mt-3">
            Email Address :
            <span className="!lowercase font-bold text-[#2f4858] pl-4">
              {data?.user?.email}
            </span>
          </p>
          {/* <p>
                    Residential Address :<span>asherifa, ogun state</span>
                  </p> */}
        </div>
        <div className="mt-16">
          <p className="font-semibold text-gray-500 uppercase md:text-[16px]">
            BASIC INFORMATION
          </p>
          <p className="mt-3 text-[13px]">
            Gender :
            <span className="!lowercase font-bold text-[#2f4858] pl-4">
              {data?.user?.gender}
            </span>
          </p>
          {/* <p>
                    Date of birth:<span>04 June,1998</span>
                  </p> */}
        </div>

        <div className="mt-16">
          <p className="font-semibold text-gray-500 uppercase md:text-[16px]">
            Interest
          </p>
          <span className="font-bold text-[#2f4858] pl-4">
            {data?.user?.contributor?.asset_type_of_interest}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <ContributorLayout title="Profile">
      <div>
        {/* {loading && !data && (
          <MoonLoader
            color="#2f4858"
            size={22}
            cssOverride={{ margin: "10rem auto" }}
          />
        )} */}
        {/* {data && ( */}
          <>
            <div className="flex w-full justify-between  ">
              <div className='cursor-pointer' >
                <div className={`${active == 'profile' ? 'text-[#2f4858] text-[14px] font-bold' : 'text-[13px]' }`} onClick={() => setActive("profile")}>
                  <p>My Profile</p>
                </div>
                <div className={`${active == 'account' ? 'text-[#2f4858] text-[14px] font-semibold' : 'text-[13px]' }`} onClick={() => setActive("account")}>
                  <p>Account Settings</p>
                </div>
              </div>

              <div className="w-[75%]">
                {active === "profile" ? profile : account}
              </div>
            </div>
            {/* <Link href="profile/edit">Edit Profile</Link> */}
         
          </>
        {/* )} */}
      </div>
      {/* <Modal // title="Image Preview"
        footer={null}
        open={openprev}
        width={1000}
        // height={300}
        // bodyStyle={{ height: '550px' }}  // Customize height
        style={{ top: 17 }}
        // closeIcon={false}
        onCancel={() => setPrev(false)}
      >
        <div>
          <p className="text-[20px] font-[500] ">Edit Profile</p>
        </div>

        <div className={"flex space-x-6 mt-20 w-full"}>
          <div className="">
            <Image
              src={
                photoUrl
                  ? photoUrl
                  : data?.user?.profile_image
                  ? data?.user?.profile_image
                  : DummyImage
              }
              width={200}
              height={200}
              className="h-[100px] w-[100px] rounded-full "
              alt="user"
              // fill
            />
            {!photoUrl && <label htmlFor="photo" className='bg-[#65696B] rounded-md px-4 py-3 text-white '  >Change Photo</label>}
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => {
                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                setPhoto(e.target.files[0]);
              }}
              hidden
            />
            {photoUrl && <button onClick={uploadPhoto}>Upload</button>}
            {photoUrl && (
              <button
                className="!bg-white !text-[#2f4858]"
                onClick={() => setPhotoUrl(DummyImage)}
              >
                Cancel
              </button>
            )}
          </div>
          <div className="w-[75%]">
            <form onSubmit={handleProfileUpdate}>
              <div>
                <div className="flex space-x-5 ">
                  <fieldset className="w-1/2">
                    <label htmlFor="firstName">First Name</label>
                    <div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={updateProfileData}
                        className="outline-none border px-5 border-1 border-gray-600 rounded-2xl w-full py-6"
                      />
                    </div>
                  </fieldset>
                  <fieldset className="w-1/2">
                    <label htmlFor="lastName">Last Name</label>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={updateProfileData}
                        className="outline-none border px-5  border-1 border-gray-600 rounded-2xl w-full py-6"
                      />
                    </div>
                  </fieldset>
                </div>

                <fieldset className="mt-14">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={updateProfileData}
                    className="outline-none px-5  border border-1 border-gray-600 rounded-2xl w-full py-6"
                  />
                </fieldset>
                <fieldset className="mt-14">
                  <label htmlFor="gender">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={profileData.gender}
                    onChange={updateProfileData}
                    className="outline-none px-5  border border-1 border-gray-600 rounded-2xl w-full py-6"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </fieldset>
              </div>
              <button 
              className="bg-[#2f4858] text-white w-[12rem] rounded-md mt-4 text-[14px] py-4 "
              
              >Save Changes</button>
            </form>
            <fieldset className="mt-6">
              <p htmlFor="">About me</p>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                className="w-full rounded-md border-gray-300 border"
              ></textarea>
            </fieldset>
            <div className="flex justify-end mt-6">
              <button
                onClick={sendUpdate}
                className="bg-[#2f4858] py-4 px-5 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal> */}
    </ContributorLayout>
  );
}
