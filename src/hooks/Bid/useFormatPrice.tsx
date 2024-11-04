const useFormatPrice = (givenPrice: number) => {
  if (givenPrice / 10000 >= 1) {
    return `${givenPrice / 10000} 만원`;
  }
  return `${givenPrice.toLocaleString()} 원`;
};

export default useFormatPrice;
