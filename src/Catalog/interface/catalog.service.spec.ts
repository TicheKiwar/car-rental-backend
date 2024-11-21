import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Vehicles } from '../../entity/Vehicles.entity';
import { Model } from '../../entity/Model.entity';
import { Brand } from '../../entity/Brand.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CatalogService } from './Catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let catalogRepository: Repository<Vehicles>;
  let modelRepository: Repository<Model>;
  let brandRepository: Repository<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: getRepositoryToken(Vehicles),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Model),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Brand),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
    catalogRepository = module.get<Repository<Vehicles>>(getRepositoryToken(Vehicles));
    modelRepository = module.get<Repository<Model>>(getRepositoryToken(Model));
    brandRepository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(catalogRepository).toBeDefined();
    expect(modelRepository).toBeDefined();
    expect(brandRepository).toBeDefined();
  });

  describe('getModel', () => {
    it('should return a list of models', async () => {
      const mockModels: Model[] = [
        {
          modelId: 1,
          modelName: 'Model A',
          year: 2020,
          brand: {
            brandId: 1,
            brandName: 'Brand A',
            models: [],
            deleteDate:null,
          },
          deleteDate: null,
          vehicles: [],
        },
      ];
      jest.spyOn(modelRepository, 'find').mockResolvedValue(mockModels);
  
      const result = await service.getModel();
      expect(result).toEqual(mockModels);
      expect(modelRepository.find).toHaveBeenCalledWith({ where: { deleteDate: null } });
    });
  });
  

  describe('getBrand', () => {
    it('should return a list of brands', async () => {
      const mockBrands = [{ brandId: 1, brandName: 'Brand A', deleteDate: null, models:[] }];
      jest.spyOn(brandRepository, 'find').mockResolvedValue(mockBrands);

      const result = await service.getBrand();
      expect(result).toEqual(mockBrands);
      expect(brandRepository.find).toHaveBeenCalledWith({ where: { deleteDate: null } });
    });
  });

  describe('getCatalog', () => {
    it('should return a list of vehicles with relations', async () => {
        const mockCatalog = [
            {
              vehicleId: 1,
              licensePlate: 'ABC123',
              type: 'SUV',
              status: 'available',
              dailyRate: "",
              capacity: 4,
              color: 'red',
              doorCount: 4,
              maxSpeed: 200,
              fuelType: "",
              transmission: "",
              deleteDate: null,
              mileage: 3,
              lastRevisionDate: "",
              registrationDate: "",
              costDayDelay: "32",
              reservations: [],
              model: {
                modelId: 1,
                modelName: 'Model A',
                year: 2023, // Add year property
                vehicles: [], // Add vehiclests property (assuming it's an array)
                brand: { 
                  brandId: 1, 
                  brandName: 'Brand A', 
                  models: [] ,
                  deleteDate: null,
                },
                deleteDate: null,
              },
            },
          ];
      jest.spyOn(catalogRepository, 'find').mockResolvedValue(mockCatalog);

      const result = await service.getCatalog();
      expect(result).toEqual(mockCatalog);
      expect(catalogRepository.find).toHaveBeenCalledWith({
        select: expect.any(Object),
        where: { deleteDate: null },
        relations: ['model', 'model.brand'],
      });
    });
  });

  describe('findByVehicle', () => {
    it('should return a vehicle by ID', async () => {
        const mockVehicle = 
            {
              vehicleId: 1,
              licensePlate: 'ABC123',
              type: 'SUV',
              status: 'available',
              dailyRate: "",
              capacity: 4,
              color: 'red',
              doorCount: 4,
              maxSpeed: 200,
              fuelType: "",
              transmission: "",
              deleteDate: null,
              mileage: 3,
              lastRevisionDate: "",
              registrationDate: "",
              costDayDelay: "32",
              reservations: [],
              model: {
                modelId: 1,
                modelName: 'Model A',
                year: 2023, // Add year property
                vehicles: [], // Add vehiclests property (assuming it's an array)
                brand: { 
                  brandId: 1, 
                  brandName: 'Brand A', 
                  models: [] ,
                  deleteDate: null,
                },
                deleteDate: null,
              },
            }
      jest.spyOn(catalogRepository, 'findOne').mockResolvedValue(mockVehicle);

      const result = await service.findByVehicle(1);
      expect(result).toEqual(mockVehicle);
      expect(catalogRepository.findOne).toHaveBeenCalledWith({
        where: { vehicleId: 1, deleteDate: null },
        relations: ['model', 'model.brand'],
      });
    });
  });

  describe('findByModel', () => {
    it('should return a model by ID', async () => {
      const mockModel = {
        modelId: 1,
        modelName: 'Model A',
        year:2023,
        brand:{brandId: 1,
            brandName: 'Brand A',
            models: [],
            deleteDate:null,},
        vehicles: [{ vehicleId: 1,
            licensePlate: 'ABC123',
            type: 'SUV',
            status: 'available',
            dailyRate: "",
            capacity: 4,
            color: 'red',
            doorCount: 4,
            maxSpeed: 200,
            fuelType: "",
            transmission: "",
            deleteDate: null,
            mileage: 3,
            lastRevisionDate: "",
            registrationDate: "",
            costDayDelay: "32",
            reservations: [],
            model: {
              modelId: 1,
              modelName: 'Model A',
              year: 2023, // Add year property
              vehicles: [], // Add vehiclests property (assuming it's an array)
              brand: { 
                brandId: 1, 
                brandName: 'Brand A', 
                models: [] ,
                deleteDate: null,
              },
              deleteDate: null,
            },
          }],
          deleteDate:null,
      };
      jest.spyOn(modelRepository, 'findOne').mockResolvedValue(mockModel);

      const result = await service.findByModel(1);
      expect(result).toEqual(mockModel);
      expect(modelRepository.findOne).toHaveBeenCalledWith({
        where: { modelId: 1, deleteDate: null },
        relations: ['vehicles'],
      });
    });
  });

  describe('findByBrand', () => {
    it('should return a brand by ID', async () => {
      const mockBrand = { brandId: 1, brandName: 'Brand A', models:[], deleteDate:null };
      jest.spyOn(brandRepository, 'findOne').mockResolvedValue(mockBrand);

      const result = await service.findByBrand(1);
      expect(result).toEqual(mockBrand);
      expect(brandRepository.findOne).toHaveBeenCalledWith({
        where: { brandId: 1, deleteDate: null },
      });
    });
  });
});
