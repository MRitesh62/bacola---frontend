import { Col, Container, Row } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

import classes from "./Header.module.css";
import { get_Subcategory,getProducts } from "../../store/product-action";
import logo from "./bacola-logo.webp"
import mob_logo from "./bacola-logo-mobile.webp";
import { userLogin } from "../../store/product-action";
import { cartAction } from "../../store/cartSlice";
import { logout } from "../../store/authSlice";
import { listAction } from "../../store/wishlistSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [hoveredCategory, setHoveredCategory] = useState(null);

    const sub_categories = useSelector(state => state?.sub_category?.sub_categories);
    const user = useSelector(state => state?.auth?.user);
    const cartIem = useSelector(state => state?.cart?.cart?.data || {products:[]})
    // console.log(cartIem);
    
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const products = useSelector(state => state?.product?.products?.products?.data || []);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8001/api/get-products`)
            .then(response => (
            setProducts(response.data.data)
        ))
    },[])
// console.log(products);

    useEffect(() => {
        dispatch(getProducts("new")); // Fetch products when component mounts
    }, [dispatch]);

  const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        if (query.trim() !== "") {
            // Filter products based on search query
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    };

    const handleSelectProduct = (id) => {
        navigate(`/product/${id}`);
        setSearch(""); // Clear search input
        setFilteredProducts([]); // Hide suggestions
    };

    const id = sessionStorage.getItem('user');
    // console.log('id',id);
    // console.log(user);

    const handleLogin = () => {
        if (!user) {
            navigate("/login"); // Redirect to login page if user is not logged in
        }
    };
    useEffect(() => {
        const savedCart = sessionStorage.getItem("cart");
        if (savedCart) {
            dispatch(cartAction(JSON.parse(savedCart))); // Restore cart from sessionStorage
        }
    }, [dispatch]);

    //token
    useEffect(() => {
        dispatch(userLogin(id))
    }, [dispatch,id]);

    //logout
    const handleLogout = () => {
        dispatch(logout()); // Clear user data from Redux store
        dispatch(cartAction({ data: { products: [], totalPrice: 0 } }));
        dispatch(listAction({ data: { products: [] } }))
        sessionStorage.removeItem("token"); // Remove token
        sessionStorage.removeItem("user");  // Remove user data
        sessionStorage.removeItem("cart");  // Remove user data
        sessionStorage.removeItem("wishlist")
        setTimeout(() => {
            navigate("/home"); // Redirect after state updates
        }, 100);
    };

    //subcategory
    useEffect(() => {
        dispatch(get_Subcategory())
    }, [dispatch])

    //cart
    const cartHandle = () => {
        if (!user) {
            navigate('/login')
        }
        else {
            navigate('/cart')
        }
    }
    return (
        <div style={{ border: '1px solid #00000029', margin: '10px 0', padding: '15px 0' }}>
            <Navbar expand="lg" >

                <Container className={classes.container}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{boxShadow:'none'}} />
                    <Row className="w-100">
                        <Col className={classes.main} lg={12}>
                            <div className={`${classes.logo} `}>
                                <NavLink to="/home">
                                    <div className="d-none d-lg-block">
                                        <img src={logo} alt="logo" />
                                        <p>Online Grocery Shopping Center </p>
                                    </div>
                                    <img src={mob_logo} alt="logo" className={`${classes.mob_logo} d-block d-lg-none`} />
                                </NavLink>
                            </div>
                            <div className={`${classes.search} d-none d-lg-block`}>
                                <input placeholder="Search for products..." onChange={handleSearchChange} />
                                <FiSearch style={{cursor:'pointer'}}/>
                            </div>
                            {filteredProducts.length > 0 && (
                <ul className={classes.suggestionsList}>
                    {filteredProducts.map((product) => (
                        <li key={product._id} onClick={() => handleSelectProduct(product._id)}>
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
                            <div className={classes.acc}>
                                <NavLink to={user ? "/home" : "/login"} onClick={handleLogin}>
                                    {user ? (
                                        <p>Welcome, {user.userName}</p>
                                    ) : (
                                        <AiOutlineUser />
                                    )}
                                    {user && (
                                        <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}>
                                            <IoIosLogOut/>
                                        </button>
                                    )}
                                </NavLink>
                                <p>${cartIem.totalPrice.toFixed(2)}</p>
                                <span onClick={cartHandle}><BsBag /><sup>{cartIem.products.length || 0}</sup></span>
                            </div>
                        </Col>
                        <Col lg={12} sm={12}>

                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className={`me-auto ${classes.nav}`}>
                                    <NavDropdown title={<>
                                        <IoMenu />&nbsp;&nbsp;  all categories&nbsp; &nbsp; <MdKeyboardArrowDown />
                                    </>} id="basic-nav-dropdown">
                                        {
                                            sub_categories.map(data => (
                                                <div
                                                    key={data._id}
                                                    style={{ position: "relative" }} // Needed for absolute positioning of submenu
                                                    onMouseLeave={() => setHoveredCategory(null)} // Hide subcategories when mouse leaves
                                                >
                                                    <NavDropdown.Item
                                                        onClick={() => { navigate(`products/category/${data._id}`) }}>
                                                        {data.category_name}&nbsp;&nbsp;&nbsp;&nbsp;
                                                        {
                                                            data.sub_category.length > 0 ? <IoIosArrowDown onMouseEnter={() => setHoveredCategory(data._id)} /> : ""
                                                        }
                                                    </NavDropdown.Item>
                                                    {/* Subcategories Dropdown */}
                                                    {hoveredCategory === data._id && data.sub_category.length > 0 && (
                                                        <div style={{
                                                            position: "absolute",
                                                            top: "100%",
                                                            left: "0",
                                                            backgroundColor: "white",
                                                            border: "1px solid #ddd",
                                                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                                            zIndex: "1000",
                                                            minWidth: "200px"
                                                        }}>
                                                            {data.sub_category.map(sub => (
                                                                <div
                                                                    key={sub._id}
                                                                    onClick={() => {
                                                                        navigate(`/products/sub-category/${sub._id}`);
                                                                        setHoveredCategory(null);
                                                                    }}
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    {sub.category_name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </NavDropdown>
                                    <div className={classes.tabs}>
                                        <NavLink to="/home">Home</NavLink>
                                        <NavLink to="/shop">Shop</NavLink>
                                        <NavLink to="/wishlist">Wishlist</NavLink>
                                        <NavLink to="/about">About us</NavLink>
                                        <NavLink to="/contact">Contact</NavLink>
                                    </div>


                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                    </Row>
                </Container>
            </Navbar>


        </div>
    )
};

export default Header;