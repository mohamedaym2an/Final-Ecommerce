import { useState } from "react";

const ProductDetailsImages = ({ mainImage, images }) => {
  const [src, setSrc] = useState(mainImage);

  return (
    <div className="relative w-full h-full">
      <img src={src} alt="Main product Image" />

      {images.length > 0 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-2/4 w-[98%] h-fit overflow-hidden py-4 flex items-center justify-center gap-2 z-10">
          {images.map((img, i) => (
            <span
              key={img}
              className={`w-1/${
                images.length + 1
              } inline-block max-w-16 shadow bg-white p-1 rounded-lg cursor-pointer transition-all duration-200 hover:p-1.5`}
              onClick={() => setSrc(img)}
            >
              <img
                className="w-full rounded"
                src={img}
                alt={`Product Image Slider ${i + 1}`}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailsImages;
