import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import CloseButton from "react-bootstrap/CloseButton";
import Popover from "react-bootstrap/Popover";
import Image from "react-bootstrap/Image";

import "./CartDetails.scss";
import {
  AddToCart,
  decrementItemFromCart,
  deleteFromCart,
} from "../../../redux/actions/actions";
import { images } from "../../../assets/images";

export const CartDetails = ({ onClose }) => {
  const { cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const cartTotalQty = cart.reduce((sum, { qty }) => sum + qty, 0);

  const incrementQuantity = (id) => {
    dispatch(
      AddToCart({
        id,
      })
    );
  };

  const decrementQuantity = (id) => {
    dispatch(decrementItemFromCart(id));
  };

  const deleteItem = (id) => {
    dispatch(deleteFromCart(id));
  };

  const totalPrice = cart.reduce((sum, { price, qty }) => sum + price * qty, 0);

  return (
    <>
      <Popover.Header
        as="h3"
        className="my-cart-header d-flex justify-content-between align-items-center"
      >
        <div>
          My Cart
          {cartTotalQty > 0 && <span> ({cartTotalQty} Item)</span>}
        </div>

        <CloseButton variant="white" className="cart-close" onClick={onClose} />
      </Popover.Header>
      <Popover.Body className="cart-details-body">
        {cartTotalQty ? (
          <div>
            {cart.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem.id}
                  {...cartItem}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                  deleteItem={deleteItem}
                />
              );
            })}

            <div className="p-3 mx-1 lowest-price">
              <Image src={images.lowestPrice} className="h-20" />
              You won't find it cheaper anywhere
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <h4>No items in your cart</h4>

            <h6>Your favourite items are just a click away</h6>
          </div>
        )}
        <div className="cart-modal-footer p-2">
          {cartTotalQty > 0 && "Promo code can be applied on payment page"}

          <Button
            className={`btn-primary justify-content-between w-100 mt-2 ${
              cartTotalQty && "d-flex"
            }`}
            onClick={onClose}
          >
            {cartTotalQty ? (
              <>
                Proceed to Checkout
                <span>Rs.{totalPrice} &gt;</span>
              </>
            ) : (
              "Start Shopping"
            )}
          </Button>
        </div>
      </Popover.Body>
    </>
  );
};

const CartItem = ({
  id,
  imageURL,
  name,
  price,
  qty,
  decrementQuantity,
  incrementQuantity,
  deleteItem,
}) => {
  return (
    <div className="d-flex cart-item mb-2" key={id}>
      <Image thumbnail={true} src={imageURL} className="cart-item-img mx-2" />
      <div className="w-100">
        <h6>{name}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Button
              className="btn-primary btn-circle"
              disabled={qty === 1}
              onClick={() => decrementQuantity(id)}
            >
              -
            </Button>
            <span className="mx-2">{qty}</span>

            <Button
              className="btn-primary  btn-circle"
              onClick={() => incrementQuantity(id)}
            >
              +
            </Button>

            <CloseButton
              className="close mx-2"
              onClick={() => deleteItem(id)}
            />

            <span className="price">Rs.{price}</span>
          </div>
          <div className="price">Rs.{qty * price}</div>
        </div>
      </div>
    </div>
  );
};
