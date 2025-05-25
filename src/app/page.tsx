"use client"

import { Header  } from '../components/Header';
import { Converter } from '../components/Converter';
import { Features } from '../components/Features';

export default function Home() {
  return (
    <div>
      <Header />
      <Converter />
      <Features />
    </div>
  )
}
