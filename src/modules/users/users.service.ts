import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from 'src/core/database/constants';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FilterDto } from './dto/filter.dto';
const { Op } = require("sequelize");

@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneByPhone(phone: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { phone } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

    async checkUnique(user: UserDto) {
        const conditions = [];

        if (user.name) conditions.push({ name: user.name });
        if (user.email) conditions.push({ email: user.email });
        if (user.phone) conditions.push({ phone: user.phone });

        const found = await this.userRepository.findOne({
            where: {
                [Op.or]: conditions
            }
        });

        return found;
    }

    async getAll() {
        return await this.userRepository.findAll<User>();
    }

    async getOne(id: number) {
        return await this.userRepository.findOne<User>({ where: { id } })
    }

    async updateOne(id: number, data: UserDto) {
        // Тут тоже пароль зашифруем чтобы никто не узнал, но вообще это не тут надо делать имхо
        data = { ...data, password: await bcrypt.hash(data.password, 10) }
        return await this.userRepository.update<User>({ ...data }, { where: { id } });
    }

    async deleteOne(id: number) {
        return await this.userRepository.destroy({ where: { id } });
    }

    async search(filter: FilterDto) {
        const conditions = {};
        if (filter.name) conditions['name'] = { [Op.iLike]: filter.name };
        if (filter.email) conditions['email'] = { [Op.iLike]: filter.email };
        if (filter.phone) conditions['phone'] = { [Op.iLike]: filter.phone };

        return await this.userRepository.findAll({
            where: conditions
        })
    }
}