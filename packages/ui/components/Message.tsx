export const Message = (props: { message: string }) => {
  const { message } = props;
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <p>{message}</p>
    </div>
  );
};
