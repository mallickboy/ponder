
// src/components/HeaderWrapper.js
'use client';

import Header from '@/components/Header';

export default function HeaderWrapper({ user }) {
  return (
    <Header 
      user_name={user.name}
    />
  );
}