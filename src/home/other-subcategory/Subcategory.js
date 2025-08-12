
import classes from './Subcategory.module.css';
import { get_Subcategory } from '../../store/product-action';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
const Subcategory = () => {
    const sub_categories = useSelector(state => state?.sub_category?.sub_categories);
    // console.log(sub_categories);
    
    return (
        <>
            <Container>
                <Row>
                    {
                        sub_categories.map(data => (
                            data.sub_category.map(category => (
                                category.product.map(product => (
                                    <p>{product.name}</p>
                                ))
                            ))
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Subcategory;