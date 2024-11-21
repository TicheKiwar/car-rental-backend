export interface IModelRepository {
  getModels();
  createModel(createModelDto: any);
  updateModel(id: number, updateModelDto: any);
  deleteModel(id: number);
}
