'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';

// import { Button } from '@/components/ui/button';
// import { Form, Input } from '@/components/ui/form';

import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form';
import { MuiInput } from '@/components/ui/form/mui-input';

type LoginFormProps = {
    onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const login = useLogin({
        onSuccess,
    });

    const searchParams = useSearchParams();
    const redirectTo = searchParams?.get('redirectTo');
    return (
        <div>
            <Form
                onSubmit={(values) => {
                    login.mutate(values);
                }}
                schema={loginInputSchema}
                options={{
                    mode: 'onChange'
                }}
            >
                {({ register, formState }) => (
                    <>
                        <MuiInput
                            type="email"
                            label="Email Address"
                            fieldError={formState.errors['email']}
                            registration={register('email')}
                            
                        />
                        <Input
                            type="password"
                            label="Password"
                            fieldError={formState.errors['password']}
                            registration={register('password')}
                        />
                        <div>
                            {/* <Button
                                isLoading={login.isPending}
                                type="submit"
                                className="w-full"
                            >
                                Log in
                            </Button> */}
                            <button type='submit'>Login</button>
                        </div>
                    </>
                )}

            </Form>


            <div className="mt-2 flex items-center justify-end">
                <div className="text-sm">
                    <NextLink
                        href={paths.auth.register.getHref(redirectTo)}
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Register
                    </NextLink>
                </div>
            </div>
        </div>
    );
};