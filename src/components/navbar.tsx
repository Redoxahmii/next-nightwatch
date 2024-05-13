"use client";
import { ThemeSwitcher } from "./theme-switcher";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Link as RouterLink,
  DropdownItem,
  Avatar,
  DropdownSection,
  NavbarMenuToggle,
  NavbarMenu,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import Link from "next/link";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      classNames={{
        base: "relative",
        wrapper: "absolute top-0",
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        className="sm:hidden "
        aria-label={isMenuOpen ? "closemenu" : "open menu"}
      />
      <NavbarBrand>
        <Button
          variant="light"
          color="secondary"
          className=" font-semibold text-secondary-600 text-large"
        >
          NightWatch
        </Button>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <RouterLink
                isBlock
                size="md"
                color="foreground"
                className="cursor-pointer"
              >
                Movies
              </RouterLink>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Movies Actions"
              color="secondary"
              variant="light"
            >
              <DropdownSection title="Categories">
                <DropdownItem as={Link} href="/movies/popular">
                  Popular
                </DropdownItem>
                <DropdownItem as={Link} href="/movies/toprated">
                  Top Rated
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <RouterLink
                isBlock
                size="md"
                color="foreground"
                className="cursor-pointer"
              >
                TV Shows
              </RouterLink>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="TvShows"
              color="secondary"
              variant="light"
            >
              <DropdownSection title="Categories">
                <DropdownItem as={Link} href="/tvshows/popular">
                  Popular
                </DropdownItem>
                <DropdownItem as={Link} href="/tvshows/toprated">
                  Top Rated
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        {/* <NavbarItem> */}
        {/*   <ThemeSwitcher /> */}
        {/* </NavbarItem> */}
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                showFallback
                size="sm"
              ></Avatar>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Actions"
              color="secondary"
              variant="light"
            >
              <DropdownItem
                startContent={<LogIn size={18} />}
                as={Link}
                href="/login"
              >
                Login
              </DropdownItem>
              <DropdownItem
                startContent={<UserPlus size={18}></UserPlus>}
                // showDivider={username ? true : false}
                as={Link}
                href="/signup"
              >
                Signup
              </DropdownItem>
              {/* {username && ( */}
              {/*   <DropdownSection title="User"> */}
              {/*     <DropdownItem */}
              {/*       className="pointer-events-none" */}
              {/*       startContent={<User size={18} />} */}
              {/*       textValue={username} */}
              {/*     > */}
              {/*       <p className=" font-bold">Signed in as {username}</p> */}
              {/*     </DropdownItem> */}
              {/*     <DropdownItem */}
              {/*       textValue="Logout" */}
              {/*       startContent={<LogOut size={18} />} */}
              {/*       onPress={() => logout()} */}
              {/*     > */}
              {/*       Logout */}
              {/*     </DropdownItem> */}
              {/*   </DropdownSection> */}
              {/* )} */}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuContent />
    </Navbar>
  );
};

export default Nav;

const NavbarMenuContent = () => {
  return (
    <NavbarMenu>
      <Accordion>
        <AccordionItem title="Movies">
          <div className=" flex flex-col gap-2">
            <Link href="/movies/popular">Popular</Link>
            <Link href="/movies/toprated">Top Rated</Link>
          </div>
        </AccordionItem>
        <AccordionItem title="Shows">
          <div className=" flex flex-col gap-2">
            <Link href="/tvshows/popular">Popular</Link>
            <Link href="/tvshows/toprated">Top Rated</Link>
          </div>
        </AccordionItem>
      </Accordion>
    </NavbarMenu>
  );
};
