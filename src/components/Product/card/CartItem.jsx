import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { currencyEgpFormat } from "../../../utils/methods/currencyFormat";
import useUpdateProductCount from "../../../hooks/useIncrementByOne";

const CartItem = ({ product }) => {
  const { operationLoading, updateProductCount, removeLoading, removeProduct } =
    useUpdateProductCount();

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={product.product.imageCover}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold !line-clamp-2">{product.product.title}</h3>
          </div>
        </div>
      </td>
      <td>{product.product.category.name}</td>
      <td>{currencyEgpFormat(product.price)}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            disabled={operationLoading || product.count <= 1}
            className="text-3xl opacity-50 cursor-pointer outline-none bg-transparent disabled:opacity-25 disabled:cursor-no-drop"
            onClick={() =>
              updateProductCount(
                product.product._id,
                product.count,
                product.count - 1
              )
            }
          >
            <CiCircleMinus />
          </button>
          <span className="inline-block w-4 text-center">{product.count}</span>
          <button
            disabled={operationLoading}
            className="text-3xl opacity-50 cursor-pointer outline-none bg-transparent disabled:opacity-25 disabled:cursor-no-drop"
            onClick={() =>
              updateProductCount(
                product.product._id,
                product.count,
                product.count + 1
              )
            }
          >
            <CiCirclePlus />
          </button>
        </div>
      </td>
      <td>{currencyEgpFormat(product.count * product.price)}</td>
      <th>
        <button
          disabled={removeLoading}
          onClick={() => {
            removeProduct(product);
          }}
          className="btn btn-ghost btn-xs text-rose-600 font-semibold capitalize hover:bg-rose-200"
        >
          remove
        </button>
      </th>
    </tr>
  );
};

export default CartItem;
