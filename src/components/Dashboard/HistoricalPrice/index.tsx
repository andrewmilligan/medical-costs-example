import type { CostDetail } from "@/types";
import { useRef } from "react";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import { line, curveCatmullRom } from "d3-shape";
import { useResizeObserver } from "usehooks-ts";
import formatDollars from "@/utils/formatDollars";
import classes from "./styles.module.scss";

export default function HistoricalPrice(props: {
  data: CostDetail;
}) {
  const { years } = props.data;

  const ref = useRef<HTMLDivElement>(null);
  const height = 250;
  const { width = 0 } = useResizeObserver({
    ref: ref as React.RefObject<HTMLElement>,
    box: 'border-box',
  })

  const margin = { left: 60, right: 15, top: 10, bottom: 10 };

  const xscale = scaleLinear()
    .domain(extent(years.map((year) => year.year)) as number[])
    .range([margin.left, width - margin.right]);
  const yscale = scaleLinear()
    .domain(extent(years.map((year) => year.percent50)) as number[])
    .range([height - margin.bottom, margin.top])
    .nice();

  const lineData = years.map((d) => [d.year, d.percent50]) as [number, number][];
  const trend = line()
    .x((d) => xscale(d[0]))
    .y((d) => yscale(d[1]))
    .curve(curveCatmullRom);

  return (
    <div
      ref={ref}
      className={classes.canvas}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0, 0, ${width}, ${height}`}
      >
        {yscale.ticks(5).map((tick) => (
          <line
            key={tick}
            x1={0}
            x2={xscale.range()[1]}
            y1={yscale(tick)}
            y2={yscale(tick)}
            stroke="#F5F5F5"
          />
        ))}

        <path
          d={`${trend(lineData)}`}
          fill="none"
          stroke="#0A3D62"
          strokeWidth="2"
        />
      </svg>

      <div className={classes.annotations}>
        {yscale.ticks(5).map((tick) => (
          <div
            key={tick}
            className={classes.ytick}
            style={{
              transform: `translateY(-100%) translateY(${yscale(tick)}px)`,
            }}
          >
            {formatDollars(tick)}
          </div>
        ))}

        {xscale.ticks(5).map((tick) => (
          <div
            key={tick}
            className={classes.xtick}
            style={{
              transform: `translateX(-50%) translateX(${xscale(tick)}px)`,
            }}
          >
            {tick}
          </div>
        ))}
      </div>
    </div>
  );
}
