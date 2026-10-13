/**
 * Design system — reusable primitive components.
 * All use the design tokens from tailwind.config.js.
 */

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── cn utility ───────────────────────────────────────────────────────────────
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brightGreen disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-app-primary hover:bg-app-primaryHover text-white border border-app-brightGreen/30 shadow-md shadow-app-primary/20",
    secondary:
      "bg-app-card hover:bg-app-cardElevated text-app-textPrimary border border-app-border hover:border-app-borderLight",
    danger:
      "bg-app-danger hover:bg-red-600 text-white border border-red-500/30 shadow-md shadow-red-500/20",
    ghost:
      "bg-transparent hover:bg-app-card text-app-textSecondary hover:text-app-textPrimary border border-transparent hover:border-app-border",
    gold:
      "bg-app-gold/10 hover:bg-app-gold/20 text-app-gold border border-app-gold/30",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-13 px-6 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  noPad?: boolean;
}

export function Card({ elevated = false, noPad = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-app-border",
        elevated ? "bg-app-cardElevated" : "bg-app-card",
        !noPad && "p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "gold" | "muted" | "danger";
  className?: string;
}

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    green:  "bg-app-primary/20 text-app-brightGreen border-app-primary/30",
    gold:   "bg-app-gold/10 text-app-gold border-app-gold/30",
    muted:  "bg-app-cardElevated text-app-textMuted border-app-border",
    danger: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number;   // 0-100
  className?: string;
  color?: "green" | "gold";
}

export function ProgressBar({ value, className, color = "green" }: ProgressBarProps) {
  const fill = color === "gold" ? "from-app-gold to-yellow-400" : "from-app-primary to-app-brightGreen";
  return (
    <div
      className={cn("w-full h-2 rounded-full bg-app-border overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", fill)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-app-card border border-app-border flex items-center justify-center text-app-textMuted">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <p className="font-semibold text-app-textPrimary">{title}</p>
        {description && <p className="text-sm text-app-textMuted max-w-xs">{description}</p>}
      </div>
      {action && action}
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
export function SectionHeader({ label, action }: { label: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-app-textMuted uppercase tracking-widest">{label}</h3>
      {action}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-app-border", className)} />;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-app-card border border-app-border rounded-xl p-1 overflow-x-auto no-scrollbar",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 min-w-max py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
            active === tab.id
              ? "bg-app-primary text-white shadow-sm"
              : "text-app-textMuted hover:text-app-textPrimary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── Toggle chip ──────────────────────────────────────────────────────────────
interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

export function Chip({ label, active, onClick, count }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap transition-all",
        active
          ? "bg-app-primary text-white border-app-brightGreen shadow-md shadow-app-primary/30"
          : "bg-app-card text-app-textSecondary border-app-border hover:border-app-borderLight"
      )}
    >
      {label}
      {count !== undefined && (
        <span className="ml-1.5 opacity-60">{count}</span>
      )}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-app-textSecondary">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-2.5 text-sm text-app-textPrimary",
          "placeholder:text-app-textMuted",
          "focus:outline-none focus:border-app-brightGreen transition-colors",
          error && "border-app-danger",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-app-danger">{error}</p>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-app-textSecondary">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-2.5 text-sm text-app-textPrimary",
          "placeholder:text-app-textMuted resize-none",
          "focus:outline-none focus:border-app-brightGreen transition-colors",
          error && "border-app-danger",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-app-danger">{error}</p>}
    </div>
  );
}

// ─── Toast (simple, non-Radix) ────────────────────────────────────────────────
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
}

export function Toast({ message, type = "success", visible }: ToastProps) {
  const colors = {
    success: "border-app-brightGreen text-app-brightGreen",
    error:   "border-app-danger text-app-danger",
    info:    "border-app-gold text-app-gold",
  };
  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-[9999] max-w-sm bg-app-cardElevated border rounded-xl px-4 py-3 shadow-2xl text-sm font-medium",
        "transition-all duration-300",
        colors[type],
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      )}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-app-card border border-app-border w-full max-w-lg rounded-2xl shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-app-border">
          <h2 className="font-bold text-base text-app-textPrimary">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-app-textMuted hover:text-white hover:bg-app-cardElevated"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4 space-y-4">{children}</div>
        {footer && (
          <div className="px-5 pb-5 flex justify-end gap-3 border-t border-app-border pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── OfflineIndicator ─────────────────────────────────────────────────────────
export function OfflineIndicator({ online }: { online: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
        online
          ? "bg-app-primary/10 border-app-primary/30 text-app-brightGreen"
          : "bg-app-gold/10 border-app-gold/30 text-app-gold"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          online ? "bg-app-brightGreen pulse-dot" : "bg-app-gold"
        )}
      />
      <span>{online ? "Online" : "Offline"}</span>
    </div>
  );
}

// ─── ProgressRing ─────────────────────────────────────────────────────────────
interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({ value, size = 72, stroke = 6, label, sublabel }: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="var(--bright-green)"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {label && <span className="text-base font-bold text-app-textPrimary leading-none">{label}</span>}
          {sublabel && <span className="text-[10px] text-app-textMuted mt-0.5">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}
