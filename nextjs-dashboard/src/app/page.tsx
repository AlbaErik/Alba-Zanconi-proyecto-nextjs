import Image from "next/image";
import UserLabel from './components/user_label'
import AdminLabel from './components/admin_label'
import UserUnregisteredLoginButton from './components/user_unregistered_login_button'
import UserRegisteredLoginButton from './components/user_registered_login_button'
import AdminLoginButton from './components/admin_login_button'

export default function Home() {
  return (
    <main className="">

      <div className="flex justify-center">
        <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo.png"
                alt="Logo"
                width={300}
                height={50}
                priority
          />
      </div>
    
      <div className ="flex mt-10 justify-evenly">
        <div className="w-1/5">
          <UserLabel/>
          <div className="flex justify-between">
            <UserRegisteredLoginButton/>
            <UserUnregisteredLoginButton/>
          </div>
        </div>
          
        <div className="w-1/5">
          <AdminLabel/>
          <AdminLoginButton/>
        </div>
      </div>
    
    </main>
  );
}
