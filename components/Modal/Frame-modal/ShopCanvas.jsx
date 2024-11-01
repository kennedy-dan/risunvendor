import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "styles/landing-page/frame-modal/frame-modal.module.scss";
import Select from "react-select";

import {
	FlutterWaveButton,
	closePaymentModal,
	useFlutterwave,
} from "flutterwave-react-v3";
import { flutterwaveConfig } from "utils/FlutterwaveConfig";
import { checkoutAsset, checkoutCanvasAsset } from "store/slice/assetSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ShopCanvasDeliveryModal from "../DeliveryModal/ShopCanvasDeliveryModal";

export default function ShopCanvas({
	frameSize,
	croppedImg,
	print,
	appendFrame,
	uploadImg,
}) {
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { frameImg, checkoutDetails } = useSelector((state) => state.assets);
	const [processing, setProcessing] = useState("idle");
	const [canvasSize, setCanvasSize] = useState(null);
	const [beginPayment, setBeginPayment] = useState(false);
	const dispatch = useDispatch();
	let customDetails = {
		title: "Shop Canvas",
		description: "Puchase a shop print",
		tx_ref: checkoutDetails.canvasResult?.transaction?.tx_ref,
		amount: checkoutDetails.canvasResult?.transaction?.amount,
		remarks: checkoutDetails.canvasResult?.transaction?.remarks,
	};

	let image_url = print?.meta?.images?.[0]?.public_url
		? print?.meta?.images?.[0]?.public_url
		: frameImg?.assets?.url;

	let data = {
		asset_id: print?.id,
		sub_purchase: false,
		image_public_id: frameImg.assets?.public_id,
		image_url,
		size_id: canvasSize?.id,
		phone_number: user.phone_number,
		gender: user.gender,
		street: user.address.street,
		city: user.address.city,
		state: user.address.state,
		country: user.address.country,
		print_type: "canvas",

		purchase_print:1,
	};

	let image = print ? print?.meta?.images?.[0]?.public_url : croppedImg;
	appendFrame("");
	const paymentHandler = async () => {
		if (!canvasSize) {
			toast.error("Please select a canvas size");
			return;
		}
		setProcessing(true);
		dispatch(checkoutCanvasAsset(data));
	};

	useEffect(() => {
		if (checkoutDetails.canvasResult?.transaction?.remarks) {
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
			<section>
				<div className="mt-14">
					<h6 className="text-[1.875rem] mt-20">Choose Canvas size</h6>
					<div>
						<Select
							placeholder="Please select a canvas size"
							options={frameSize?.map((frame) => ({
								value: frame,
								label: `${frame.width}" x ${frame.height}"`,
							}))}
							onChange={(e) => setCanvasSize(e.value)}
							classNamePrefix="react-select"
						/>
					</div>
					{/* <h6 className="text-[1.875rem] mt-20">Choose Frame size</h6>
				<div className={`flex justify-between mt-6`}>
					<div className={` ${styles.frameSizeActive} ${styles.frameSize}`}>
						12” X 12”
					</div>

					<div className={`   ${styles.frameSize}`}>24” X 24”</div>

					<div className={`   ${styles.frameSize}`}>30” X 30”</div>

					<div className={`   ${styles.frameSize}`}>40” X 40”</div>
				</div> */}
				</div>

				<div className="flex mt-14 justify-between">
					<div
						className={` ${styles.imgContainer} border border-[#2F4858] rounded-md  w-[30%] mr-7`}
					>
						<img
							src={image}
							className="w-[80%] mx-auto object-cover py-3 rounded-[10px]  h-[90px]"
						/>
					</div>
					<p className="w-[70%] text-[1.4rem] font-bold">
						Our Canvas is professionally hand - stretched and layered with
						protective ink for a museum grade finish
					</p>
				</div>

				<button
					className="w-full bg-[var(--primaryColor)] text-white mt-20 py-4 rounded-full"
					onClick={() => {
						if (!canvasSize) {
							toast.error("Select a size");
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
				<button className="w-full bg-[var(--green)] text-white mt-20 py-4 rounded-full">
					<FlutterWaveButton text="Click to Make Payment" {...flutterConfig} />
				</button>
			)} */}
			</section>
			{open === true ? (
				<ShopCanvasDeliveryModal
					print={print}
					croppedImg={croppedImg}
					open={open}
					setopen={setOpen}
					canvasSize={canvasSize}
					uploadImg={uploadImg}
				/>
			) : null}
		</>
	);
}
