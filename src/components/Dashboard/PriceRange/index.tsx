import type { CostDetail } from "@/types";
import { scaleLinear } from "d3-scale";
import formatDollars from "@/utils/formatDollars";
import classes from "./styles.module.scss";

export default function PriceRange(props: {
  data: CostDetail;
}) {
  const {
    percent25,
    percent50,
    percent75,
  } = props.data.current;

  const extra = (percent75 - percent25) / 3;
  const scale = scaleLinear()
    .domain([
      Math.max(0, percent25 - extra),
      percent75 + extra,
    ])
    .range([0, 100])
    .nice();

  const pct25 = `${scale(percent25)}%`;
  const pct50 = `${scale(percent50)}%`;
  const pct75 = `${scale(percent75)}%`;
  const spread = `${scale(percent75) - scale(percent25)}%`;

  const styleProps = {
    '--pct25': pct25,
    '--pct50': pct50,
    '--pct75': pct75,
    '--spread': spread,
  } as React.CSSProperties;

  return (
    <div
      className={classes.canvas}
      style={styleProps}
    >
      <div className={classes.annoLine}>
        <div className={classes.avg}>
          <span>{formatDollars(percent50)}</span>
          <span>Average</span>
        </div>
      </div>

      <div className={classes.barBg}>
        <div className={classes.barSpread} />
        <div className={classes.thumbLow} />
        <div className={classes.thumbHigh} />
        <div className={classes.thumbMid} />
      </div>

      <div className={classes.annoLine}>
        <div className={classes.low}>
          <span>{formatDollars(percent25)}</span>
          <span>Low</span>
        </div>
        <div className={classes.high}>
          <span>{formatDollars(percent75)}</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
