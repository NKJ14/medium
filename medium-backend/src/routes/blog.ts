import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify,sign,decode} from 'hono/jwt';
import { createBloginput,updateBloginput } from '../zod';
export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
        id:string
    }
  }>();

blogRouter.use('/*', async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user =await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set('id', user.id);
        await next();
    }else{
        c.status(403);
        c.json({
            msg:"Not authorized. Maybe login?"
        });
    }
})

blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const body = await c.req.json();
        const {success} = createBloginput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({
            msg:"Incorrect inputs"
          });
        };
        const userId = c.get('id');
        const post = await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId: userId
            }
        })
        return c.json({
            id:post.id
        })
    } catch(e){
        c.status(411);
        return c.text('error happened. Uh-oh!');
    }
  });
  
  blogRouter.put('/update', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const body = await c.req.json();
        const {success} = updateBloginput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({
            msg:"Incorrect inputs"
          });
        };
        const post = await prisma.post.update({ 
            data:{
                title:body.title,
                content:body.content,
            },
            where:{
                id: body.id
            }
        })
        return c.json({
            id:post.id
        })
    } catch(e){
        c.status(411);
        return c.text('error happened. Uh-oh!');
    }
  });

  blogRouter.get('/bulk', async (c) => {    //to paginate ideally...
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const posts = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            posts
        })
    } catch(e){
        c.status(411);
        return c.text('error happened. Uh-oh!');
    }
  });
  
  blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const id = c.req.param('id');
        const post = await prisma.post.findFirst({
            where:{
                id:id
            }
        })
        return c.json({
            post
        })
    } catch(e){
        c.status(411);
        return c.text('error happened. Uh-oh!');
    }
  });
  