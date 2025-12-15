import CategoriesContainer from "../components/Home/categories/CategoriesContainer";
import MainSlider from "../components/Home/MainSlider";
import ProductContainer from "../components/Product/ProductContainer";

const HomePage = () => {
  return (
    <>
      <MainSlider />
      <CategoriesContainer />
      <section className="pt-10 pb-20">
        <div className="container">
          <ProductContainer />
        </div>
      </section>
    </>
  );
};

export default HomePage;
