import { useDispatch, useSelector } from 'react-redux';
import styles from './Search.module.scss';
import { setSearchParam } from '../../redux/slices/filterSlice';
import { useRef } from 'react';

function Search() {
  const searchValue = useSelector((state) => state.filter.searchParam);
  const dispatch = useDispatch();
  const inputRef = useRef();

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns='http://www.w3.org/2000/svg'
        height='24px'
        viewBox='0 -960 960 960'
        width='24px'
        fill='#5f6368'>
        <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        value={searchValue}
        onChange={(e) => dispatch(setSearchParam(e.target.value))}
        placeholder='Пошук піци...'
      />
      {searchValue && (
        <svg
          className={styles.clearIcon}
          onClick={() => dispatch(setSearchParam(''), inputRef.current.focus())}
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 -960 960 960'
          width='24px'
          fill='#5f6368'>
          <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
        </svg>
      )}
    </div>
  );
}

export default Search;
