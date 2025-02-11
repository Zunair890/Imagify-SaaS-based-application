import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

function Result() {
  const [image, setImage] = useState(assets.new_image); // Default image
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track if image is loaded
  const [loading, setLoading] = useState(false); // Track loading state
  const [input, setInput] = useState(""); // User input

  const { generateImage } = useContext(AppContext);

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setIsImageLoaded(false); // Reset image loaded state
    if (input) {
      const generatedImage = await generateImage(input); // Generate image
      if (generatedImage) {
        setImage(generatedImage); // Set the generated image
        setIsImageLoaded(true); // Mark image as loaded
      }
    }
    setLoading(false); // Stop loading
  };

  // Handle image download
  const handleImageDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated_image.png"; // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          {/* Display the image */}
          <img src={image} className="max-w-sm rounded h-600 w-700" alt="" />
          {/* Loading progress bar */}
          <span
            className={`absolute bottom-0 top-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>

        {/* Show "Loading....." only when generating */}
        {loading && <p className="text-center mt-2">Loading.....</p>}
      </div>

      {/* Input form for generating images */}
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent text-md outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full">
            Generate
          </button>
        </div>
      )}

      {/* Buttons after image is generated */}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => setIsImageLoaded(false)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <p
            onClick={handleImageDownload}
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </p>
        </div>
      )}
    </motion.form>
  );
}

export default Result;