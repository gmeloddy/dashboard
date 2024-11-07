import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex w-full max-w-[400px] flex-col items-center space-y-4 p-6 rounded-lg shadow-lg bg-white">
        <div className="w-32 md:w-36 m-auto">
          <AcmeLogo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
