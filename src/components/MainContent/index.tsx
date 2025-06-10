import classes from "./styles.module.scss";

export default function MainContent(props: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.content}>
      {props.children}
    </div>
  );
}
