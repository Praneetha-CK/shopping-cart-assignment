import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./Products.scss";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../constants";
import { CategoryListing } from "./CategoryListing";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Product } from "./Product";

export const Products = () => {
  const [{ apiData: products = [] }] = useFetch(api.products);

  let [searchParams] = useSearchParams();

  const filteredProducts = useMemo(() => {
    let catId = searchParams.get("cat_id");

    return catId
      ? products.filter((category) => {
          return category.category === catId;
        })
      : products;
  }, [searchParams, products]);

  return (
    <Container className="products">
      <Row>
        <Col lg={2} md={4}>
          <CategoryListing />
        </Col>
        <Col className="mt-1">
          <Row className="product-listing px-2">
            {filteredProducts.map((product, i) => {
              return (
                <Col
                  lg={3}
                  md={6}
                  sm={12}
                  className="d-flex m-0 p-1"
                  key={product.id}
                >
                  <Product {...product} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
