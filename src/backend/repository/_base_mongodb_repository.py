# from mongoengine import Document
# from dto import ErrorDTO, SuccessDTO


# class MongoDBRepository():
#     model: Document

#     def create(self, data: dict):
#         insert_data = data.model_dump(exclude_unset=True)

#         # for key, value in insert_data.items():
#         #     if self.model._fields.get(key, False):
#         #         new_data = self.model( = value)
#         #     # new_data = self.model()
#         #         new_data.save()
#         # # for item in data:
#         # #     print(item)
#         # #     new_data = self.model(*item)
#         # #     new_data.save()
#         # new_data = self.model(data.replace(" ", ","))
#         # new_data.save()
#         return SuccessDTO(insert_data)
    
#     def delete(self, id: str):
#         data = self.model.objects(id=id).first()
#         if not data:
#             return ErrorDTO('Data not found', 404)
#         data.delete()
#         return SuccessDTO('Entity success deleted')
    
#     def get_by_id(self, id: str):
#         data = self.model.objects(id=id).first()
#         if not data:
#             return ErrorDTO('Data not found', 404)
#         return SuccessDTO(data)
    
#     def get_all(self):
#         data = self.model.objects()
#         return SuccessDTO(data)