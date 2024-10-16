import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryType: 0,
  pageCount: 1,
  filterType: {
    label: ['популярности'],
    type: ['sortBy=rating&order=desc'],
    index: [0],
  },
  searchParam: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryType(state, action) {
      state.categoryType = action.payload;
    },
    setFilterType(state, action) {
      state.filterType = action.payload;
    },
    setSearchParam(state, action) {
      state.searchParam = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const { setCategoryType, setFilterType, setSearchParam, setPageCount } =
  filterSlice.actions;

export default filterSlice.reducer;
