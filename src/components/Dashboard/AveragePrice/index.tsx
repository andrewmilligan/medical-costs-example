import type { CostDetail } from "@/types";
import formatDollars from "@/utils/formatDollars";
import classes from "./styles.module.scss";

export default function AveragePrice(props: {
  data: CostDetail;
}) {
  const price = formatDollars(props.data.current.percent50);
  return (
    <div className={classes.price}>
      {price}
    </div>
  );
}
