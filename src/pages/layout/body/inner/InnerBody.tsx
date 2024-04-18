const InnerBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={["w-body-inner-l", "flex flex-col", className].join(" ")}>{children}</div>;
};
export default InnerBody;