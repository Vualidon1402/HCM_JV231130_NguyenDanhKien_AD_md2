import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./HomePage.css";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const HomePage = () => {
  // --list--
  const ListProduct = [
    {
      id: 1,
      product_name: "Điện thoại Samsung Galaxy S21",
      price: "20.000.000đ",
      img: "https://hoanghamobile.com/Uploads/2021/01/15/a2.png",
    },
    {
      id: 2,
      product_name: "Điện thoại Iphone14 Promax",
      price: "21.000.000đ",
      img: "https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/10/05004752/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-space-black-220907-geo-768x1075.jpg",
    },

    {
      id: 3,
      product_name: "Điện thoại Samsung Galaxy S20",
      price: "21.000.000đ",
      img: "https://file.hstatic.net/1000238589/file/dien_thoai_samsung_galaxy_s21_fe_5g__6gb_-_128gb__d1b8fd531ef24903a16cbca1bd666b34.jpg",
    },
    {
      id: 4,
      product_name: "Điện thoại Iphone11 Promax",
      price: "21.500.000đ",
      img: "https://tse3.mm.bing.net/th?id=OIP._PyrZLOuBlMUMA4xgL88KwHaIw&pid=Api&P=0&h=180",
    },
    {
      id: 5,
      product_name: "Điện thoại Samsung Galaxy S22",
      price: "22.000.000đ",
      img: "https://tse4.mm.bing.net/th?id=OIP.ohbiNiNDgVPRGr96gs-mnAHaHa&pid=Api&P=0&h=180",
    },
    {
      id: 6,
      product_name: "Điện thoại Samsung Galaxy S23",
      price: "22.500.000đ",
      img: "https://tse3.mm.bing.net/th?id=OIP.ZVeFgZ7oDODoAqjh9Jn2nQHaHa&pid=Api&P=0&h=180",
    },
    {
      id: 7,
      product_name: "Điện thoại Oppo A9",
      price: "23.000.000đ",
      img: "https://tse2.mm.bing.net/th?id=OIP.88LuTw7rEU2JDXWrsIxu_wHaE8&pid=Api&P=0&h=180",
    },
    {
      id: 8,
      product_name: "Điện thoại Oppo V5",
      price: "23.500.000đ",
      img: "https://tse4.mm.bing.net/th?id=OIP.Q8Zn4a5ta1skPGttct-JJAHaE8&pid=Api&P=0&h=180",
    },
    {
      id: 9,
      product_name: "Điện thoại Oppo A5s",
      price: "24.000.000đ",
      img: "https://cf.shopee.vn/file/60d340971f64e50e66cfe845bbfbc883",
    },
    {
      id: 10,
      product_name: "Điện thoại Oppo A73",
      price: "24.500.000đ",
      img: "https://toplist.vn/images/800px/chiec-dien-thoai-oppo-tot-nhat-hien-nay-69032.jpg",
    },
  ];
  localStorage.setItem("ListProduct", JSON.stringify(ListProduct));
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  //   --addtocart--
  const AddToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => product.id === item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
    localStorage.setItem("Cart", JSON.stringify(newCart));
  };
  const [isCartVisible, setIsCartVisible] = useState(false);

  //   --thay đổi trạng thái --
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  //   --xóa sản phẩm--
  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product.id !== productToRemove.id));
  };

  //   --tăng giảm số lượng--
  const increase = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //   --tổng tiền--
  const totalAmount = cart.reduce(
    (total, item) =>
      total + Number(item.price.replace(/\D/g, "")) * item.quantity,
    0
  );
  return (
    <div>
      <div className="header">
        <div className="header-menu">
          <div className="header-menu-home">Trang chủ</div>
          <div className="header-menu-list">Danh sách sản phẩm</div>
        </div>
        <div className="header-shop">
          <ShoppingCartIcon onClick={toggleCartVisibility} />
          <p>{cart.reduce((total, item) => total + item.quantity, 0)}</p>
          {isCartVisible && (
            <div className="shopping-table">
              <h1 className="shopping-table-title">Cart </h1>
              <hr />
              <table>
                <tbody id="tbody1">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.img} alt="" />
                      </td>
                      <td>{item.product_name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => decrease(item)}>-</button>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <button onClick={() => increase(item)}>+</button>
                      </td>

                      <td>
                        <button onClick={() => removeFromCart(item)}>
                          <DeleteIcon className="icon-delete" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="totalAmount">Tổng tiền: {totalAmount}đ</div>
            </div>
          )}
        </div>
      </div>
      <div className="body-container">
        <div className="body-container-title">Danh sách sản phẩm</div>
        <div className="body-container-list">
          {ListProduct.map((item) => (
            <div className="body-container-list-item" key={item.id}>
              <div className="body-container-list-item-img">
                <img src={item.img} alt="" />
              </div>
              <div className="body-container-list-item-name">
                {item.product_name}
              </div>
              <div className="body-container-list-item-price">{item.price}</div>
              <button
                className="body-container-list-item-btn-addtocart"
                onClick={() => AddToCart(item)}
              >
                <ShoppingCartIcon />{" "}
                <span className="body-container-list-item-btn-addtocart-text">
                  Thêm vào giỏ hàng
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
