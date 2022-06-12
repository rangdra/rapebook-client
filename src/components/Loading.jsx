const Loading = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
