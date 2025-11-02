'use client'
import { useState } from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

export default function CoffeeShopLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password.trim() || !email.trim()) {
            toast.error("Input fields required.")
            return;
        }
        setIsSigningIn(true)
        const results = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })
        if (results.error) {
            setIsSigningIn(false)
            toast.error(results.error)
        } else {
            toast.success('Login successful!');
            setIsSigningIn(false)
            router.push('/adminPanel');
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
        signIn(provider, { callbackUrl: "/adminPanel" });
    };

    const goToSignUpPage = () => {
        router.push('/signup')
    }

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gradient-to-br from-[#f0ead2] to-[#dde5b6] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#adc178] to-[#a98467]"></div>

                        <div className="text-center mb-8">
                            <div className="text-5xl mb-3">☕</div>
                            <h1 className="text-3xl font-bold text-[#6c584c] mb-2">Welcome Back</h1>
                            <p className="text-[#a98467] text-sm">Sign in to your coffee account</p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="w-full flex self-start items-center justify-center gap-2 font-body text-lg rounded-lg bg-olivine/15 px-9 py-3 cursor-pointer transition-colors duration-500 relative overflow-hidden before:absolute before:content-[''] before:h-full  before:w-full before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-center before:left-0 before:rounded-lg before:top-0 before:bg-tea-green before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease-in-out before:-z-1 z-10"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-umber font-medium">Continue with Google</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-[#dde5b6]"></div>
                            <span className="text-[#a98467] text-sm">or</span>
                            <div className="flex-1 h-px bg-[#dde5b6]"></div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-[#6c584c] font-medium mb-2 text-sm">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-[#dde5b6] rounded-lg text-[#6c584c] focus:outline-none focus:border-[#adc178] focus:bg-white transition-all duration-300"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className='relative'>
                                <label htmlFor="password" className="block text-[#6c584c] font-medium mb-2 text-sm">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-[#dde5b6] rounded-lg text-[#6c584c] focus:outline-none focus:border-[#adc178] focus:bg-white transition-all duration-300"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-13 cursor-pointer -translate-y-1/2 text-[#a98467] hover:text-[#6c584c] transition-colors z-20"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <div className="text-right">
                                <button className="text-[#a98467] text-sm hover:text-[#6c584c] transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSigningIn}
                                className="w-full flex self-start items-center justify-center gap-2 font-body text-lg text-umber rounded-lg bg-olivine/25 px-9 py-3 cursor-pointer transition-colors duration-500 relative overflow-hidden before:absolute before:content-[''] before:h-full  before:w-full before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-center before:left-0 before:rounded-lg before:top-0 before:bg-tea-green before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease-in-out before:-z-1 z-10
                            disabled:cursor-not-allowed disabled:opacity-50">
                                {isSigningIn ? <Loader className='loader' /> : <span>Sign In</span>}
                            </button>
                        </div>

                        <p className="text-center mt-6 text-[#6c584c] text-sm">
                            Don&apos;t have an account?{' '}
                            <button
                                onClick={() => goToSignUpPage()}
                                className="text-[#a98467] font-semibold hover:text-[#6c584c] transition-colors">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}