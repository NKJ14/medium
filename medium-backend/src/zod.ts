import z from 'zod';

export const signupinput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name: z.string().optional()
  });

export const signininput=z.object({
    email:z.string().email(),
    password:z.string().min(6)
  });

export const createBloginput = z.object({
    title:z.string(),
    content: z.string()
})

export const updateBloginput = z.object({
    title:z.string(),
    content: z.string(),
    id: z.string().uuid()
});

export type SignupInput = z.infer<typeof signupinput>;
export type SigninInput = z.infer<typeof signininput>;
export type UpdateBlogInput = z.infer<typeof updateBloginput>;
export type CreateBlogInput = z.infer<typeof createBloginput>;