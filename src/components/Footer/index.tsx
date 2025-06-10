import classes from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.brand}>
        <div className={classes.title}>Medical Costs</div>
        <div className={classes.copyright}>
          Copyright ©2025. All rights reserved. Website for personal, non-commercial use only.
        </div>
      </div>

      <div className={classes.secondary}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada ac nunc vel auctor. Integer convallis tristique laoreet. Sed purus leo, feugiat sit amet dui luctus, congue feugiat tortor. Aliquam tempus vitae arcu nec dictum.
        </div>

        <nav>
          <ul>
            <li>Email us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
