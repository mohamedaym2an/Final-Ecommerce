import Slider from "react-slick";
import CategoryCard from "./CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../utils/methods/categories";
import ImageSkelaton from "../../Skelatons/ImageSkelaton";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  className: "category-slider-class",
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 600, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};

const CategoriesContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Ensure we have an array to map over
 const categories = Array.isArray(data?.data) ? data.data : [];
categories.map(cat => <CategoryCard key={cat._id} item={cat} />);


  return (
    <section className="py-10 md:py-20">
      <div className="container">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-medium capitalize mb-8 text-center">
  Shop Popular Categories
</h2>


        {isLoading && <ImageSkelaton />}
        {!isLoading && isError && (
          <div className="text-red-500">Failed to load categories.</div>
        )}

        {!isLoading && !isError && categories.length > 0 && (
          <Slider {...settings}>
            {categories.map((cat) => (
              <CategoryCard key={cat._id} item={cat} />
            ))}
          </Slider>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <div>No categories found.</div>
        )}
      </div>
    </section>
  );
};

export default CategoriesContainer;
