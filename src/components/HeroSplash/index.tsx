import clsx from "clsx";
import useTreatmentData from "@/hooks/useTreatmentData";
import classes from "./styles.module.scss";

export default function HeroSplash(props: {
  treatment: string;
  geography: string;
}) {
  const treatmentData = useTreatmentData({
    treatment: props.treatment,
    geography: props.geography,
  });

  const {
    isPending,
    data: {
      label: {
        label,
        label_detailed,
      } = {},
    } = {},
  } = treatmentData;

  return (
    <div className={clsx(classes.splash, { isPending })}>
      <h1>
        {label}
      </h1>
      <div>
        {label_detailed}
      </div>
    </div>
  );
}
