import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getProducts,get_Subcategory} from "../../store/product-action";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import banner from './category-banner-2.webp';
import classes from './Dairy.module.css';
import Card from "../../global/card/Card";
const Dairy = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState([]);
  
  const dispatch = useDispatch()

  const sub_categories = useSelector(state => state?.sub_category?.sub_categories);
  // console.log(sub_categories);
  useEffect(() => {
    if (Array.isArray(sub_categories)) {
      const matchedCategory = sub_categories.find(
        (data) => data.category_name === "breakfast & dairy"
        
      );
      // console.log(matchedCategory);
      
      if (matchedCategory) setProducts(matchedCategory.product);
    }
  }, [sub_categories]);

  useEffect(() => {
    sub_categories.map(data=>(data.category_name === 'breakfast & dairy' ? setId(data._id):''))
     
  }, [])


  useEffect(() => {
    dispatch(getProducts());
    dispatch(get_Subcategory())
  }, [dispatch])

  const navigate = useNavigate();
  return (
    <section>
      <Container className={classes.container}>
        <div className={classes.head}>
          <div>
            <h4>Breakfast & Dairy</h4>
            <p>The freshest greengrocer products are waiting for you.</p>
          </div>
          <button onClick={() => {navigate(`/products/category/${id}`)}}>
            view all {<IoIosArrowRoundForward />}
          </button>
        </div>
        <Row style={{ border: '1px solid #d9d9df',position:'relative', borderRadius:"0.65rem"}}>
          <Col lg={4} className="p-0">
            <div >
              <img src={banner} alt="img" className="w-100" />
              <div className={classes.content2}>
                <div className={classes.header2}>
                  <h4>Weekly Discounts on</h4>
                  <h3> Breakfast and Dairy</h3>
                  <p>Bacola Weekend Discount</p>
                </div>
                <button  onClick={() => {navigate(`/products/category/${id}`)}}>View All</button>
              </div>
            </div>
            <ul className={classes.sub_category}>
            {
                
                sub_categories.map(data => (
                  data.category_name === 'breakfast & dairy' ? data?.sub_category?.map(catagory => (
                    <li key={catagory._id}>{catagory.category_name}</li>
                  )):''
                ))
            }
            </ul>
            <button className={classes.shop}  onClick={() => {navigate(`/products/category/${id}`)}}>shop all Breakfast & Dairy <FaArrowRightLong/></button>
          </Col>
            <Col lg={8} className={classes.product}>
            <Card map={products} hover={classes.hover} lg={3}/>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Dairy;