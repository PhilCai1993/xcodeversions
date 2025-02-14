import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger" | "success"
}

const badgeVariants = {
  primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  danger: "bg-red-100 text-red-800 hover:bg-red-200",
  success: "bg-green-100 text-green-800 hover:bg-green-200",
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "primary" }) => {
  const variantStyle = badgeVariants[variant] || badgeVariants.primary

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${variantStyle}`}>
      {children}
    </span>
  )
}

export default Badge

