"use client";

import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form = ({ children, className = "", ...props }: FormProps) => {
  return (
    <form className={`space-y-6 ${className}`} {...props}>
      {children}
    </form>
  );
};

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({ children, className = "" }: FormSectionProps) => {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
};

interface FormDividerProps {
  className?: string;
}

export const FormDivider = ({ className = "" }: FormDividerProps) => {
  return <div className={`border-t border-gray-200 my-6 ${className}`} />;
};

interface FormFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const FormFooter = ({ children, className = "" }: FormFooterProps) => {
  return (
    <div className={`flex items-center justify-end space-x-4 pt-4 ${className}`}>
      {children}
    </div>
  );
}; 