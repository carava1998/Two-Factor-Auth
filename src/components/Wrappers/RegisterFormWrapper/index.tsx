import RegisterForm from '../../RegisterForm';
import { PropsWithChildren } from 'react';



type RegisterFormWrapperProps = {
  className?: string;
  email?: string
}

const RegisterFormWrapper = (props: PropsWithChildren<RegisterFormWrapperProps>) => {

  return (
    <div className={props.className} style={{minWidth: '90%'}}>
      {props.children}
      <RegisterForm email={props.email}/>
    </div>
  );
}

export default RegisterFormWrapper;