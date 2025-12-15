import CartItem from "./CartItem";

const CardTable = ({ products }) => {
  return (
    <div className="overflow-x-auto bg-footerColor">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Item Price</th>
            <th>Count Of Items</th>
            <th>Total Price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.map((product) => (
            <CartItem product={product} key={product._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
