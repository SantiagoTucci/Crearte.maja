import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { Product } from "@/types/product"

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }
    
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        }
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    }
    
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case "CLEAR_CART":
      return {
        ...state,
        items: []
      }
    
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen
      }
    
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload
      }
    
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  toggleCart: () => void
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  })

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: parsedCart })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const getTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      toggleCart,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
