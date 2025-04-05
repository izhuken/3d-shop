export const EventTypes = {
  trafficSurge: 'Всплекс трафика',
  brokenCashbox: 'Поломка кассы',
  shelfBlock: 'Запрет стеллажа',
};
export const KVEvents = Array.from(Object.entries(EventTypes)).map(
  ([value, label]) => ({
    value,
    label,
  })
);
export interface NewEvent {}
