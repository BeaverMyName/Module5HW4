import ISupportDTO from './SupportDTO';

interface IResponse<T> {
    page: number,
    per_page: number,
    total: number,
    total_page: number,
    data: T
    support: ISupportDTO
}

export default IResponse;