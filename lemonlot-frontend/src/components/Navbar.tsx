import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, User, LogOut, Shield, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { getUserInfo, hasPermission } from "@/lib/authUtil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Cars", href: "search-cars" },
  {
    name: "Manage Inventory",
    href: "/manage-inventory",
    requiredRole: "SELLER",
  },
  { name: "Transactions", href: "/transactions", requiredRole: "ADMIN" },
];

const Navbar: React.FC = () => {
  const [token, , removeToken] = useLocalStorage("auth_token", "");
  const userInfo = token ? getUserInfo(token) : null;
  const isLoggedIn = token !== "";
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  // Filter navigation links based on user role
  const filteredNavLinks = navLinks.filter(
    (link) =>
      !link.requiredRole ||
      hasPermission(userInfo?.role ?? null, link.requiredRole)
  );

  // Navigation Links Component
  const NavigationLinks: React.FC = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          {filteredNavLinks.map((link, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                href={link.href}
              >
                {link.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  // Mobile Menu Component
  const MobileMenu: React.FC = () => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <SheetHeader>
            <SheetDescription />
          </SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <NavigationMenu className="flex flex-col space-y-4">
            {filteredNavLinks.map((link, index) => (
              <NavigationMenuLink
                key={index}
                className="px-4 py-2 text-sm font-medium"
                href={link.href}
              >
                {link.name}
              </NavigationMenuLink>
            ))}
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    );
  };

  // User Menu Component
  const UserMenu: React.FC = () => {
    const handleEditProfile = () => {
      navigate(`/edit-user/${userInfo?.sub}`);
    };

    const handleViewTransactions = () => {
      navigate("/my-transactions");
    };

    return (
      <div className="flex flex-1 items-center justify-end space-x-2">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                Hello {userInfo?.role || "Guest"} {userInfo?.username || "User"}
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={handleEditProfile}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewTransactions}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>View my transactions</span>
              </DropdownMenuItem>
              {hasPermission(userInfo?.role ?? null, "ADMIN") && (
                <DropdownMenuItem onClick={() => navigate("/admin-portal")}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Portal</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
      <div className="container flex h-16 items-center px-8 sm:px-16">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              The Lemon Lot
            </span>
          </a>
          <NavigationLinks />
        </div>
        <MobileMenu />
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;