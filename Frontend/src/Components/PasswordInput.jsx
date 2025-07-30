import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { validatePassword } from "../lib/utils"; 

const PasswordInput = ({ value, onChange, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isValid = validatePassword(value);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='form-control mb-4'>
      <div className='relative'>
        <input
          value={value}
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder || 'Password'}
          className={`input input-bordered bg-transparent pr-12 w-full ${
            !isValid && value.length > 0 ? 'border-error' : ''
          }`}
        />

        <div
          className='absolute right-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer'
          onClick={toggleShowPassword}
        >
          {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
        </div>
      </div>     

      {!isValid && value.length > 0 && value.length < 5 && (
        <p className='text-xs text-error mt-1'>
          Password must be at least 5 characters.
        </p>
      )}
      {!isValid && value.length > 4 && (
        <p className='text-xs text-error mt-1'>
          Password contains invalid characters (valid: _ @ *)
        </p>
      )}
    </div>
  );
};

export default PasswordInput;