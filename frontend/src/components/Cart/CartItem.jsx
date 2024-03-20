import { Button, Card, Typography, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addToCart, deleteItemsFromCart } from '../../actions/cartAction';
import { getDeliveyDate, getDiscount } from '../../utils/functions';
import { Link } from 'react-router-dom';

const CartItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity, inCart }) => {

    const dispatch = useDispatch();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity >= stock) {
            alert("Maximum Order Quantity");
            return;
        };
        dispatch(addToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) return;
        dispatch(addToCart(id, newQty));
    }
    
    const removeCartItem = (id) => {
        dispatch(deleteItemsFromCart(id));
        alert("Product Removed From Cart");
    }

    return (
        <Card  style={{ margin: '10px 0', padding: '10px', border: '2px ', borderRadius: '10px', background: 'linear-gradient(to right, white , white)' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <img src={image} alt={name} style={{ width: '70%', height: '70%' }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Link to={`/product/${product}`}>
                        <Typography variant="h7">{name}</Typography>
                        <Typography variant="body1">${(price * quantity).toLocaleString()}</Typography>
                        <Typography variant="body2" color="textSecondary" style={{ textDecoration: 'line-through' }}>${(cuttedPrice * quantity).toLocaleString()}</Typography>
                        <Typography variant="body2" color="primary">{getDiscount(price, cuttedPrice)}% off</Typography>
                    </Link>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Button variant="contained" color="grey" onClick={() => decreaseQuantity(product, quantity)}>-</Button>
                            <input type="text" value={quantity} disabled style={{ width: '30px', textAlign: 'center' }} />
                            <Button variant="contained" color="white" onClick={() => increaseQuantity(product, quantity, stock)}>+</Button>
                        </div>
                        {inCart && (
                            <Button variant="contained" style={{ backgroundColor: '#ff4081', color: '#fff' }} onClick={() => removeCartItem(product)}>Delete</Button>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CartItem;
