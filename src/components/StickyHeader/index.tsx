import { useRouter } from "next/router";
import Link from "next/link";
import useGeographies from "@/hooks/useGeographies";
import classes from "./styles.module.scss";

export default function StickyHeader(props: {
  treatment: string;
  geography: string;
}) {
  const router = useRouter();

  const {
    isPending,
    data: {
      geographies = [],
    } = {},
  } = useGeographies();

  return (
    <div className={classes.header}>
      <div className={classes.brand}>
        <div className={classes.title}>
          <Link href="/">
            Medical Costs
          </Link>
        </div>
        <div>Lorem ipsum dolor sit amet</div>
      </div>

      <div>
        {isPending && (
          <span>{props.geography}</span>
        )}

        {!isPending && (
          <select
            value={props.geography}
            onChange={(e) => {
              const value = e.target.value;
              router.push(`/${props.treatment}/${value}`);
            }}
          >
            {geographies.map((geo) => (
              <option
                key={geo}
                value={geo}
              >
                {geo}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
