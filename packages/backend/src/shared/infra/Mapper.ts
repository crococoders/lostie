export interface Mapper<T> {
  toDomain(dto: any): T;
  toPersistence(domainModel: T): any;
}
