import { useParams, Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineMenu } from "react-icons/ai";
import { IoGrid } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

import classes from './CatProduct.module.css';
import { get_category } from '../../store/product-action';
import banner from './banner.webp';
import Card from '../card/Card';
import gif from './top2.gif'

const CatProduct = () => {
    const [lg, setLg] = useState(3);
    const [sort, setSort] = useState("new");

    const { id } = useParams();
    const dispatch = useDispatch()

    const product = useSelector(state => state?.category?.category?.product)
    // console.log(product);


    useEffect(() => {
        dispatch(get_category(id,sort))
    }, [dispatch, id,sort])
    const handleSortChange = (e) => {
        setSort(e.target.value);
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
    return (
        <>
            <Container className={classes.container}>
                <Row>
                <Col lg={3} >
                <img src={gif} alt='banner' className='w-100 d-none d-lg-block' />
                </Col>

                    <Col lg={9} className='p-0'>
                        <div className={classes.banner} style={{ position: 'relative' }}>
                            <img src={banner} alt='banner' className='w-100' />
                            <div className={classes.banner_content}>
                                <h4>Organic Meals Prepared</h4>
                                <h3>Delivered to <span>your Home</span></h3>
                                <p>Fully prepared & delivered nationwide.</p>
                            </div>
                        </div>

                        <div className={classes.option}>
                            <div className={classes.left}>
                                <AiOutlineMenu className={classes.icon} onClick={()=>setLg(12)}/>
                                <IoGrid className={classes.icon} onClick={()=>setLg(6)}/>
                                <CgMenuGridO className={classes.icon} onClick={()=>setLg(4)}/>
                                <TfiLayoutGrid4Alt className={classes.icon} onClick={()=>setLg(3)}/>
                            </div>
                            <div className={classes.right}>
                                <form>
                                    <select value={sort} onChange={handleSortChange}>
                                        <option value="new">Sort by latest</option>
                                        <option value="l2h">Sort by price: low to high</option>
                                        <option value="h2l">Sort by price: high to low</option>
                                    </select>

                                    <label className='border-start ps-4'>show</label>
                                    <select >
                                        <option value="">1</option>
                                        <option value="">3</option>
                                        <option value="">5</option>
                                    </select>
                                </form>
                            </div>
                        </div>

                        <div className={classes.product}>
                            <Card map={product} lg={lg}/>
                        </div>
                    </Col>
                </Row>


            </Container>
        </>
    )
}
export default CatProduct;