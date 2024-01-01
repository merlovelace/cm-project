import {Controller, Get, Post, Patch, Body, Param, Delete} from '@nestjs/common';
import {UsersService} from "./users.service";
import {createUserDto, updateUserDto, updateUsersStatusDto} from "../dtos/userDto";

@Controller('cm-project')
export class UsersController {
   constructor(private readonly service: UsersService) {}

    @Post('users')
    createUser(@Body() createUser: createUserDto){
       return this.service.createUser(createUser)
    }

    @Patch('users')
    updateUsersInfos(@Body() updateUser: updateUserDto){
       return this.service.updateUsersInfo(updateUser)
    }

    @Delete('users')
    deleteUser(@Body() updateUsersStatus: updateUsersStatusDto){
       return this.service.deleteUser(updateUsersStatus)
    }

    @Get('users')
    getActiveUsers(){
        return this.service.getActiveUsers()
    }
}
