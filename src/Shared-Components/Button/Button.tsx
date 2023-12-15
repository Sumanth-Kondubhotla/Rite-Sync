import styles from "./button.module.css";

interface ButtonProps {
  label: string;
  variant?: string;
}
const Button = (props: ButtonProps) => {
  const { label, variant = "primary" } = props;
  const getClassNames = () =>
    `${styles.button} ${variant === "primary" && styles.primaryButton}`;
  return (
    <div className={styles.test}>
      <button className={getClassNames()}>{label}</button>
    </div>
  );
};

export default Button;
