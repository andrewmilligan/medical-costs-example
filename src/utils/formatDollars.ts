export default function formatDollars(price: number) {
  return price.toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    },
  );
}
