export const searchSubmitHandler = (state, setState, event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  setState({
    ...state,
    search: data.get("search"),
    page: 1,
  });
};

export const clearSearchHandler = (state, setState, setSearchBarState) => {
  setSearchBarState("");
  setState({
    ...state,
    search: "",
    page: 1,
  });
};

export const sortHandler = (state, setState, event) => {
  const newSort = parseInt(event.target.value, 10);
  if (state.sort !== newSort) {
    setState({
      ...state,
      sort: newSort,
    });
  }
};

export const attributeHandler = (state, setState, event) => {
  const newAttribute = event.target.value;
  if (state.attribute !== newAttribute)
    setState({
      ...state,
      attribute: newAttribute,
    });
};

export const onChangeHandler = (setSearchBarState, event) => {
  setSearchBarState(event.target.value);
};
export const submitHandler = (searchBarState, state, setState) => {
  if (searchBarState !== "") {
    setState({
      ...state,
      search: searchBarState,
      page: 1,
    });
  }
};
