"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as HeroUILink, Button, Avatar, Input } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import data from "@/data.json";

export default function AppNavbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
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
    <Navbar isBordered maxWidth="xl" className="sticky top-0 z-50">
      <NavbarBrand>
        <HeroUILink as={Link} href="/" className="font-bold text-2xl text-primary">
          SkillSphere
        </HeroUILink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.name}>
            <HeroUILink as={Link} color="foreground" href={link.href}>
              {link.name}
            </HeroUILink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem className="hidden md:flex">
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
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full right-0 w-[300px] mt-2 bg-white dark:bg-content1 border border-divider rounded-xl shadow-2xl z-[100] overflow-hidden py-2">
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
              </div>
            )}
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
              <Button color="danger" variant="flat" size="sm" onClick={handleLogout}>
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
    </Navbar>
  );
}