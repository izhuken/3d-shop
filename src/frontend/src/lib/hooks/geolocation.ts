import { useEffect, useState } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Coords | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setLocation(() => {
          return { longitude, latitude };
        });
      },
    );
  }, [location]);

  return location;
};
