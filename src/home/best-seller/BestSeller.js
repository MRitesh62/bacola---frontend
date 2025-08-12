import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../store/product-action";
import Slider from "react-slick";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import classes from './Bestseller.module.css';
import { useAddToCart, useAddTolist } from '../../addFun';
import { toast } from "react-toastify";
const BestSeller = () => {
  const dispatch = useDispatch()
  const [addedItems, setAddedItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/get-products`)
      .then(response => (
        setProducts(response.data)
      ))
  }, [])
  // console.log(products);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const user = sessionStorage.getItem('user');
  const { addFun: addToCart } = useAddToCart();
  const { addFun: addWishlist } = useAddTolist();
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("addedItems")) || [];
    setAddedItems(stored);
}, []);

// Save to sessionStorage whenever addedItems changes
useEffect(() => {
    sessionStorage.setItem("addedItems", JSON.stringify(addedItems));
}, [addedItems]);
  const clickhandle = (productId) => {
    if (user) {
      addToCart(productId);
      toast.success("Product added to cart!");
      setAddedItems(prev => [...prev, productId]);

    }
    else {
      navigate('/login')
    }
  }
  const listClickHandle = (productId) => {
    if (user) {
      addWishlist(productId);
      toast.success("Product added to wishlist!");

    }
    else {
      navigate('/login')
    }
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: 'black', fontSize: '25px', backgroundColor: '#ddd', width: '45px', height: '35px', borderRadius: '25px', padding: "2px 6px", textAlign: 'center' }}
        onClick={onClick}
      ><IoIosArrowForward /></div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: 'black', fontSize: '25px', backgroundColor: '#ddd', width: '45px', height: '35px', borderRadius: '25px', padding: "2px 6px", textAlign: 'center' }}
        onClick={onClick}
      ><IoIosArrowBack className={classes.prev} /></div>
    );
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,

        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,

        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,

        },
      },
    ],
  };
  return (
    <section>
      <Container className={classes.container}>
        <div className={classes.head}>
          <div>
            <h4>Best seller</h4>
            <p>Do not miss the current offers until the end of March.</p>
          </div>
          <button onClick={() => navigate('/shop')}>
            view all {<IoIosArrowRoundForward />}
          </button>
        </div>
        <div style={{ border: '1px solid #d9d9df' }}>
          <Slider {...settings}>
            {
              products?.data?.map((product) => (
                <div className={classes.box}>
                  <CiHeart className={classes.heart} onClick={() => listClickHandle(product._id)} />
                  <Link to={`/product/${product._id}`}>
                    <span>{product.discount}%</span>
                    <img src={`${products.filepath}${product.images[0]}`} key={product._id} />
                    <h3 className="text-truncate" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {product.name} </h3>
                    <p>{product.availability} </p>
                    <div className={classes.star}>
                      {[...Array(product.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      {[...Array(5 - product.rating)].map((_, i) => (
                        <FaStar key={`empty-${i}`} color="#C0C0C0" /> // Gray star ⚪
                      ))}

                    </div>
                    <div className="d-flex  gap-1">
                      <del>${(product.price + ((product.price * product.discount) / 100)).toFixed(2)}</del>
                      <h4>${product.price} </h4>
                    </div>
                  </Link>
                  {addedItems.includes(product._id) ? (
                    <Link to="/cart" className="btn btn-success">Go to Cart</Link>
                  ) : (
                    <button onClick={() => clickhandle(product._id)}>Add to Cart</button>
                  )}                            </div>

              ))
            }
          </Slider>
        </div>
      </Container>
    </section>
  )
}

export default BestSeller;