import { useQuery } from "@tanstack/react-query";
import Alert from "../components/Alert";
import { getAllBrands } from "../utils/methods/categories";

const BrandsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
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
            data.data.map((brand) => (
              <div key={brand._id} className="w-1/2 md:w-1/4 lg:w-1/5 px-2">
                <img src={brand.image} alt={brand.name} className="w-full" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsPage;
// Copyright (c) 2025 Mohammed Ayman
// All rights reserved.
