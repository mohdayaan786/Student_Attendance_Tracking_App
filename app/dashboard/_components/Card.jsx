"use client"; // Ensures this is a client component

import React, { useEffect, useState } from "react";

function Card({ icon, title, value }) {
  const [clientIcon, setClientIcon] = useState(null);

  useEffect(() => {
    setClientIcon(icon); // Ensures the icon is only set on the client
  }, [icon]);

  return (
    <div className="flex items-center gap-5 p-5 bg-sky-100 rounded-lg shadow-sm">
      <div className="p-2 h-10 w-10 rounded-full bg-white text-primary">
        {clientIcon}
        </div>
      <div>
        <h2 className="font-bold">{title}</h2>
        <h2 className="text-lg">{value}</h2>
      </div>
    </div>
  );
}

export default Card;
