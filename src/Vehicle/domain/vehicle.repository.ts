export interface IVehiclesRepository {
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>; 
    remove(id: number): Promise<any>;
  }
  