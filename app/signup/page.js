'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from "bcryptjs";
import { Eye, EyeOff, Loader } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { signIn } from 'next-auth/react';

export default function CoffeeShopSignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
            toast.error("Input fields required.")
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.warning('Passwords do not match!')
            return;
        }
        setIsSigningIn(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // To encrypt the password
        const hashedPassword = await bcrypt.hash(formData.password, 10)

        const raw = JSON.stringify({
            "name": formData.name,
            "email": formData.email,
            "password": hashedPassword,
            "confirmPassword": hashedPassword,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/adduser", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (!result.success) {
                    if (result.type === "invalid_email") {
                        toast.warning(result.message)
                    } else if (result.type === "duplicate_user") {
                        toast.warning(result.message)
                    }
                } else if (result.success) {
                    toast.success(result.message)
                    router.push('/login')
                    setIsSigningIn(false)
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })
                }
            }).catch((error) => {
                console.error(error)

            });
        console.log('Sign up submitted:', formData);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Signing up with ${provider}`);
        signIn(provider, { callbackUrl: "/adminPanel" });
    };

    const goToLogin = () => {
        router.push('/login');
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <div className="min-h-screen bg-gradient-to-br from-[#f0ead2] to-[#dde5b6] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#adc178] to-[#a98467]"></div>

                        <div className="text-center mb-8">
                            <div className="text-5xl mb-3">☕</div>
                            <h1 className="text-3xl font-bold text-[#6c584c] mb-2">Join Our Coffee Club</h1>
                            <p className="text-[#a98467] text-sm">Create your account to get started</p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="w-full flex self-start items-center justify-center gap-2 font-body text-lg rounded-lg bg-olivine/15 px-9 py-3 cursor-pointer transition-colors duration-500 relative overflow-hidden before:absolute before:content-[''] before:h-full before:w-full before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-center before:left-0 before:rounded-lg before:top-0 before:bg-tea-green before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease-in-out before:-z-1 z-10"
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

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-[#6c584c] font-medium mb-2 text-sm">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-[#dde5b6] rounded-lg text-[#6c584c] focus:outline-none focus:border-[#adc178] focus:bg-white transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[#6c584c] font-medium mb-2 text-sm">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    min={8}
                                    onChange={handleChange}
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

                            <div className='relative'>
                                <label htmlFor="confirmPassword" className="block text-[#6c584c] font-medium mb-2 text-sm">
                                    Confirm Password
                                </label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    min={8}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-[#dde5b6] rounded-lg text-[#6c584c] focus:outline-none focus:border-[#adc178] focus:bg-white transition-all duration-300"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-13 cursor-pointer -translate-y-1/2 text-[#a98467] hover:text-[#6c584c] transition-colors z-20"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSigningIn}
                                className="w-full flex self-start items-center justify-center gap-2 font-body text-lg text-umber rounded-lg bg-olivine/25 px-9 py-3 cursor-pointer transition-colors duration-500 relative overflow-hidden before:absolute before:content-[''] before:h-full before:w-full before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-center before:left-0 before:rounded-lg before:top-0 before:bg-tea-green before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease-in-out before:-z-1 z-10
                                disabled:cursor-not-allowed disabled:opacity-50">
                                {isSigningIn ? <Loader className='loader' /> : <span>Create Account</span>}
                            </button>
                        </div>

                        <p className="text-center mt-6 text-[#6c584c] text-sm">
                            Already have an account?{' '}
                            <button
                                onClick={goToLogin}
                                className="text-[#a98467] font-semibold hover:text-[#6c584c] transition-colors"
                            >
                                Sign in
                            </button>
                        </p>

                        <p className="text-center mt-4 text-[#a98467] text-xs">
                            By signing up, you agree to our{' '}
                            <button className="underline hover:text-[#6c584c] transition-colors">
                                Terms of Service
                            </button>
                            {' '}and{' '}
                            <button className="underline hover:text-[#6c584c] transition-colors">
                                Privacy Policy
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}