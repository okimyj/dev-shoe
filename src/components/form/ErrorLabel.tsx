interface ErrorLabelProps {
  error?: string;
  classNames?: string;
}
const ErrorLabel = ({ error, classNames }: ErrorLabelProps) => {
  return (
    error && (
      <div className={["text-left text-xs text-destructive", classNames].join(" ")}>{error}</div>
    )
  );
};

export default ErrorLabel;
