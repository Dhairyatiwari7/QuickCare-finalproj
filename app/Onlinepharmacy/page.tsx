'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from '../components/CheckoutForm'
import { useState, useEffect } from "react"
import { Search, ShoppingCart, Pill, AmbulanceIcon as FirstAid, Stethoscope, Thermometer, Heart, Droplets, Tablets, Syringe } from "lucide-react"


const stripePromise = loadStripe('pk_test_51QsUghPr6AEsQaoxeUXUFwm1cnfA4XkyZXtBFviDqScaiOpynS41n52pQjguv2jgjAy9077qN5bHZ9htkhXgqY5a00rk3ImqL5');

interface ImageDimensions {
  width: number;
  height: number;
}

interface Medicine {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  imageDimensions?: ImageDimensions;
}

interface CartItem extends Medicine {
  quantity: number
}

// Expanded medicine data
const medicineData: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol",
    description: "Pain relief and fever reduction",
    price: 50,
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/IV/UY/CG/75459511/500mg-paracetamol-tablet.jpg ",
    category: "Pain Relief",
    imageDimensions: {
      width: 80,
      height: 50
    }
  },
{
    id: "2",
    name: "Amoxicillin",
    description: "Antibiotic for bacterial infections",
    price: 58,
    image: "https://5.imimg.com/data5/SELLER/Default/2024/7/437949243/TY/IL/IU/45342411/amoxicillin-capsule-500-mg-500x500.jpg",
    category: "Antibiotics"
  },
  {
    id: "3",
    name: "Ibuprofen",
    description: "Anti-inflammatory pain reliever",
    price: 57,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwAREe8on9MO2wK5Xu8yPdwaffpK4VEXk8nQ&s",
    category: "Pain Relief"
  },
  {
    id: "4",
    name: "Loratadine",
    description: "Antihistamine for allergies",
    price: 60,
    image: "https://www.remedialhealthcare.in/srcfxonl22ddd/uploads/2020/12/LORAPIL-10-TAB-scaled.jpg",
    category: "Allergy"
  },
  {
    id: "5",
    name: "Omeprazole",
    description: "Acid reflux and heartburn relief",
    price: 65,
    image: "https://www.padagis.com/wp-content/uploads/2024/04/915-Omeprazole.png",
    category: "Digestive Health"
  },
  {
    id: "6",
    name: "Aspirin",
    description: "Pain relief and blood thinner",
    price: 70,
    image: "https://image.made-in-china.com/202f0j00YjtoWGNFfAqH/Antipyretic-Analgesics-Medicine-Aspirin-Tablet-300mg.webp",
    category: "Pain Relief"
  },
  {
    id: "7",
    name: "Cetirizine",
    description: "24-hour allergy relief",
    price: 70,
    image: "https://www.adenhealthcare.com/wp-content/uploads/2018/07/CONIT-1.jpg",
    category: "Allergy"
  },
  {
    id: "8",
    name: "Metformin",
    description: "Diabetes management medication",
    price: 65,
    image: "https://images.ctfassets.net/4w8qvp17lo47/6vXaH4Y5Gw6AMEmASwGkc6/e6ff962a82811e4d160cc2d5c0d8b3cb/metformin-antidiabetic-tablets-science-photo-library.jpg",
    category: "Diabetes"
  },
  {
    id: "9",
    name: "Sertraline",
    description: "Antidepressant medication",
    price: 85,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/8/337366367/KI/RJ/BA/7034457/sertraline-100-mg-tablets.jpg",
    category: "Mental Health"
  },
  {
    id: "10",
    name: "Vitamin D3",
    description: "Bone health supplement",
    price: 110,
    image: "https://images.ctfassets.net/4w8qvp17lo47/6vXaH4Y5Gw6AMEmASwGkc6/e6ff962a82811e4d160cc2d5c0d8b3cb/metformin-antidiabetic-tablets-science-photo-library.jpg",
    category: "Vitamins"
  },
  {
    id: "11",
    name: "Multivitamin Complex",
    description: "Daily essential vitamins",
    price: 70,
    image: "https://images-static.nykaa.com/media/catalog/product/4/7/4738bda8906091689877_1.jpg?tr=w-500",
    category: "Vitamins"
  },
  {
    id: "12",
    name: "Zinc Supplement",
    description: "Immune system support",
    price: 60,
    image: "https://m.media-amazon.com/images/I/511wHehPtzL.jpg",
    category: "Vitamins"
  },
  {
    id: "13",
    name: "Magnesium Citrate",
    description: "Muscle and nerve support",
    price: 75,
    image: "https://i5.walmartimages.com/seo/Equate-Magnesium-Citrate-Saline-Laxative-Lemon-Flavor-10-Oz_2882e8e6-5405-4620-a770-94ef0f180100_1.ce94f8aa6e0695a3e409dffefc0dfa9f.jpeg",
    category: "Minerals"
  },
  {
    id: "14",
    name: "Fish Oil Omega-3",
    description: "Heart and brain health",
    price: 95,
    image: "https://www.guardian.in/cdn/shop/files/1_c4089fba-5a0a-4a66-8bdd-ae11139ae426.jpg?v=1738060031&width=2048",
    category: "Supplements"
  },
  {
    id: "15",
    name: "Probiotics",
    description: "Digestive health support",
    price: 80,
    image: "https://inlifehealthcare.com/cdn/shop/files/front_67244fdd-5de6-4447-83ec-b92f1f8b686f.webp?v=1733139019&width=2048",
    category: "Digestive Health"
  },
  {
    id: "16",
    name: "Melatonin",
    description: "Sleep support supplement",
    price: 100,
    image: "https://images.ctfassets.net/4w8qvp17lo47/6vXaH4Y5Gw6AMEmASwGkc6/e6ff962a82811e4d160cc2d5c0d8b3cb/metformin-antidiabetic-tablets-science-photo-library.jpg",
    category: "Sleep Aid"
  },
  {
    id: "17",
    name: "Iron Supplement",
    description: "Anemia prevention",
    price: 45,
    image: "https://maharishiayurvedaindia.com/cdn/shop/files/raktda-ayurvedic-iron-supplement-maharishi-ayurveda-india-1.png?v=1692185134&width=600",
    category: "Minerals"
  },
  {
    id: "18",
    name: "Calcium + D3",
    description: "Bone strength formula",
    price: 75,
    image: "https://m.media-amazon.com/images/I/71Df2-WAR0L.jpg",
    category: "Minerals"
  },
  {
    id: "19",
    name: "B-Complex",
    description: "Energy and metabolism support",
    price: 80,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDFTaoTD49GRunPP35j8HFxMdlBxjcIVU7g&s",
    category: "Vitamins"
  },
  {
    id: "20",
    name: "Glucosamine",
    description: "Joint health supplement",
    price: 90,
    image: "https://www.metagenics.com.au/cdn/shop/files/ANZ_MG_GLIC_GlucosamineIntensiveCare_None_60_Tablets_PackFront_20240830.png?v=1726452763&width=1946",
    category: "Joint Health"
  }
]

