"use client";

import React from "react";
import { Input, InputProps } from "./input";

export interface FormFieldProps extends InputProps {
  id: string;
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormField = ({
  id,
  name,
  label,
  error,
  helperText,
  ...props
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <Input
        id={id}
        name={name}
        label={label}
        error={error}
        aria-describedby={helperText ? `${id}-description` : undefined}
        {...props}
      />
      {helperText && !error && (
        <p
          id={`${id}-description`}
          className="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Create specific form field types for common use cases
export const EmailField = (props: Omit<FormFieldProps, "type">) => (
  <FormField
    type="email"
    autoComplete="email"
    placeholder="you@example.com"
    {...props}
  />
);

export const PasswordField = (props: Omit<FormFieldProps, "type">) => (
  <FormField
    type="password"
    autoComplete={props.name === "new-password" ? "new-password" : "current-password"}
    {...props}
  />
);

export const TextField = (props: Omit<FormFieldProps, "type">) => (
  <FormField type="text" {...props} />
);

export const NumberField = (props: Omit<FormFieldProps, "type">) => (
  <FormField type="number" {...props} />
);

export const DateField = (props: Omit<FormFieldProps, "type">) => (
  <FormField type="date" {...props} />
); 