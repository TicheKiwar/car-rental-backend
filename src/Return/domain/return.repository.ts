export interface IReturnsRepository {
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(data: any): Promise<any>;
  }
  