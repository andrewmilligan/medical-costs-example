import classes from "./styles.module.scss";

export default function Card(props: {
  title: string;
  geography: string;
  isPending: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={classes.card}>
      <h3>{props.title}</h3>

      <div className={classes.content}>
        {props.children}
      </div>

      <div className={classes.geo}>
        {props.geography}
      </div>
    </div>
  );
}
