import { getMongoRepository, MongoRepository } from 'typeorm';

import iNotificationsRepository from '../../../repositories/iNotificationsRepository';
import ICreateNotificationDto from '../../../dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements iNotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDto): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
