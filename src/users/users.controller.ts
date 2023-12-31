import {Controller, Get, Post, Patch, Body, Param, Delete} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('cm-project')
export class UsersController {
   constructor(private readonly service: UsersService) {}

    @Post('users')
    createUser(@Body() body: any){
       return this.service.createUser(body)
    }

    @Patch('users')
    updateUsersInfos(@Body() body: any){
       return this.service.updateUsersInfo(body)
    }

    @Delete('users')
    deleteUser(@Body() body: any){
       return this.service.deleteUser(body)
    }

    @Get('users')
    getActiveUsers(){
        return this.service.getActiveUsers()
    }
}
