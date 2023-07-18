import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}