import Image from "next/image";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  useMutation,
} from "@apollo/client";
import { CREATE_USUARIO } from "@/queries/usuario";
import { setContext } from "@apollo/client/link/context";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUsuario, { data, loading, error }] = useMutation(CREATE_USUARIO);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createUser(userCredential);

    router.push("/");
  };

  const onGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, googleProvider);

    await createUser(userCredential);

    router.push("/");
  };

  const onGithubLogin = async () => {
    const githubProvider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, githubProvider);

    await createUser(userCredential);

    router.push("/");
  };

  async function createUser(userCredential) {
    const httpLink = createHttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    });
    const token = await userCredential.user.getIdToken();
    const authLink = setContext((request, previousContext) => ({
      headers: { authorization: `Bearer ${token}` },
    }));
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    await createUsuario({
      variables: { nombres: email },
      client: client,
    });
  }

  return (
    <>
      {/* <RootLayout> */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              width={200}
              height={60}
              className="w-[200px] mr-2"
              src="https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dw5dc197f0/images/funko/43132-1.png"
              alt="logo"
            />
            {/* Flowbite     */}
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <button
                  onClick={onGoogleLogin}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={onGithubLogin}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in with Github
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* </RootLayout> */}
    </>
  );
};

export default Register;
