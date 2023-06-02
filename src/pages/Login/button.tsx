interface Props {
  onClick?: () => void;
  btnText?: string;
  className?: string;
  type?: any;
}

export const Button = (props: Props) => {
  const { btnText, className, type, onClick } = props;
  return (
    <button className={className} type={type} onClick={onClick}>
      {btnText}
    </button>
  );
};
