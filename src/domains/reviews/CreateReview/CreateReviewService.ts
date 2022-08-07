import Review from '../entities/Review';

import { CreateReviewDTO } from '.';
import ReviewAlreadyExists from '../errors/ReviewAlreadyExists';
import BaseService from '../../../baseClasses/BaseService';

export default class CreatereviewService extends BaseService<
  [Review],
  CreateReviewDTO
> {
  public async executer(data: CreateReviewDTO): Promise<Review> {
    const hasReview = await this.repository.review.findOne({
      where: { product_id: data.product_id, user_id: data.user_id },
    });

    if (hasReview) {
      throw new ReviewAlreadyExists();
    }
    const review = this.repository.review.create({ ...data });

    await this.repository.review.save(review);

    return review;
  }
}
