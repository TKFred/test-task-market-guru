import { Controller, Get, Put, Param, UseGuards, Body, Delete, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDto } from '../users/dto/user.dto';
import { FilterDto } from './dto/filter.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll() {
        return await this.usersService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.usersService.getOne(id);
    }

    // TODO тут надо прям с фронта с %<value>% передавать пока
    @UseGuards(AuthGuard('jwt'))
    @Post('search')
    async search(@Body() filter: FilterDto) {
        return await this.usersService.search(filter);
    }

    // TODO это бы в auth сделать по-хорошему, но логику постановки я не до конца понял, так что делаем тут
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UserDto): Promise<any> {
        return await this.usersService.updateOne(id, user);
    }

    // TODO тут кстати можно удалить себя, а потом с тем же токеном пытаться залогиниться, но гард скажет что низя
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.usersService.deleteOne(id);
    }
}