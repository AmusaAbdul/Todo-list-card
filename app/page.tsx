"use client"

import Header from "./Component/Header"
import Greetings from "./Component/Greetings"
import List from "./Component/List"
import Footer from "./Component/Footer"

export default function Home() {
  return (
    <div>
      <Header />
      <Greetings />
      <List />
      <Footer />
    </div>
  );
}