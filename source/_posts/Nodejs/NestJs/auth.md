---
layout: post
title: auth in nestjs
tags: nestjs mongodb
---

# Auth in nestjs

## Use bcrypt to encryption password in backend
```shell
npm install --save @nestjs/passport passport passport-local
// types
npm install --save-dev @types/passport-local
// mongoose
npm install --save @nestjs/mongoose mongoose
npm install @types/bcrypt bcrypt
```

### [Usage](https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/)
```js
// UsersController
constructor(private readonly usersService: UsersService) {}
 @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(
      userName,
      hashedPassword,
    );
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username
    };
  }

// UsersService 
constructor(@InjectModel('user') private readonly userModel: Model<User>) {
async insertUser(userName: string, password: string) {
  const username = userName.toLowerCase();
  const newUser = new this.userModel({
    username,
    password,
  });
  await newUser.save();
  return newUser;
}
```