export interface IModelRepository {
    getAllModels();
    getModelById(id: number);
    createModel(modelData: any);
    updateModel(id: number, modelData: any);
    deleteModel(id: number);
  }
  