import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Overlay from "react-bootstrap/Overlay";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import { ReactComponent as CartIcon } from "../../assets/images/cart.svg";
import colors from "../../assets/colors.scss";
import { CartDetails } from "./CartDetails";

import "./Cart.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useOnClickOutside } from "../../hooks/useOutsideClick";

export const Cart = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const { cart } = useSelector((store) => store);

  const ref = useRef(null);
  const mobileCartRef = useRef(null);

  const cartTotal = cart.reduce((sum, { qty }) => sum + qty, 0);

  const handleClick = (event) => {
    if (!cartTotal) return;
    setShow(!show);
    setTarget(event.target);
  };

  const onHide = () => {
    setShow(false);
    setTarget(null);
  };

  const { tab } = useWindowSize();
  useOnClickOutside(mobileCartRef, onHide);

  return (
    <div className="cart">
      <Button
        ref={ref}
        className="cart-button d-flex align-items-center"
        variant="light"
        onClick={handleClick}
      >
        <CartIcon
          fill={colors.themeColor}
          className="mx-1 cart-icon"
          alt="cart-icon"
        />
        {cartTotal} {cartTotal >= 1 ? "Items" : "Item"}
      </Button>

      {tab ? (
        show && (
          <div className="mobile" ref={mobileCartRef}>
            <CartDetails />
          </div>
        )
      ) : (
        <Overlay
          show={show}
          target={target}
          placement="bottom-end"
          container={ref}
          containerPadding={0}
          rootClose={true}
          onHide={onHide}
          className="cart-popover"
        >
          <Popover id="popover-contained" className="cart-modal">
            <CartDetails onClose={onHide} />
          </Popover>
        </Overlay>
      )}
    </div>
  );
};
