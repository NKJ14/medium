import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify,sign,decode} from 'hono/jwt';
export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      const body = await c.req.json();
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
  
      const jwt = await sign({
        id:user.id
      },c.env.JWT_SECRET);
  
  
      return c.text(jwt);
    } catch(e){
      console.log(e);
      c.status(411);
      return c.text("User already exists...Invalid inputs.");
    }
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try{
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
      where:{
        email: body.email,
        password: body.password,
        name: body.name
      }
    });
    if(!user){
      c.status(403);
      return c.text('Unauthorized.');
    };
  
    const jwt = await sign({
      id:user.id
    },c.env.JWT_SECRET);
  
  
    return c.text(jwt);
  } catch(e){
    console.log(e);
    c.status(411);
    return c.text("User doesn't exist...Invalid inputs.");
  }
  })