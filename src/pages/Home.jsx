import { useCallback, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash.debounce';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryType, filterType, searchParam, pageCount } = useSelector(
    (state) => state.filter
  );

  const pizzas = items.map((e, i) => (
    <PizzaBlock
      {...e}
      key={i}
    />
  ));
  const skeletons = [...new Array(4)].map((e, i) => <Skeleton key={i} />);

  const getNewDataDebounce = useCallback(
    debounce((categoryType, filterType, searchParam, pageCount) => {
      getNewData(categoryType, filterType, searchParam, pageCount);
    }, 250),
    []
  );

  useEffect(() => {
    getNewDataDebounce(categoryType, filterType, searchParam, pageCount);
  }, [categoryType, filterType, searchParam, pageCount]);

  const getNewData = (categoryType, filterType, searchParam, pageCount) => {
    setIsLoading(true);
    const categoryParam =
      categoryType === 0 ? '' : `&category=${categoryType}&`;
    const searchSettings = searchParam ? `&search=${searchParam}` : ``;

    axios
      .get(
        `https://66fe59dd2b9aac9c997b832d.mockapi.io/items?${filterType.type}${categoryParam}${searchSettings}&page=${pageCount}&limit=4`
      )
      .catch(() => {
        return;
      })
      .then((res) => {
        if (res) {
          setItems(res.data);
          setIsLoading(false);
        }
      });
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
}

export default Home;
