export const currencyEgpFormat = (num) => {
  const EGPFormat = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  });

  return EGPFormat.format(num);
};
