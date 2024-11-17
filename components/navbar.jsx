import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogIn, Search, ShoppingCart, CircleUser, User, LogOut, Settings } from 'lucide-react'
import { ModeToggle } from './toggleMode'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signIn, signOut } from 'next-auth/react'

const courses = [
  {
    title: "All Courses",
    href: "/courses",
    description: "Review our courses and which will benefit your career.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function Navbar({ cart, removeFromCart, clearCart, user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [decodedUser, setDecodedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch('/api/auth/verify-token', {
          headers: {
            'Authorization': `Bearer ${user.value}`
          }
        });
        const data = await response.json();
        if (data.isValid) {
          setDecodedUser(data.user);
        } else {
          logout(); // Automatically log out if token is invalid
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        logout();
      } finally {
        setIsLoading(false); // Stop loading after verification
      }
    };

    if (user.value) {
      fetchUser();
    } else {
      setIsLoading(false); // No user, stop loading
    }
  }, [user.value]);



  const handleSearch = (e) => {
    e.preventDefault()
    // Implement your search logic here
    console.log('Searching for:', searchQuery)
  }

  const navItems = [
    { name: 'Courses', href: '/courses' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  const cartItems = Object.values(cart)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0)

  const renderAuthSection = () => {
    if (isLoading || status === "loading") {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
      );
    }

    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image} alt={session.user.name} />
                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">{session.user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-bold">{session.user.name}</span>
                <span className="text-sm text-muted-foreground">{session.user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/student/dashboard" className="flex w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (decodedUser) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full hidden md:block">
              <Avatar>
                <AvatarImage src={decodedUser.profilePic} alt={decodedUser.name} />
                <AvatarFallback>{decodedUser.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{decodedUser.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/student/dashboard'} title='Student Dashboard'>
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/profile/${decodedUser.slug}`} title='Profile'>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <>
        <div className="hidden md:block">
          <Link href={'/join/login'}>
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
        </div>
        <div className="hidden md:block">
          <Link href={'/join/signup'} className={buttonVariants({ size: "sm" })}>
            Sign up
          </Link>
        </div>
      </>
    );
  };


  return (
    <nav className="bg-background shadow-lg dark:shadow-gray-800">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Links */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-lg">LOGO</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {courses.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Search Bar, Dark Mode Toggle, Cart, and Login */}
          <div className="flex items-center space-x-2 ml-auto">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-sm">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-gray-500 dark:border-gray-400"
              />
              <Button type="submit" size="icon" className="">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>

            <ModeToggle />

            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Open cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground rounded-full text-xs px-2">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Shopping Cart</DialogTitle>
                  <DialogDescription>
                    Review your items before checkout.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                {cartItems.length > 0 && (
                  <>
                    <div className="mt-4 flex justify-between">
                      <span>Total:</span>
                      <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="mt-6 space-y-2">
                      <Link href={'/checkout'} title='Checkout'><Button className="w-full">Checkout</Button></Link>
                      <Button variant="outline" className="w-full" onClick={clearCart}>
                        Clear Cart
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {renderAuthSection()}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="outline" size="icon" onClick={toggleSidebar}>
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-background shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <div className="px-4 py-2">
          <form onSubmit={handleSearch} className="flex items-center mb-4">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={toggleSidebar}
              >
                {item.name}
              </Link>
            ))}
            {!session && !decodedUser && (
              <>
                <div className='py-10'>
                  <Link href={'/join/login'}>
                    <Button onClick={() => {
                      setIsOpen(false);
                  }} className="w-full justify-center" variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                  </Link>
                  <div className='mt-3'>
                    <Link href={'/join/signup'}>
                      <Button onClick={() => setIsOpen(false)} className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {session && (
              <>
                <div className='py-10'>
                  <Link href={`/profile/${session.user.id}`}>
                    <Button onClick={() => setIsOpen(false)} className="w-full justify-center" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <div className='mt-3'>
                    <Button variant="destructive" onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }} className="w-full justify-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </>
            )}
            {decodedUser && (
              <>
                <div className='py-10'>
                  <Link href={`/profile/${decodedUser.slug}`}>
                    <Button onClick={() => setIsOpen(false)} className="w-full justify-center" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <div className='mt-3'>
                    <Button variant="destructive" onClick={() => {
                      setIsOpen(false);
                      logout();
                    }} className="w-full justify-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}