// Floating Icon Component
function FloatingIcon({ 
  Icon, 
  className, 
  animationDelay 
}: { 
  Icon: any
  className: string
  animationDelay: string 
}) {
  return (
    <div 
      className={`absolute ${className} animate-float opacity-20`}
      style={{ 
        animation: `float 20s ease-in-out infinite`,
        animationDelay 
      }}
    >
      <Icon className="w-8 h-8" />
    </div>
  )
}

// Cart Component
function Cart({ isOpen, onClose, items, onRemoveItem, onCheckout }: { isOpen: boolean, onClose: () => void, items: CartItem[], onRemoveItem: (id: string) => void, onCheckout: () => void }) {
  const [showPayment, setShowPayment] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  interface CartProps {
    isOpen: boolean
    onClose: () => void
    items: CartItem[]
    onRemoveItem: (id: string) => void
    onCheckout: () => void
  }

  const totalPrice: number = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  const handlePaymentSuccess = () => {
    onCheckout()
    setShowPayment(false)
  }

  useEffect(() => {
    if (showPayment) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
        })
        .catch((err) => {
          console.error('Failed to create payment intent:', err)
        })
    }
  }, [showPayment, totalPrice])

  if (!isOpen) return null

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as 'stripe',
    },
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6 transform transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {items.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between animate-fadeIn">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-6">
                <span className="font-bold">Total:</span>
                <span className="font-bold">Rs.{totalPrice.toFixed(2)}</span>
              </div>
              {showPayment ? (
                clientSecret ? (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm onPaymentSuccess={handlePaymentSuccess} amount={totalPrice} />
                  </Elements>
                ) : (
                  <div className="text-center py-4">Loading payment form...</div>
                )
              ) : (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105"
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        )}
      </div>
    </>
  )
}

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>(medicineData)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Filter medicines based on search query
  useEffect(() => {
    const filtered = medicineData.filter((medicine) => 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setMedicines(filtered)
  }, [searchQuery])

  // Add to cart function
  const addToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id)
      if (existingItem) {
        return prevCart.map((item) => 
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...medicine, quantity: 1 }]
    })
  }

  // Remove from cart function
  const removeFromCart = (medicineId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== medicineId))
  }

  // Checkout function
  const handleCheckout = () => {
    alert('Thank you for your order! This is a demo application.')
    setCart([])
    setIsCartOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Animated Floating Icons */}
      <div className="fixed w-full h-full pointer-events-none z-0">
        <FloatingIcon Icon={Pill} className="top-20 left-10 text-blue-400" animationDelay="0s" />
        <FloatingIcon Icon={FirstAid} className="top-40 right-20 text-red-400" animationDelay="2s" />
        <FloatingIcon Icon={Stethoscope} className="bottom-40 left-1/4 text-green-400" animationDelay="4s" />
        <FloatingIcon Icon={Heart} className="top-1/3 left-1/3 text-pink-400" animationDelay="6s" />
        <FloatingIcon Icon={Thermometer} className="bottom-1/4 right-1/4 text-purple-400" animationDelay="8s" />
        <FloatingIcon Icon={Droplets} className="top-1/4 right-1/3 text-cyan-400" animationDelay="10s" />
        <FloatingIcon Icon={Tablets} className="bottom-1/3 left-20 text-indigo-400" animationDelay="12s" />
        <FloatingIcon Icon={Syringe} className="top-2/3 right-40 text-teal-400" animationDelay="14s" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 transform hover:scale-105 transition-transform">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for medicines by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
            />
          </div>
        </div>

        {/* Medicine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicines.map((medicine, index) => (
            <div
              key={medicine.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-blue-500 font-medium mb-2 inline-block">
                  {medicine.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{medicine.name}</h3>
                <p className="text-gray-600 mb-4">{medicine.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">Rs.{medicine.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(medicine)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm animate-bounce">
              {cart.length}
            </span>
          )}
        </button>

        {/* Cart Component */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
