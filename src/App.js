import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, setSelectedCategory, setSearch } from './redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allFetched, setAllFetched] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  // products
  useEffect(() => {
    setLoading(true);
    dispatch(fetchProducts(category, search, skip)).then((res) => {
      if (res && res.length < 10) {
        setAllFetched(true);
      }
      setLoading(false);
    });
  }, [dispatch, category, search, skip]);

  // categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(setSelectedCategory(selectedCategory));
    navigate(`?category=${selectedCategory}`);
    setSkip(0);
    setAllFetched(false);
  };

  // search
  const handleSearchChange = (e) => {
    const search = e.target.value;
    dispatch(setSearch(search));
    navigate(`?search=${search}`);
    setSkip(0);
    setAllFetched(false);
  };

  // Load more products when "Load More" button is clicked
  const loadMoreProducts = () => {
    setLoading(true);
    setSkip(skip + 10);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product List</h1>

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="mb-4 p-2 w-full border border-gray-300 rounded-md shadow-sm"
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          className="mb-6 p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105"
              >
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No products available</p>
          )}
        </div>

        {!allFetched && (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreProducts}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        {allFetched && <p className="text-center mt-4 text-gray-600">All products loaded.</p>}
      </div>
    </div>
  );
};

export default App;
