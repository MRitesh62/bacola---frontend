import { useDispatch, useSelector } from "react-redux";
import { addToCart ,addWishlist} from "./store/product-action";

export const useAddToCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);

    const addFun = (productId, quantity = 1) => {
        dispatch(addToCart({ productId, quantity }));
    };

    return { addFun, cart };
};

export const useAddTolist = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list.list);

    const addFun = (productId) => {
        dispatch(addWishlist({ productId }));
    };

    return { addFun, list };
};