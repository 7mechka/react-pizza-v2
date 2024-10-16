import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterType } from '../redux/slices/filterSlice';

function Sort() {
  let [isVisible, setIsVisible] = useState(false);
  const buttonsList = {
    label: ['популярністю', 'ціною', 'алфавітом'],
    type: [
      'sortBy=rating&order=desc',
      'sortBy=price&order=desc',
      'sortBy=title',
    ],
    index: [0, 1, 2],
  };

  const filterType = useSelector((state) => state.filter.filterType);
  const dispatch = useDispatch();

  const sortRef = useRef()

  useEffect(() => {
    const handleSortClick = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    }

    document.body.addEventListener('click', handleSortClick)

    return () => {
      document.body.removeEventListener('click', handleSortClick)
    }
  }, [])

  const popupLogic = (i) => {
    dispatch(
      setFilterType({
        label: buttonsList.label[i],
        type: buttonsList.type[i],
        index: i,
      })
    );
    setIsVisible(!isVisible);
  };

  return (
    <div
      className='sort'
      ref={sortRef}>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортування за:</b>
        <span onClick={() => setIsVisible(!isVisible)}>
          {buttonsList.label[filterType.index]}
        </span>
      </div>
      {isVisible && (
        <div className='sort__popup'>
          <ul>
            {buttonsList.label.map((e, i) => (
              <li
                key={i}
                onClick={() => popupLogic(i)}
                className={filterType.index === i ? 'active' : ''}>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
