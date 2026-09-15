"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Cart } from "../cart";
import { ComprasIcon, useComprasClick } from "../compras-icon";

interface HeaderProps {
  withCart: boolean;
}

const Header = ({ withCart }: HeaderProps) => {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  const handleComprasClick = useComprasClick();

  const handleLogIn = () => {
    router.push("/authentication");
  };

  return (
    <div className="bg-accent px-2">
      <header className="flex items-center justify-between p-3">
        <Link className="hover:opacity-50" href="/" aria-label="Logo Zarpdon">
          <Image
            src="/zpd_logo.svg"
            alt="Logo Zarpdon"
            width={30}
            height={26}
          />
        </Link>
        <div className="flex items-center gap-5">
          {withCart && <Cart />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5">
                {session?.user ? (
                  <>
                    <div className="flex justify-between space-y-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                    <div>
                      <SheetClose asChild>
                        <span>
                          <ComprasIcon onClick={handleComprasClick} />
                        </span>
                      </SheetClose>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <SheetClose asChild>
                      <h2
                        className="font-semibold hover:cursor-pointer"
                        onClick={handleLogIn}
                      >
                        Fazer login
                      </h2>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        className="hover:cursor-pointer"
                        size="icon"
                        asChild
                        variant="outline"
                        onClick={handleLogIn}
                      >
                        <span>
                          <LogInIcon />
                        </span>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Header;
