import { FaStar } from "react-icons/fa6";

const ProductAction = ({ price, rate }) => {
  return (
    <div className="mt-1 w-full">
      <div className="flex items-center justify-between gap-2">
        <span>{price} EGP</span>
        <span className="flex items-center justify-center gap-1">
          <FaStar className="text-[#ffa534]" /> {rate}
        </span>
      </div>
    </div>
  );
};

export default ProductAction;
