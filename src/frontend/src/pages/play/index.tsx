import { ControlPlane, SimulationCanvas, WithLoader } from '@/components';
import { SimulationEventBox } from '@/components/sim/event-box';
import { SimulationOptionsBox } from '@/components/sim/options-box';
import { SimulationTitle } from '@/components/sim/titile';
import { useFetchShopDetails } from '@/lib';
import { useFetchSimulation } from '@/lib/api/simulation';
import { ShopCreateStyles } from '@/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

interface SimulationPlayProps {}

export const SimulationPlay: React.FC<SimulationPlayProps> = () => {
  const { id: shopId } = useParams<{ id: string }>();
  const { data: shop, isLoading } = useFetchShopDetails(shopId ?? '');
  const { data: sim, isLoading: simLoading } = useFetchSimulation(shopId ?? '');

  return (
    <>
      <Helmet>
        <title>Симуляция | Dev lav</title>
      </Helmet>
      <main className={ShopCreateStyles.mainCanvas}>
        <WithLoader isLoading={isLoading || simLoading}>
          <SimulationTitle title={shop?.name} />
          <SimulationOptionsBox
            close_at={shop?.close_at}
            open_at={shop?.open_at}
            userPerDay={shop?.data?.users_per_day}
          />
          <SimulationEventBox />
          <ControlPlane />
          <SimulationCanvas />
        </WithLoader>
      </main>
    </>
  );
};
