import { useModalContext } from '@/lib';
import { useFetchReport } from '@/lib/api/reports';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { useParams } from 'react-router-dom';

interface GoodsReportProps {}

export const GoodsReport: React.FC<GoodsReportProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: report } = useFetchReport(id ?? '');
  const { resolve } = useModalContext();

  console.log(report);

  return (
    <div
      className={GoodsStyles.modalWrapper}
      onClick={(e) => e.currentTarget == e.target && resolve()}
    >
      <div className={GoodsStyles.createForm}>
        <h1>Отчет о продажах товаров</h1>

        <div className='table'>
          <div className='header'>
            <span>Позиция</span>
            <span>Кол-во продано</span>
          </div>

          <div className='body'>
            {report &&
              Array.from(Object.entries(report)).map(([name, value]) => (
                <div>
                  <span>{name}</span>
                  <span>{value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
