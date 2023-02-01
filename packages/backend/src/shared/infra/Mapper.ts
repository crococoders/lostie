export interface Mapper<T> {
  toDomain(dto: any): T;
  toDTO(domainModel: T): any;
  toPersistence(domainModel: T): any;
}
