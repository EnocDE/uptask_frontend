import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen flex justify-between items-center"><Spinner /></div>;

  if (isError) return <Navigate to="/auth/login" />;

  if (data)
    return (
      <>
        <header className="bg-gray-800 py-5">
          <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            <NavMenu name={data.name} />
          </div>
        </header>

        <section className="max-w-[90%] mx-auto mt-10 p-5">
          <Outlet />
        </section>

        <footer className="py-5">
          <p className="text-center">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          position="top-right"
          className="text-center"
          draggable
        />
      </>
    );
}
