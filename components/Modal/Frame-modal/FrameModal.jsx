import React, { useEffect, useState, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMockUp, getFrames, getFrameSize } from "store/slice/assetSlice";
import styles from "styles/landing-page/frame-modal/frame-modal.module.scss";
import ShopCanvas from "./ShopCanvas";
import ShopFrame from "./ShopFrame";
import ShopPrint from "./ShopPrint";

import axios from "axios";
import { toast } from "react-toastify";
import { frameImage } from "store/slice/assetSlice";
import { ClipLoader } from "react-spinners";
import { toDataURL, urltoFile } from "utils/ConvertImage";
import useWindowDimension from "hooks/useWindowDimension";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

export default function FrameModal({ croppedImg, print, uploadImg }) {
  const [nav, setNav] = useState(1);
  const [previewFrame, setPreviewFrame] = useState(null);
  const { frameImg, frameSize } = useSelector((state) => state.assets);
  const [mockDemo, setmockDemo] = useState();
  const [selectedFrames, setSelectedFrames] = useState();
  const windowSize = useWindowDimension();
  const dispatch = useDispatch();

  const printCanvasRef = useRef(null);
  const frameCanvasRef = useRef(null);

  console.log(print)

  useEffect(() => {
    dispatch(getFrames());
    dispatch(getFrameSize());
    dispatch(getAllMockUp());
  }, []);

  const selectFrame = (frame) => {
    setSelectedFrames(frame);
  };

  const selectMockUp = (mock) => {
    setmockDemo(mock.image_url);
  };
  let style = {
    //	backgroundImage: `url("https://res.cloudinary.com/devijo/image/upload/v1671788933/assets/cover/fvng92pcb9qbeqwacgzs.png")`,
    backgroundSize: windowSize.width < 500 ? "310px 300px" : "350px 350px",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${mockDemo ? " " : selectedFrames})`,
  };

  let image = print ? print?.meta?.images?.[0]?.public_url : croppedImg;

  const { user, token, profileStatus } = useSelector((state) => state.auth);
  const { mockup } = useSelector((state) => state.assets);
  const [loading, setLoading] = useState(false);
  let assetImg = print?.meta?.images?.[0]?.private_url;

  const uploadProfilePicture = async () => {
    setLoading(true);
    //Usage example:
    let imgObj = await toDataURL(assetImg).then(async (dataUrl) => {
      let fileData = await urltoFile(dataUrl, "a.png").then(function (file) {
        return file;
      });

      return fileData;
    });

    const finaldata = new FormData();

    finaldata.append("image", imgObj);

    let config = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `Bearer ${token ? token : " "}`,
    };
    if (!finaldata) return;

    axios
      .post(
        "https://api.myartstocks.com/orders/frames/upload-image",
        finaldata,
        config
      )
      .then((res) => {
        dispatch(frameImage(res.data.data));

        setLoading(false);
        // saveCrop(croppedImg);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  if (print) {
    useEffect(() => {
      uploadProfilePicture();
    }, []);
  }

  const Box = () => {
    const mesh = useRef();

    const texture_1 = useLoader(TextureLoader, image);

    return (
      <mesh ref={mesh} rotation={[0, Math.PI * (20 / 100), 0]}>
        <boxBufferGeometry attach="geometry" args={[5, 4, 1.2]} />

        <meshStandardMaterial map={texture_1} attachArray="material" />
      </mesh>
    );
  };

  let renderPrintImage = () => {
    const canvas = printCanvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      const loadImages = async () => {
        const main = await loadImage(image);
        let img = selectedFrames ? selectedFrames : image; // Assuming you have a variable named selectedFrame holding the URL of the selected frame
        const frame = await loadImage(img);

        // Set the canvas size to match the image sizes
        canvas.width = main.width;
        canvas.height = main.height;

        // Draw the main image onto the canvas
        context.drawImage(main, 0, 0);

        // If a frame is selected, overlay it on top of the main image
        if (selectedFrames) {
          // Set the "source-over" composite mode to draw the frame image on top of the main image
          context.globalCompositeOperation = "source-over";

          // Draw the main image onto the canvas
          context.drawImage(main, 0, 0, canvas.width, canvas.height);

          // Calculate the scaling factor for the frame image height
          const frameScale = canvas.height / 300;

          // Calculate the width of the frame image based on the aspect ratio and scaled height
          const frameWidth =
            (frame.width / frame.height) * (canvas.height * frameScale);

          // Calculate the offset to center the frame image horizontally
          const offsetX = (canvas.width - frameWidth) / 2;

          // Draw the frame image onto the canvas, scaling and positioning it to wrap around the main image
          context.drawImage(
            frame,
            0,
            0,
            frame.width,
            frame.height,
            offsetX,
            0,
            frameWidth,
            canvas.height
          );

          // Reset the composite mode to the default
          context.globalCompositeOperation = "source-over";
        }
      };

      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      loadImages();
    }
  };

  let renderFrameImage = () => {
    const canvas = frameCanvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      const loadImages = async () => {
        const main = await loadImage(image);
        let img = selectedFrames ? selectedFrames : image;

        const frame = await loadImage(img);

        // Draw the main image onto the canvas
        context.drawImage(main, 0, 0, canvas.width, canvas.height);

        // Draw the frame image onto the canvas
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);
      };

      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      loadImages();
    }
  };
  useEffect(() => {
    renderPrintImage();
    renderFrameImage();
  }, [
    loading,
    selectedFrames,
    mockDemo,
    image,
    print,
    croppedImg,
    printCanvasRef,
    frameCanvasRef,
    nav,
  ]);

  let frameImages = frameImg?.frames?.assets?.data?.map((item) => {
    return item?.meta?.images?.[0]?.public_url;
  });

  return (
    <>
      <section className="lg:max-h-[500px] md:max-h-[900px] max-h-[600px] w-[300px] md:w-[500px] lg:w-full sm:max-w-[50rem] md:max-w-[70rem] lg:max-w-[120rem]  overflow-auto">
        {!loading && (
          <div className={`lg:flex justify-between ${styles.container}`}>
            <div
              className={`lg:flex-col flex-row lg:w-[30%] w-full  ${styles.left}`}
            >
              <div
                className={`border border-[#2F4858] mb-7  ${styles.imgContainer} `}
                onClick={() => {
                  setPreviewFrame(null);
                  setmockDemo(false);
                }}
              >
                <img
                  src={image}
                  alt="frame image"
                  className="lg:w-[90px] md:w-[90px] h-[90px] mx-auto lg:pt-4 lg:py:0 lg:px-0 px-2 py-4"
                />
              </div>

              {mockup.results?.map((item, index) => {
                return (
                  <div
                    className={`border border-[#2F4858] mb-7  ${styles.imgContainer} `}
                    key={index}
                    onClick={() => {
                      setPreviewFrame(null);
                      selectMockUp(item);
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt="frame image"
                      className="lg:w-[90px] md:w-[10px]] h-[90px] mx-auto lg:pt-4 lg:py:0 lg:px-0 px-2 py-4 object-contain "
                    />
                  </div>
                );
              })}

              {/* {nav !== 3 &&frameImages?.map((item, index) => {
								return (
									<div
										className={`border border-[#2F4858] mb-7 ${styles.imgContainer} `}
										key={index}
										onClick={() => setPreviewFrame(item)}
									>
										<img
											src={item}
											alt="frame image"
											className=" mx-auto pt-2 "
										/>
									</div>
								);
							})} */}
            </div>

            {(nav === 2 || nav === 1) && (
              <div className={`${styles.center}`}>
                {!previewFrame && (
                  <div>
                    {!mockDemo && nav === 1 && (
                      <canvas
                        ref={printCanvasRef}
                        className="   shadow-lg shadow-black"
                      />
                    )}

                    {!mockDemo && nav === 2 && (
                      <>
                        <div className={`${styles.frameContainer} shadow-lg`}>
                          <div className={`${styles.frame}`}>
                            <img
                              src={image}
                              alt="Normal Image"
                              className={`${styles.normalImage}`}
                            />
                            <div
                              style={{
                                backgroundImage: `url(${selectedFrames})`,
                              }}
                              className={`${styles.frameImage}`}
                            ></div>
                          </div>
                        </div>

                        {/* <canvas
                          ref={frameCanvasRef}
                          className="w-[300px] h-[300px]  shadow-lg shadow-black"
                        /> */}
                      </>
                    )}

                    {mockDemo && (
                      <div
                        className={styles.mockup}
                        style={{
                          backgroundImage: `url(${mockDemo})`,
                        }}
                      >
                        <div
                          className={styles.framePic}
                          style={{
                            backgroundImage: `url(${selectedFrames})`,
                          }}
                        >
                          <img src={image} className="object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {nav === 3 && (
              <div className={`${styles.center}  ${!mockDemo && "w-[10px]"}`}>
                {!previewFrame && (
                  <>
                    {!mockDemo && (
                      <div className={`${styles.canvasContainer}  `}>
                        <Canvas className=" w-full">
                          <ambientLight intensity={1.9} color="black" />
                          <spotLight
                            position={[500, 100, 10]}
                            angle={Math.PI * (50 / 100)}
                            penumbra={1}
                          />

                          <Suspense fallback={null}>
                            <Box />
                          </Suspense>
                        </Canvas>
                      </div>
                    )}

                    {mockDemo && (
                      <div
                        className={styles.mockup}
                        style={{
                          backgroundImage: `url(${mockDemo})`,
                        }}
                      >
                        <div
                          className={styles.framePic}
                          style={{
                            backgroundImage: `url(${selectedFrames})`,
                          }}
                        >
                          <img src={image} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* {nav === 3 && (

				
              <div className={`${styles.canvas} `}>
                <div
                  id="canvas-container"
                  className={`${styles.canvasContainer} `}
                >
                  <Canvas>
                    <ambientLight intensity={1.9} color="black" />
                    <spotLight
                      position={[500, 100, 10]}
                      angle={Math.PI * (50 / 100)}
                      penumbra={1}
                    />

                    <Suspense fallback={null}>
                      <Box />
                    </Suspense>
                  </Canvas>
                </div>
              </div>
            )} */}

            <div className={`${styles.right} lg:w-[90rem]`}>
              {!uploadImg && (
                <h3 className="mb-10 lg:mt-0 mt-10 lg:text-right text-[2.3rem] w-full	">
                  {print && print.title}
                  <span className="text-[var(--primaryColor)] ml-5 font-extrabold">
                    ₦{print && print.meta?.pricing?.[0].price}
                  </span>
                </h3>
              )}
              <div className="flex justify-between text-[12px] items-center lg:mt-0 mt-20">
                <h5
                  className={nav == 1 ? styles.navActive : styles.notActive}
                  onClick={() => setNav(1)}
                >
                  SHOP PRINT
                </h5>
                <h5
                  className={nav == 2 ? styles.navActive : styles.notActive}
                  onClick={() => setNav(2)}
                >
                  SHOP FRAMES
                </h5>
                <h5
                  className={nav == 3 ? styles.navActive : styles.notActive}
                  onClick={() => setNav(3)}
                >
                  SHOP CANVAS
                </h5>
              </div>
              {nav == 1 && (
                <ShopPrint
                  croppedImg={croppedImg}
                  frameSize={frameSize?.sizes}
                  print={print}
                  appendFrame={selectFrame}
                  uploadImg={uploadImg}
                />
              )}
              {nav == 2 && (
                <ShopFrame
                  frames={frameImg}
                  croppedImg={croppedImg}
                  frameSize={frameSize?.sizes}
                  print={print}
                  appendFrame={selectFrame}
                  uploadImg={uploadImg}
                />
              )}
              {nav == 3 && (
                <ShopCanvas
                  croppedImg={croppedImg}
                  frameSize={frameSize?.sizes}
                  print={print}
                  appendFrame={selectFrame}
                  uploadImg={uploadImg}
                />
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className={`${styles.loader} lg:py-40 lg:px-40`}>
            <div className={`${styles.inner} flex content-center flex-col`}>
              <h4 className="mb-10">Processing</h4>
              <div className="flex content-center flex-col items-center">
                <ClipLoader size={60} />
              </div>
            </div>
          </div>
        )}

        {loading ||
          (mockup.status == "loading" && (
            <div className={`${styles.loader} lg:py-40 lg:px-40`}>
              <div className={`${styles.inner} flex content-center flex-col`}>
                <h4 className="mb-10">Processing</h4>
                <div className="flex content-center flex-col items-center">
                  <ClipLoader size={50} />
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
