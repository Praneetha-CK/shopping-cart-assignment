import { api } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { Banner } from "./Banner";
import "./Categories.scss";
import { Category } from "./Category";

export const Categories = () => {
  const [{ apiData: categories = [] }] = useFetch(api.categories);

  return (
    <div className="categories my-1">
      <Banner />

      {categories.map((category, i) => {
        const isEven = i % 2 === 0;
        return category?.enabled ? (
          <Category
            {...category}
            key={category.id}
            keyName={category.key}
            reverse={!isEven}
          />
        ) : null;
      })}
    </div>
  );
};
