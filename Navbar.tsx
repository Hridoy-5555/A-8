"use client";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as HeroUILink, 
  Button, 
  Avatar, 
  Input 
} from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import data from "@/data.json";
import { motion, AnimatePresence } from "framer-motion";

export default function AppNavbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return data.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ];

  if (session) {
    navLinks.push({ name: "My Profile", href: "/profile" });
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <Navbar 
      isBordered 
      maxWidth="xl" 
      className="sticky top-0 z-50"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarBrand className="sm:flex">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HeroUILink as={Link} href="/" className="font-bold text-xl md:text-2xl text-primary">
            SkillSphere
          </HeroUILink>
        </motion.div>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.name}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <HeroUILink as={Link} color="foreground" href={link.href}>
                {link.name}
              </HeroUILink>
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem className="hidden sm:flex">
          <div className="relative" ref={searchRef}>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[14rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search courses..."
              size="sm"
              startContent={<Search size={18} />}
              type="search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
            />
            <AnimatePresence>
              {isSearchFocused && searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 w-[300px] mt-2 bg-white dark:bg-content1 border border-divider rounded-xl shadow-2xl z-[100] overflow-hidden py-2"
                >
                  {searchResults.map((course) => (
                    <Link 
                      key={course.id} 
                      href={`/courses/${course.id}`}
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                      className="block px-4 py-2 hover:bg-default-100 transition-colors"
                    >
                      <div className="font-bold text-sm text-foreground truncate">{course.title}</div>
                      <div className="text-xs text-default-500">By {course.instructor}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </NavbarItem>
        {isPending ? (
          <NavbarItem>
            <div className="w-8 h-8 rounded-full bg-default-200 animate-pulse" />
          </NavbarItem>
        ) : session ? (
          <div className="flex items-center gap-4">
            <NavbarItem>
              <HeroUILink as={Link} href="/profile">
                <Avatar
                  isBordered
                  color="primary"
                  size="sm"
                  src={session.user.image || ""}
                  name={session.user.name}
                />
              </HeroUILink>
            </NavbarItem>
            <NavbarItem>
              <Button 
                color="danger" 
                variant="flat" 
                size="sm" 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Log Out
              </Button>
            </NavbarItem>
          </div>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} href="/login" variant="light">Login</Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {navLinks.map((link, index) => (
          <NavbarMenuItem key={`${link.name}-${index}`}>
            <HeroUILink
              as={Link}
              className="w-full"
              color="foreground"
              href={link.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </HeroUILink>
          </NavbarMenuItem>
        ))}
        {session && (
           <NavbarMenuItem>
              <Button
                className="w-full justify-start text-danger px-0"
                variant="light"
                color="danger"
                size="lg"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Log Out
              </Button>
           </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}