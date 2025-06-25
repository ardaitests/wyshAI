import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FadeInImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Image+Not+Found';
          e.target.alt = 'Placeholder for missing image';
        }}
        className={`w-full h-full object-cover ${isLoaded ? 'block' : 'hidden'}`}
        {...props}
      />
    </motion.div>
  );
};

export default FadeInImage;
