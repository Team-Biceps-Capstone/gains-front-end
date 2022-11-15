import { useEffect, useRef } from "react";

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dknbyexun",
        uploadPreset: "gainsproject",
        folder: "challenges",
        maxFiles: 1,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          props.setImage(
            result.info.secure_url,
            result.info.thumbnail_url,
            result.info.public_id
          );
        }
      }
    );
  }, [props]);

  return (
    <button
      className="general-button"
      type="button"
      onClick={() => widgetRef.current.open()}
    >
      Upload Photo
    </button>
  );
};

export default UploadWidget;
