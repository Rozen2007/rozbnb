import styled from "styled-components";
import { Home, Search, Heart, User } from "react-feather";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession, signOut } from "next-auth/client";
import {
  UserCircleIcon,
} from "@heroicons/react/solid";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [session] = useSession();

  return (
    <MobileNavDiv className={isOpen ? "open" : null}>
      <div
        className="toggle"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span></span>
      </div>
      <div className="items">
        <div
          onClick={() => router.push("/")}
          className={`item ${router.pathname === "/" ? "active" : null}`}
        >
          <Home /> Home
        </div>
        <div
          className={`item ${router.pathname === "/search" ? "active" : null}`}
        >
          <Search /> Explore
        </div>
        <div className="item">
          <Heart /> Wishlist
        </div>
        <div className="item">
           {session?.user ? <img src={session?.user?.image} alt={session?.user?.name} className="h-7 cursor-pointer rounded-full mr-[1.3rem]"  onClick={() => signOut()}/> :<UserCircleIcon className="h-7 cursor-pointer"onClick={() => router.push("/signin")} />}Profile
        </div>
      </div>
    </MobileNavDiv>
  );
}

const MobileNavDiv = styled.div`
  display: none;
  @media (max-width: 36rem) {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    color: #2e2e48;
    z-index: 99;
    .items {
      display: flex;
      pointer-events: none;
      opacity: 0;
      transform: translateX(3rem);
      flex-direction: column;
      gap: 0.5rem;
      background: rgba(249,220,155,0.5) ;
      backdrop-filter: blur(9px);
      color: #1e1e38;
      padding: 1rem 1.5rem 1rem 0.75rem;
      border-radius: 1rem 0 0 1rem;
      box-shadow: 0.5rem 0.5rem 1rem #0005;
      position: fixed;
      right: 0;
      bottom: 5.5rem;
      transition: all 0.2s;
      .item {
        display: flex;
        align-items: center;
        padding: 0.25rem 3rem 0.25rem 0.5rem;
        border-radius: 1rem;
        cursor: pointer;
        transition: background 0.2s;
        &:hover {
          background: #88a2;
        }
        &.active {
          color: #e0565b;
        }
        svg {
          margin-right: 1rem;
          width: 2rem;
        }
      }
    }
    .toggle {
      width: 3rem;
      height: 3rem;
      border-radius: 99px;
      background: #f9dc9b;
      box-shadow: 0 0.5rem 1rem #0002;
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      display: grid;
      place-items: center;
      transition: all 0.2s;
      cursor: pointer;
      z-index: 99;
      span {
        display: block;
        position: relative;
        height: 2px;
        width: 1.5rem;
        background: #fafafc;
        border-radius: 3px;
        transition: all 0.2s;
        &::before,
        &::after {
          position: absolute;
          content: "";
          height: 2px;
          width: 1.5rem;
          background: #fafafc;
          border-radius: 3px;
          transition: all 0.2s;
        }
        &::before {
          transform: translateY(-6px);
        }
        &::after {
          transform: translateY(6px);
        }
      }
    }
    &.open {
      .items {
        pointer-events: auto;
        opacity: 1;
        transform: translateX(0);
      }
      .toggle {

        span {
         
          &::before {
            background: #e0565b;
            transform: translate(0) rotate(45deg);
          }
          &::after {
            background:  #e0565b;
            transform: translate(0) rotate(-45deg);
          }
        }
      }
    }
  }
`;