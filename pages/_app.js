import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Header from "@/components/Admin/Header";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({ value: null });
  const [admin, setAdmin] = useState({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();

  const isTokenExpired = (token) => {
    if (!token) return true;
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const { exp } = JSON.parse(atob(base64)); // Decode JWT token safely
  
      return Date.now() >= exp * 1000; // Check if token is expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Consider the token expired if decoding fails
    }
  };
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(40);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });

    try {
      const cartFromCookies = Cookies.get('cart');
      if (cartFromCookies) {
        setCart(JSON.parse(cartFromCookies));
        saveCart(JSON.parse(cartFromCookies));
      }
    } catch (error) {
      console.error(error);
      Cookies.remove('cart');
    }

    const token = Cookies.get('token');
    if (token && !isTokenExpired(token)) {
      setUser({ value: token });
      setKey(Math.random());
      Cookies.set('token', token);
      console.log(user);

    } else {
      localStorage.removeItem('token');
      Cookies.remove('token');
      setUser({ value: null });
    }

    const admintoken = localStorage.getItem('admintoken');
    if (admintoken && !isTokenExpired(admintoken)) {
      setAdmin({ value: admintoken });
      setKey(Math.random());
      Cookies.set('admintoken', admintoken); // Set the admintoken in cookies
    } else {
      localStorage.removeItem('admintoken');
      Cookies.remove('admintoken'); // Remove the admintoken from cookies
      setAdmin({ value: null });
    }
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setUser({ value: null });
    setKey(Math.random());
  };

  const adminlogout = () => {
    localStorage.removeItem('admintoken');
    Cookies.remove('admintoken'); // Remove the admintoken from cookies
    setAdmin({ value: null });
    setKey(Math.random());
  };

  const saveCart = (myCart) => {
    Cookies.set('cart', JSON.stringify(myCart), { expires: 7 });
    setCart(myCart);
  };

  const addToCart = (courseId, title, price, image) => {
    let newCart = { ...cart };
    if (courseId in newCart) {
      newCart[courseId].qty += 1;
    } else {
      newCart[courseId] = { id: courseId, title, price, image, qty: 1 };
    }
    saveCart(newCart);
    console.log(newCart);

  };

  const removeFromCart = (courseId) => {
    let newCart = { ...cart };
    if (courseId in newCart) {
      if (newCart[courseId].qty > 1) {
        newCart[courseId].qty -= 1;
      } else {
        delete newCart[courseId];
      }
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    saveCart({});
  };

  const buyNow = (courseId, title, price, image) => {
    clearCart();
    addToCart(courseId, title, price, image);
    router.push('/checkout');
  };

  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <SessionProvider>
    <ThemeProvider attribute="class">
      {isAdminRoute ? (
        <Header adminLogout={adminlogout} admin={admin} key={key} />
      ) : (
        <Navbar
          logout={logout}
          user={user}
          key={key}
          cart={cart}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
        />
      )}
      <Component
        {...pageProps}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        buyNow={buyNow}
      />
      <Footer/>
      </ThemeProvider>
      </SessionProvider>
  );
}