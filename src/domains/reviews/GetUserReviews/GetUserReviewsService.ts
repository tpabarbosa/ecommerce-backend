import { GetUserReviewsDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';
import PaginationHelper from '../../../helpers/PaginationHelper';
import Review from '../entities/Review';

export type GetUserReviewsServiceReturn = {
  average_rate: number;
  count: number;
  userReviews: Review[];
};

export default class GetUserReviewsService extends BaseService<
  [Review],
  GetUserReviewsDTO
> {
  public async executer(
    data: GetUserReviewsDTO
  ): Promise<GetUserReviewsServiceReturn> {
    const [userReviews, count] = await this.repository.review.findAndCount({
      ...PaginationHelper.find(data),
      where: { user_id: data.user_id },
      relations: { user: true, product: true },
    });

    const { average_rate } = await this.repository.review
      .createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .where('reviews.rating IS NOT NULL')
      .andWhere('reviews.user_id = :value', { value: data.user_id })
      .select('AVG(reviews.rating)', 'average_rate')
      .getRawOne();

    return { average_rate, count, userReviews };
  }
}
