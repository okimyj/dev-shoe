const InnerBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={["w-body-inner-l", "flex flex-col items-center", className].join(" ")}>
      {children}
    </div>
  );
};
export default InnerBody;
