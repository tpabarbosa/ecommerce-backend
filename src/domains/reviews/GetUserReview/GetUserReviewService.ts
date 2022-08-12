import { GetUserReviewDTO } from '.';
import BaseService from '../../../baseClasses/BaseService';
import Review from '../entities/Review';

export type GetUserReviewServiceReturn = {
  review: Review;
};

export default class GetUserReviewService extends BaseService<
  [Review],
  GetUserReviewDTO
> {
  public async executer(
    data: GetUserReviewDTO
  ): Promise<GetUserReviewServiceReturn> {
    const review = await this.repository.review.findOne({
      where: { user_id: data.user_id, product_id: data.product_id },
      relations: { user: true, product: true },
    });

    return { review };
  }
}
