"use client"
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { usePasswordToggle } from '../stores/usePasswordToggle';

const Input = ({ label, type, placeholder, error, onChange, name, value, ifPassword = false }) => {
  // memanggil dan menggunakan custom state untuk mengatur visibilitas password
  const { visibleFields, toggleVisibility } = usePasswordToggle();
  const isVisible = visibleFields[name] || false;

  return (
    <div className="w-full relative">
      <label htmlFor={label} className="block text-textPrimary font-normal text-sm md:text-sm mb-1">
        {label}
      </label>
      <input
        id={label}
        name={name}
        type={ifPassword && !isVisible ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-xs md:text-base outline-none transition-colors 
          ${error ? 'border-red-400 focus:border-red-400' : 'border-none focus:border-primary'} 
          bg-[#f5f7fb] text-textPrimary`}
      />
       {/* logika jika input adalah password maka muncul tombol untuk toggle visibilitas */}
      {ifPassword && (
        <button
          type="button"
          onClick={() => toggleVisibility(name)}
          className="absolute top-[34px] md:top-[40px] right-4 text-gray-500 hover:text-gray-700"
        >
          {isVisible ? <FiEye size={18} /> : <FiEyeOff size={18} />}
        </button>
      )}
      {/* text error dibawah notifikasi input jika ada kesalahan input*/}
      {error && <p className="text-red-500 text-xs md:text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
