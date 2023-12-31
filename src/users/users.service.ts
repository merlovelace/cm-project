import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {createUserDto, updateUserDto, updateUsersStatusDto} from "../dtos/userDto";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {
    }

    async createUser(body: createUserDto) {
        try {
            const isEmailExist = await this.prisma.user.findFirst({
                where: {
                    email: body.email,
                }
            })

            if(isEmailExist){
                throw new HttpException('Girdiğiniz email sistemde bulunmaktadır', HttpStatus.BAD_REQUEST)
            }

            const isUsernameExist = await this.prisma.user.findFirst({
                where: {
                    username: body.username,
                    isDeleted: false
                }
            })

            if(isUsernameExist){
                throw new HttpException('Girdiğiniz kullanıcı adı sistemde bulunmaktadır', HttpStatus.BAD_REQUEST)
            }

            const newUser = await this.prisma.user.create({
                data: {
                    name: body.name,
                    lastName: body.lastName,
                    email: body.email,
                    username: body.username
                }
            })

            return newUser

        } catch (e) {
            console.log(e);
            throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: e,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: e,
                },
            );
        }
    }

    async updateUsersInfo(body: updateUserDto) {
        try {
            const isUserExist = await this.prisma.user.findUnique({
                where: {
                    id: body.userId,
                    isDeleted: false
                }
            })

            if(!isUserExist){
                throw new HttpException('Kullanıcı sistemde bulunamadı',HttpStatus.NOT_FOUND)
            }

            if(body.email){
                const emailExist = await this.prisma.user.findFirst({
                    where: {
                        email: body.email
                    }
                })

                if(emailExist){
                    throw new HttpException('Girdiğiniz email sistemde bulunmaktadır, lütfen başka bir email ile deneyiniz.',HttpStatus.BAD_REQUEST)
                }
            }

            if(body.username){
                const usernameExist = await this.prisma.user.findFirst({
                    where: {
                        username: body.username
                    }
                })

                if(usernameExist){
                    throw new HttpException('Girdiğiniz kullanıcı adı sistemde bulunmaktadır, lütfen başka bir kullanıcı adı ile deneyiniz.',HttpStatus.BAD_REQUEST)
                }
            }

            await this.prisma.user.update({
                where: {
                    id: isUserExist.id
                },
                data: {
                    name: body.name ? body.name : isUserExist.name,
                    lastName: body.lastName ? body.lastName : isUserExist.lastName,
                    email: body.email ? body.email : isUserExist.email,
                    username: body.username ? body.username : isUserExist.username,
                }
            })


        } catch (e) {
            console.log(e);
            throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: e,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: e,
                },
            );
        }
    }

    async deleteUser(body: updateUsersStatusDto) {
        try {
            const isUserIdBelongsToAnyUser = await this.prisma.user.findUnique({
                where: {
                    id: body.userId,
                }
            })

            if(!isUserIdBelongsToAnyUser){
                throw new HttpException('Kullanıcı sistemde bulunamadı',HttpStatus.NOT_FOUND)
            }

            await this.prisma.user.update({
                where: {
                    id: isUserIdBelongsToAnyUser.id
                },
                data: {
                    isDeleted: body.isDeleted
                }
            })


        } catch (e) {
            console.log(e);
            throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: e,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: e,
                },
            );
        }
    }

    async getActiveUsers() {
        try {
            return await this.prisma.user.findMany({
                where: {
                    isDeleted: false
                }
            })

        } catch (e) {
            console.log(e);
            throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: e,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: e,
                },
            );
        }
    }
}
