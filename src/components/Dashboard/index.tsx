import Card from "./Card";
import AveragePrice from "./AveragePrice";
import PriceRange from "./PriceRange";
import HistoricalPrice from "./HistoricalPrice";
import useDataSelection from "./useDataSelection";
import classes from "./styles.module.scss";

export default function Dashboard(props: {
  treatment: string;
  geography: string;
}) {

  const {
    isPending,
    data,
    insurance,
    source,
  } = useDataSelection({
    treatment: props.treatment,
    geography: props.geography,
  });

  return (
    <div className={classes.dash}>
      <aside>
        <h2>How much does it cost?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </aside>

      <div className={classes.content}>
        <div className={classes.selectors}>
          <select value={insurance.value} onChange={insurance.onChange}>
            {insurance.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select value={source.value} onChange={source.onChange}>
            {source.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.cards}>
          <Card
            title="Average Price"
            geography={props.geography}
            isPending={isPending}
          >
            {data && (
              <AveragePrice
                data={data}
              />
            )}
          </Card>

          <Card
            title="Typical Price Range"
            geography={props.geography}
            isPending={isPending}
          >
            {data && (
              <PriceRange
                data={data}
              />
            )}
          </Card>

          <Card
            title="Price Trends"
            geography={props.geography}
            isPending={isPending}
          >
            {data && (
              <HistoricalPrice
                data={data}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
