export const filterParameters = (params) => {
  let page = 1;
  if (params.page) {
    if (!isNaN(params.page)) {
      page = parseInt(params.page, 10);
    }
  }
  if (!params.search) {
    params.search = "";
  }
  params.page = page;
  return params;
};
