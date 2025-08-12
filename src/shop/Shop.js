import { useSearchParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineMenu } from "react-icons/ai";
import { IoGrid } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

import classes from './Shop.module.css';
import { getProducts } from '../store/product-action';
import banner from './banner.webp';
import Card from '../global/card/Card';
import gif from './top2.gif'
import axios from 'axios';
const Shop = () => {
    const [lg, setLg] = useState(3);
    const [sort, setSort] = useState("new");
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [category, setCategory] = useState([]);

    const dispatch = useDispatch();

    const productData = useSelector(state => state?.product?.products);
    const product = productData?.products?.data || [];
    const totalProduct = productData?.products?.totalProducts || 0;
    // console.log(productData.products.totalProducts);
    

    const totalPages = Math.ceil(totalProduct / limit);

    useEffect(() => {
        const fetchLimit = searchQuery ? 0 : limit; 
        dispatch(getProducts({ sort, page, limit: fetchLimit, searchQuery ,categories: selectedCategories,}));
    }, [dispatch, sort, page, limit, searchQuery,selectedCategories]);

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    useEffect(() => {
        const icons = document.querySelectorAll(`.${classes.left} svg`);
        if (icons.length > 0) {
            icons.forEach(i => i.classList.remove(classes.active));
            icons[icons.length - 1].classList.add(classes.active);

            icons.forEach(icon => {
                icon.addEventListener('click', function () {
                    icons.forEach(i => i.classList.remove(classes.active));
                    this.classList.add(classes.active);
                });
            });
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8001/api/get-categories')
            .then((response) => {
                // console.log(response.data.data);
                setCategory(response.data?.data)
            
        })
    },[])

    const filteredProducts = product.filter(prod =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className={classes.container}>
            <Row>
                <Col lg={3} >
                <div>
                        <h6>Category</h6>
                        {/* {console.log(category)} */}
                        
                        {category.map(cat => (
  <label key={cat._id} className='d-block'>
    <input
      type="checkbox"
      value={cat._id}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedCategories(prev => [...prev, e.target.value]);
        } else {
          setSelectedCategories(prev => prev.filter(id => id !== e.target.value));
        }
                                    }}
             className='my-2'                       
    /> &nbsp;&nbsp;
    {cat.category_name}
  </label>
))}

  </div>
                <img src={gif} alt='banner' className='w-100 d-none d-lg-block' />
                </Col>
                <Col lg={9} className='p-0'>
                    {/* Banner */}
                    <div className={classes.banner} style={{ position: 'relative' }}>
                        <img src={banner} alt='banner' className='w-100' />
                        <div className={classes.banner_content}>
                            <h4>Organic Meals Prepared</h4>
                            <h3>Delivered to <span>your Home</span></h3>
                            <p>Fully prepared & delivered nationwide.</p>
                        </div>
                    </div>

                    {/* Options */}
                    <div className={classes.option}>
                        <div className={classes.left}>
                            <AiOutlineMenu className={classes.icon} onClick={() => setLg(12)} />
                            <IoGrid className={classes.icon} onClick={() => setLg(6)} />
                            <CgMenuGridO className={classes.icon} onClick={() => setLg(4)} />
                            <TfiLayoutGrid4Alt className={classes.icon} onClick={() => setLg(3)} />
                        </div>

                        <div className={classes.right}>
                            <form>
                                <select value={sort} onChange={handleSortChange}>
                                    <option value="new">Sort by latest</option>
                                    <option value="l2h">Sort by price: low to high</option>
                                    <option value="h2l">Sort by price: high to low</option>
                                </select>

                                <label className='border-start ps-4'>Show</label>
                                <select value={limit} onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setPage(1);
                                }}>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    {/* Product Cards */}
                    <Card map={filteredProducts} lg={lg} />

                    {/* Pagination */}
                    <div className={classes.pagination}>
                        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={page === i + 1 ? classes.active : ""}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
