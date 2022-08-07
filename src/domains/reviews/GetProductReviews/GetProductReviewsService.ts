import { GetProductReviewsDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';
import PaginationHelper from '../../../helpers/PaginationHelper';
import Review from '../entities/Review';

export type GetProductReviewsServiceReturn = {
  average_rate: number;
  count: number;
  productReviews: Review[];
};

export default class GetProductReviewsService extends BaseService<
  [Review],
  GetProductReviewsDTO
> {
  public async executer(
    data: GetProductReviewsDTO
  ): Promise<GetProductReviewsServiceReturn> {
    const where = data.product_id
      ? { product_id: data.product_id }
      : { slug: data.slug };

    const [productReviews, count] = await this.repository.review.findAndCount({
      ...PaginationHelper.find(data),
      where,
      relations: { product: true, user: true },
    });

    const whereQuery = data.product_id
      ? 'reviews.product_id = :value'
      : 'product.slug = :value';
    const value = data.product_id ? data.product_id : data.slug;

    const { average_rate } = await this.repository.review
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.product', 'product')
      .where('reviews.rating IS NOT NULL')
      .andWhere(whereQuery, { value })
      .select('AVG(reviews.rating)', 'average_rate')
      .getRawOne();

    return { average_rate, count, productReviews };
  }
}
