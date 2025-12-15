import { getSubCategories } from "../../utils/methods/categories";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SubCategoriesPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const res = await getSubCategories(id);
          setData(res.data);
          setIsLoading(false);
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Faild Get Data!!!"
          );
          navigate("/categories", { replace: true });
        }
      };

      getData();
    }
  }, [id, navigate]);

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-center flex-wrap gap-y-4">
          {isLoading && (
            <span className="loading loading-spinner loading-md"></span>
          )}

          {!isLoading && (
            <Fragment>
              {data.length < 1 && (
                <Alert
                  type={"warning"}
                  text="Not Found sucCategories for this Category!!!"
                />
              )}
              <div className="flex flex-wrap justify-center gap-y-4">
                {data.map((cat) => (
                  <div key={cat._id} className="w-full md:w-1/3 lg:w-1/4 px-3">
                    <div className="border border-gray-200 rounded-md px-3 py-5">
                      <h3 className="text-base font-semibold text-center">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubCategoriesPage;
