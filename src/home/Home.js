
import Top from "./top/Top";
import BestSeller from "./best-seller/BestSeller";
import FV from "./fruits&vegetables/FV";
import Dairy from "./dairy/Dairy";
import Other from "./other/Other";
import Subcategory from "./other-subcategory/Subcategory";
// import Footer from "./footer/Footer";
const Home = () => {
    return (
        <>
            <Top />
            {/* <ProductList/> */}
            <BestSeller />
            <FV />
            <Dairy />
            <Other />
            <Subcategory />
            {/* <Footer/> */}
        </>
    )
}

export default Home;