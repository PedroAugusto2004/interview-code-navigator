import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModeToggle } from "@/components/ModeToggle";
import { NavLink } from "@/components/NavLink";
import { PatternSearch } from "@/components/PatternSearch";

const navigation = [
  { label: "Patterns", to: "/" },
  { label: "Trainer", to: "/trainer" },
  { label: "Daily Practice", to: "/daily" },
  { label: "Quizzes", to: "/quizzes" }
];

export const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <span className="text-primary">Pattern</span>
            <span>Navigator</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-muted-foreground transition hover:text-primary"
                activeClassName="text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Open search</span>
            </Button>
            <ModeToggle />
            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Navigate</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className="text-base font-semibold text-foreground"
                        activeClassName="text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                        {location.pathname === item.to && (
                          <span className="ml-2 text-xs uppercase text-primary">current</span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Search patterns instantly</DialogTitle>
          </DialogHeader>
          <PatternSearch />
        </DialogContent>
      </Dialog>
    </header>
  );
};

