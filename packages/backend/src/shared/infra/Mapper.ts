// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Mapper<T> {
  toDomain(dto: any): T;
  toDTO(domainModel: T): any;
  toPersistence(domainModel: T): any;
}
