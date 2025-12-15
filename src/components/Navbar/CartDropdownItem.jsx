import { MdDeleteOutline } from "react-icons/md";
import { currencyEgpFormat } from "../../utils/methods/currencyFormat";
import useUpdateProductCount from "../../hooks/useIncrementByOne";

const CartDropdownItem = ({ product }) => {
  const { removeProduct, removeLoading } = useUpdateProductCount();

  return (
    <li className="flex items-center justify-between gap-3 !hover:bg-transparent">
      <div className="flex items-center  gap-2">
        <img
          className="w-10 h-10 rounded-lg"
          src={product.product.imageCover}
          alt="Tite"
        />
        <div className="text-start flex flex-col justify-center gap-1">
          <span className="text-[12px] font-bold block !line-clamp-1">
            {product.product.title}
          </span>
          <span className="text-xs text-gray-600">
            {currencyEgpFormat(product.price)}
          </span>
        </div>
      </div>
      <span
        onClick={() => removeProduct(product)}
        disabled={removeLoading}
        className="text-base p-2 rounded-md bg-rose-100 text-rose-500 hover:bg-rose-200 disabled:bg-rose-200"
      >
        {removeLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <MdDeleteOutline />
        )}
      </span>
    </li>
  );
};

export default CartDropdownItem;
