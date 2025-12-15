const Title = ({ title, desc }) => {
  return (
    <div className="flex flex-col gap-2 items-center py-6 border-b border-gray-100">
      <h1 className="font-bold text-3xl">{title}</h1>
      <p className="text-base">{desc}</p>
    </div>
  );
};

export default Title;
