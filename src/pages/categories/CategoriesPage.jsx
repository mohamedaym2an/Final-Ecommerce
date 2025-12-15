import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../utils/methods/categories";
import Alert from "../../components/Alert";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-center flex-wrap gap-y-4">
          {isLoading && (
            <span className="loading loading-spinner loading-md"></span>
          )}

          {!isLoading && isError && <Alert type={"warning"} />}

          {!isLoading &&
            !isError &&
            data.data.map((cat) => (
              <Link
                to={`/categories/${cat._id}`}
                key={cat._id}
                className="w-full md:w-1/3 lg:w-1/4 px-2"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-48" />
                <h3 className="text-xl font-semibold text-center">
                  {cat.name}
                </h3>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;
