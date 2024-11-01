import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import styles from "styles/landing-page/frame-modal/frame-modal.module.scss";
import { formatNumber } from "utils/utils";
import {
	FlutterWaveButton,
	closePaymentModal,
	useFlutterwave,
} from "flutterwave-react-v3";
import { flutterwaveConfig } from "utils/FlutterwaveConfig";
import { checkoutFrameAsset, clearCheckout } from "store/slice/assetSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ShopFrameDeliveryModal from "../DeliveryModal/ShopFrameDeliveryModal";

export default function ({
	frameSize,
	croppedImg,
	frames,
	print,
	appendFrame,
	uploadImg,
}) {
	const [frameType, setFrameType] = useState();
	let matOptions = [
		{ value: true, label: "Yes" },
		{ value: false, label: "No" },
	];

	let filteredFrames = frames?.frames?.assets?.data?.filter(
		(frame) => frame.meta.images[0]
	);
	const selectFrame = (list) => {
		setFrameType(list);
		appendFrame(list.meta?.images?.[0]?.public_url);
	};
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { frameImg, checkoutDetails } = useSelector((state) => state.assets);
	const [processing, setProcessing] = useState("idle");
	const [frameDimension, setFrameDimension] = useState();
	const [isMatSelected, setIsMatSelected] = useState(null);
	const dispatch = useDispatch();
	let customDetails = {
		title: "Buy Frame",
		description: "Puchase a frame",
		tx_ref: checkoutDetails.frameResult?.transaction?.tx_ref,
		amount: checkoutDetails.frameResult?.transaction?.amount,
		remarks: checkoutDetails.frameResult?.transaction?.remarks,
	};
	let image_url = print?.meta?.images?.[0]?.public_url
		? print?.meta?.images?.[0]?.public_url
		: frameImg?.assets?.url;
	let data = {
		asset_id: frameType?.id,
		sub_purchase: false,
		image_public_id: frameImg.assets?.data?.public_id,
		image_url,
		size_id: frameDimension?.id,
		phone_number: user.phone_number,
		gender: user.gender,
		street: user.address.street,
		city: user.address.city,
		state: user.address.state,
		country: user.address.country,
		print_type: "frame",
		purchase_print:1,
		image_public_id: frameImg?.assets?.public_id,
	};

	let image = print ? print?.meta?.images?.[0]?.public_url : croppedImg;

	const paymentHandler = async () => {
		if (!frameDimension || isMatSelected == null || !frameType) {
			!frameType && toast.error("Please select a Frame");
			!frameDimension && toast.error("Please select a Frame Size");
			isMatSelected == null &&
				toast.error("Please let us know if you'll need a mat");

			setProcessing("idle");
			return;
		}
		setProcessing(true);
		dispatch(checkoutFrameAsset(data));
	};

	useEffect(() => {
		if (checkoutDetails.frameResult?.transaction?.remarks) {
			setProcessing(false);
		}
	}, [checkoutDetails]);

	const flutterConfig = flutterwaveConfig(
		user,
		closePaymentModal,
		customDetails
	);



  
	return (
		<>
			<div className="mt-10 ">
				{frames?.status == "loading" && (
					<div className="flex justify-center items-center pt-10">
						<ClipLoader />
					</div>
				)}
				<div className="lg:max-h-[300px] max-h-[200px]  grid grid-cols-3 gap-4 overflow-x-auto py-7 pr-7">
					{frames?.status == "successful" &&
						filteredFrames?.map((list, index) => {
							return (
								<div
									className={`flex flex-col `}
									key={index}
									onClick={() => selectFrame(list)}
								>
									<div
										className={` ${styles.imgContainer} ${
											frameType &&
											list?.title == frameType?.title &&
											"bg-red-300/[.4]"
										}`}
									>
										<img
											src={list.meta?.images?.[0]?.public_url}
											className="w-full h-[100%] mx-auto py-2 rounded-[10px] "
										/>
									</div>

									<div className="mb-6 mt-3">
										<h6 className="text-[12px] font-bold">{list.title}</h6>
										<h6 className="text-[var(--primaryColor)] text-[12px] font-extrabold">
											&#8358;{formatNumber(list.meta.pricing?.[0]?.price)}
										</h6>
									</div>
								</div>
							);
						})}
				</div>

				<div className="mt-10">
					<div>
						<h6 className="text-[1.575rem] mb-2 mt-10">Choose Frame size:</h6>
						<div>
							<Select
								placeholder="Please select a frame size"
								options={frameSize?.map((frame) => ({
									value: frame,
									label: `${frame.width}" x ${frame.height}"`,
								}))}
								onChange={(e) => setFrameDimension(e.value)}
								classNamePrefix="react-select"
							/>
						</div>
					</div>

					<div>
						<h6 className="text-[1.575rem] mb-2 mt-5">Add Mat?</h6>
						<div>
							<Select
								placeholder=""
								options={matOptions}
								onChange={(e) => setIsMatSelected(e.value)}
								classNamePrefix="react-select"
							/>
						</div>
					</div>

					{/* <div className={`flex justify-between mt-6`}>
					<div className={` ${styles.frameSizeActive} ${styles.frameSize}`}>
						12” X 12”
					</div>

					<div className={`   ${styles.frameSize}`}>24” X 24”</div>

					<div className={`   ${styles.frameSize}`}>30” X 30”</div>

					<div className={`   ${styles.frameSize}`}>40” X 40”</div>
				</div> */}
				</div>

				<button
					className="w-full bg-[var(--primaryColor)] text-white mt-20 py-4 rounded-full"
					onClick={() => {
						if (!frameDimension || isMatSelected == null || !frameType) {
							!frameType && toast.error("Please select a Frame");
							!frameDimension && toast.error("Please select a Frame Size");
							isMatSelected == null &&
								toast.error("Please let us know if you'll need a mat");

							setProcessing("idle");
							return;
						}
           
						setOpen(true);
					}}
				>
					Buy
				</button>

				{/* {(processing === "idle" || processing == true) && (
        <button
          className="w-full bg-[var(--primaryColor)] text-white mt-20 py-4 rounded-full"
          onClick={paymentHandler}
        >
          {processing == true && "Processing..."}{" "}
          {processing == true ? <ClipLoader color="white" size={15} /> : "Buy"}
        </button>
      )}

      {processing === false && (
        <button className="w-full bg-[#29bb94] text-white mt-20 py-4 rounded-full">
          <FlutterWaveButton
            text=" Click to initiate Payment"
            {...flutterConfig}
          />
        </button>
      )} */}
			</div>
			{open === true ? (
				<ShopFrameDeliveryModal
					print={print}
					croppedImg={croppedImg}
					open={open}
					setopen={setOpen}
					uploadImg={uploadImg}
					frameDimension={frameDimension}
					isMatSelected={isMatSelected}
					frameType={frameType}
				/>
			) : null}
		</>
	);
}
