import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior caso exista:

      // União do caminho ~/tmp com nome do avatar de usuário
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Busca se existe avatar no caminho especificado acima
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // Deleta avatar existente
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Adiciona novo avatar
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
