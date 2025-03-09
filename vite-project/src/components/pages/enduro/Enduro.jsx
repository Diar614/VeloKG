import HeaderSection from "./HeaderSection";
import DescriptionSection from "./DescriptionSection";
import BikeCategories from "./BikeCategories";
import EnduroSwiper from "./EnduroSwiper";
import { slides } from "./data"; 

const Enduro = () => {
  return (
    <div>
      <HeaderSection />
      <DescriptionSection />
      <BikeCategories />
      <EnduroSwiper slides={slides} />
    </div>
  );
};

export default Enduro;
