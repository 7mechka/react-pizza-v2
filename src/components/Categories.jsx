import { useDispatch, useSelector } from "react-redux";
import { setCategoryType } from "../redux/slices/filterSlice";

function Categories() {
  const categoryType = useSelector((state) => state.filter.categoryType);
  const dispatch = useDispatch();

  const categories = [
    'Всі',
    "М'ясна",
    'Вегетаріанська',
    'Гриль',
    'Гостра',
    'Закрита',
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((e, i) => (
          <li
            className={categoryType === i ? 'active' : ''}
            onClick={() => dispatch(setCategoryType(i))}
            key={i}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
