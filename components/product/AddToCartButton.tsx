"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Adds a product to the cart and briefly confirms. Reusable on cards + PDP. */
export function AddToCartButton({
  productId,
  quantity = 1,
  label = "Add to cart",
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
}: {
  productId: string;
  quantity?: number;
  label?: string;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(productId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      aria-live="polite"
      className={cn(fullWidth && "w-full", className)}
    >
      {added ? (
        <>
          <Check /> Added
        </>
      ) : (
        <>
          <Plus /> {label}
        </>
      )}
    </Button>
  );
}
