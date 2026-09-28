import React from "react";
import { Loader2, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl cursor-pointer";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2.5 font-semibold",
  };

  const variantClasses = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow active:scale-[0.99] focus:ring-red-500",
    secondary:
      "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-slate-400",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow focus:ring-rose-500",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow focus:ring-emerald-500",
    outline:
      "border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400",
    ghost:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-slate-400",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

// Card Component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  elevated = false,
  className = "",
  ...props
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4 sm:p-5",
    lg: "p-6 sm:p-7",
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-all ${
        elevated ? "shadow-md hover:shadow-lg" : "shadow-xs"
      } ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Badge Component
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "critical" | "high" | "medium" | "low" | "success" | "info" | "warning";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  dot = false,
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    critical: "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40",
    high: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-900/40",
    medium: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40",
    low: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40",
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40",
    info: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-900/40",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40",
  };

  const dotClasses = {
    default: "bg-slate-400",
    critical: "bg-red-500 animate-pulse",
    high: "bg-orange-500 animate-pulse",
    medium: "bg-amber-500",
    low: "bg-blue-500",
    success: "bg-emerald-500",
    info: "bg-sky-500",
    warning: "bg-amber-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
};

// Modal Component
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "md",
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthClasses[maxWidth]} bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

// Alert Component
export interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  children,
  className = "",
}) => {
  const config = {
    info: {
      icon: Info,
      bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/40 text-sky-800 dark:text-sky-300",
      iconColor: "text-sky-500",
    },
    success: {
      icon: CheckCircle,
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300",
      iconColor: "text-emerald-500",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300",
      iconColor: "text-amber-500",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300",
      iconColor: "text-red-500",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-2xl border ${config.bg} ${className}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="text-sm">
        {title && <h5 className="font-semibold mb-0.5">{title}</h5>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
};

// Loading Spinner
export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg"; label?: string }> = ({
  size = "md",
  label,
}) => {
  const sizeClasses = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-red-600`} />
      {label && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>}
    </div>
  );
};
