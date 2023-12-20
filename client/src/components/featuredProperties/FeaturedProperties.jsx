import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("hotels?featured=true")
  return (
    <div className="fp">
      {loading ? "loading " : <>
        {data.map((item) => (
          <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">{item.cheapestPrice}</span>
           {item.rating && <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>))}
      </>}
    </div>
  );
};

export default FeaturedProperties;
