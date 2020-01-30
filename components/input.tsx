// import { ReactNode } from 'react';

// type PropsType = {
//   type: string;
//   icon: ReactNode | undefined;
//   [key: string]: any;
// }

const Input = ({ type, icon = undefined, ...props }) => {
  const Icon: any = icon;
  const additionalIconClass = (icon) ? 'has-icons-left' : '';
  const additionalSubmitClasses = (type === 'submit') ? 'button is-info is-inverted is-outlined' : '';

  const onchange = (e) => {
    if (!props.onChange) return;

    props.onChange(e.target.value);
  };

  return (
    <div className="field">
      <div className={`control ${(additionalIconClass)}`}>
        <input
          {...props}
          className={`input ${(additionalSubmitClasses)}`}
          type={type}
          onChange={onchange}
        />
        {
          icon && (
          <span className="icon is-small is-left">
            <Icon />
          </span>
          )
        }
      </div>
    </div>
  );
};

export default Input;
